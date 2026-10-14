# Wrestling Fixture Planner – Development Document

*React + Tailwind CSS web application for creating categories, adding wrestlers, auto-generating random knockout brackets and exporting them.*

---

## 1. Project Overview

A tournament organiser needs to run a wrestling event with many categories (for example **Under 14 / 17 / 19 / 23** by age, and **Under 55 kg / 55–65 kg** by weight). Each category is its own knockout tournament. The app lets the organiser:

1. Create categories (age group + weight class).
2. Add wrestlers one by one to a category.
3. Click **Generate Fixture** to randomly draw a knockout bracket (Round of 16 → Quarter-finals → Semi-finals → Final, as in the reference image).
4. Enter scores and have winners advance automatically.
5. Export the bracket as **PDF, PNG, Excel** or print it.

**Out of scope for v1:** user login, live public scoreboards, payments. These are listed under Future Enhancements.

---

## 2. Functional Requirements

### 2.1 Category Management

- Create a category with: **Age group** (e.g. Under 14, 17, 19, 23, or custom), **Weight class** (e.g. Under 55, 55–65, 65–75, custom min/max in kg) and optional **Gender**.
- Auto-name: `U19 – 55 to 65 kg – Men`.
- Edit, delete and duplicate a category.
- Block duplicate categories (same age + weight + gender).

### 2.2 Player Management (per category)

- Add players one by one: **Name** (required), Club/State (optional), Weight (optional), Age/DOB (optional).
- Edit and remove players while the fixture is **not yet generated**.
- Show player count and a warning if fewer than 2.
- Optional bulk add (paste one name per line) and CSV import.

### 2.3 Fixture Generation

- Random draw using Fisher–Yates shuffle.
- Supports **any number of players (2–128)**. If the count is not a power of 2 (4, 8, 16, 32…), the app adds **byes** so that round 1 is fair.
- Byes are spread so that **no two byes meet** and byes never go to the same half of the bracket unevenly.
- **Re-draw** button (allowed only if no match result has been entered, otherwise show a confirmation warning).
- **Lock fixture** option to prevent accidental re-draw.
- Optional: **Third-place play-off** (toggle, like the reference image). In wrestling this is often replaced by two bronze medals (both semi-final losers), so make it a setting: `None | Bronze match | Two bronze`.

### 2.4 Match Results

- Click a match to enter score for both wrestlers, or just pick the winner.
- Result type (optional): Points, Fall/Pin, Technical superiority, Walkover, Disqualification.
- Winner automatically moves to the next round.
- Editing an earlier result that changes a winner must clear dependent later matches (with confirmation).

### 2.5 Export

- **PDF** (A4 landscape, one category per page, or all categories in one file).
- **PNG/JPEG** image of the bracket.
- **Excel (.xlsx)**: players sheet + matches sheet.
- **Print** with a clean print stylesheet.
- **JSON backup/restore** of the whole tournament.

### 2.6 Non-Functional

- Responsive (desktop first; bracket scrolls horizontally on mobile).
- Data persists in the browser (localStorage / IndexedDB) – no backend required for v1.
- Fast: generation of a 128-player bracket in under 100 ms.
- Accessible: keyboard navigable forms, sufficient colour contrast.

---

## 3. Technology Stack

| Area | Choice | Reason |
| --- | --- | --- |
| Framework | React 18 + Vite | Fast dev setup |
| Language | TypeScript (recommended) or JavaScript | Safer data models |
| Styling | Tailwind CSS 3 | Utility-first, matches request |
| Routing | React Router v6 | Pages for categories / bracket |
| State | Zustand (with `persist` middleware) | Simple, auto-saves to localStorage |
| Forms | React Hook Form + Zod | Validation |
| Bracket drawing | Custom React + CSS Grid + SVG connector lines | Full control over export look |
| PDF / image export | `html2canvas` + `jspdf` | Captures the exact bracket UI |
| Excel export | `xlsx` (SheetJS) | Spreadsheet output |
| IDs | `nanoid` | Unique ids |
| Icons | `lucide-react` | UI icons |
| Testing | Vitest + React Testing Library | Unit test bracket logic |

**Setup commands**

```bash
npm create vite@latest wrestling-fixture -- --template react-ts
cd wrestling-fixture
npm i react-router-dom zustand nanoid react-hook-form zod @hookform/resolvers
npm i html2canvas jspdf xlsx lucide-react
npm i -D tailwindcss postcss autoprefixer vitest @testing-library/react
npx tailwindcss init -p
```

---

## 4. Data Model

```ts
type Category = {
  id: string;
  name: string;            // auto-generated label
  ageGroup: string;        // "U14" | "U17" | "U19" | "U23" | custom
  weightMin: number | null; // null = no lower limit ("under")
  weightMax: number | null;
  gender?: 'Men' | 'Women' | 'Mixed';
  thirdPlaceMode: 'none' | 'bronze-match' | 'two-bronze';
  players: Player[];
  fixture: Fixture | null;
  createdAt: number;
};

type Player = {
  id: string;
  name: string;
  club?: string;
  weight?: number;
  dob?: string;
};

type Fixture = {
  generatedAt: number;
  locked: boolean;
  size: number;            // bracket size, power of 2
  rounds: Round[];
  thirdPlace?: Match;
};

type Round = { index: number; name: string; matches: Match[] };

type Match = {
  id: string;
  round: number;           // 0 = first round
  index: number;           // position in the round
  p1: Slot;
  p2: Slot;
  score1?: number;
  score2?: number;
  winnerId?: string;
  resultType?: 'points' | 'fall' | 'tech' | 'walkover' | 'dq';
  status: 'pending' | 'ready' | 'done' | 'bye';
};

type Slot = { playerId: string | null; isBye?: boolean };
```

The whole store is `{ tournamentName, date, venue, categories: Category[] }`.

---

## 5. Bracket Generation Algorithm

### 5.1 Steps

1. `n = players.length` (must be ≥ 2).
2. `size = 2^ceil(log2(n))` → next power of two (e.g. 11 players → 16).
3. `byes = size − n`.
4. Shuffle players (Fisher–Yates).
5. Build `size / 2` first-round pairs. Give the **first `byes` pairs** (spread evenly using bit-reversal order) one player + one BYE; the rest get two players.
6. Create empty matches for all later rounds.
7. Auto-advance every bye match (the real player moves to round 2 immediately).
8. Name rounds from the end: Final, Semi-finals, Quarter-finals, Round of 16, Round of 32… (use "Round 1/2…" if you prefer).

### 5.2 Reference Implementation

```ts
import { nanoid } from 'nanoid';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 0..n-1 reordered so consecutive picks are far apart (spreads byes)
function spreadOrder(n: number): number[] {
  let order = [0];
  while (order.length < n) {
    const len = order.length * 2;
    order = order.flatMap(x => [x, len - 1 - x]);
  }
  return order;
}

const roundName = (roundsLeft: number) =>
  ['Final', 'Semi-finals', 'Quarter-finals'][roundsLeft] ?? `Round of ${2 ** (roundsLeft + 1)}`;

export function generateFixture(players: Player[]): Fixture {
  if (players.length < 2) throw new Error('Need at least 2 players');

  const size = 2 ** Math.ceil(Math.log2(players.length));
  const byes = size - players.length;
  const totalRounds = Math.log2(size);
  const queue = shuffle(players);
  const pairs = size / 2;
  const byePairs = new Set(spreadOrder(pairs).slice(0, byes));

  const rounds: Round[] = Array.from({ length: totalRounds }, (_, r) => ({
    index: r,
    name: roundName(totalRounds - 1 - r),
    matches: Array.from({ length: size / 2 ** (r + 1) }, (_, i) => ({
      id: nanoid(), round: r, index: i,
      p1: { playerId: null }, p2: { playerId: null }, status: 'pending' as const,
    })),
  }));

  rounds[0].matches.forEach((m, i) => {
    m.p1 = { playerId: queue.shift()!.id };
    if (byePairs.has(i)) { m.p2 = { playerId: null, isBye: true }; m.status = 'bye'; }
    else { m.p2 = { playerId: queue.shift()!.id }; m.status = 'ready'; }
  });

  const fixture: Fixture = { generatedAt: Date.now(), locked: false, size, rounds };
  rounds[0].matches.filter(m => m.status === 'bye').forEach(m => setWinner(fixture, m, m.p1.playerId!));
  return fixture;
}

export function setWinner(f: Fixture, m: Match, winnerId: string) {
  m.winnerId = winnerId;
  if (m.status !== 'bye') m.status = 'done';
  const next = f.rounds[m.round + 1]?.matches[Math.floor(m.index / 2)];
  if (!next) return;                       // final reached
  const slot = m.index % 2 === 0 ? 'p1' : 'p2';
  next[slot] = { playerId: winnerId };
  if (next.p1.playerId && next.p2.playerId) next.status = 'ready';
}
```

### 5.3 Clearing Dependent Matches

When a winner is changed in a match that already fed a later round, walk forward through `next` matches and reset `winnerId`, scores and slots that depended on the old winner (ask for confirmation first).

### 5.4 Unit Tests to Write

- n = 2, 3, 5, 8, 11, 16, 17, 33, 64 produce correct `size` and `byes`.
- No match contains two byes.
- Every player appears exactly once in round 1.
- Bye players are present in round 2 right after generation.
- Two draws of the same list differ (statistically).
- Changing a winner clears downstream results.

---

## 6. Application Structure

### 6.1 Folder Layout

```
src/
├─ main.tsx, App.tsx
├─ routes/
│  ├─ Dashboard.tsx          // list of categories
│  ├─ CategoryDetail.tsx     // players + fixture tabs
│  └─ PrintView.tsx          // clean layout used for export
├─ components/
│  ├─ category/ CategoryForm.tsx, CategoryCard.tsx
│  ├─ players/  PlayerForm.tsx, PlayerList.tsx, BulkAddModal.tsx
│  ├─ bracket/  Bracket.tsx, RoundColumn.tsx, MatchCard.tsx,
│  │            Connectors.tsx, ScoreModal.tsx
│  ├─ export/   ExportMenu.tsx
│  └─ ui/       Button, Modal, Input, Select, Badge, Toast
├─ store/useTournamentStore.ts
├─ lib/ bracket.ts, exportPdf.ts, exportExcel.ts, exportImage.ts, validators.ts
└─ types.ts
```

### 6.2 Pages and Screens

**Dashboard**

- Header: tournament name, date, venue (editable).
- "Add Category" button → modal form.
- Grid of category cards: name, player count, fixture status (*Not drawn / Drawn / Completed*), Open and Delete actions.
- Global actions: Export All (PDF), Backup JSON, Restore JSON.

**Category Detail** (two tabs)

1. **Players tab** – inline form (name, club, weight), list with edit/delete, player counter, bulk add, **Generate Fixture** button (disabled below 2 players).
2. **Fixture tab** – bracket view, toolbar (Re-draw, Lock, Third-place setting, Export menu), click a match to open the Score modal.

---

## 7. Bracket UI (matching the reference image)

### 7.1 Layout

- A horizontal flex container with **one column per round**; each column has a coloured header (e.g. `bg-blue-500 text-white` like the image: *Round 16, Quarter-finals, Semi-finals, Final*).
- Matches in a column are vertically distributed so each later-round match sits **midway between its two feeder matches**.

```tsx
// RoundColumn.tsx (simplified)
<div className="flex flex-col min-w-[220px]">
  <div className="mb-4 rounded bg-blue-500 px-4 py-1 text-center text-sm font-semibold text-white">
    {round.name}
  </div>
  <div className="flex flex-1 flex-col justify-around">
    {round.matches.map(m => <MatchCard key={m.id} match={m} />)}
  </div>
</div>
```

Because every column has `flex-1 + justify-around` and the number of matches halves each round, the matches line up naturally between their feeders.

### 7.2 Match Card

- Two rows: player name (left) and score box (right), bordered like the image.
- Winner row: bold + highlighted score box. Bye row: grey italic "BYE". Empty slot: "TBD".
- Round colours: round 1 white, quarter-finals amber (`bg-amber-400`), final green (`bg-green-400`) – configurable through a theme object.

```tsx
<div onClick={open} className="w-52 cursor-pointer rounded border border-slate-600 bg-white text-sm shadow-sm hover:ring-2 hover:ring-blue-400">
  <Row name={p1?.name ?? 'TBD'} score={m.score1} win={m.winnerId === p1?.id} />
  <Row name={p2?.name ?? (m.p2.isBye ? 'BYE' : 'TBD')} score={m.score2} win={m.winnerId === p2?.id} />
</div>
```

### 7.3 Connector Lines

Two practical options:

1. **Pure CSS** – each match gets pseudo-elements: a horizontal stub to the right, and a vertical line joining the pair (draw it on every even-indexed match, with height equal to half the distance to its sibling). Simple but needs measured heights.
2. **SVG overlay (recommended)** – after render, measure each match's position with `getBoundingClientRect` (use `useLayoutEffect` + `ResizeObserver`) and draw `<path>` elbows from each feeder's right edge to the next match's left edge. This stays correct for any bracket size and is captured properly by html2canvas.

### 7.4 Final and Third Place

- The Final is the last column, with a green card (as in the image).
- Third-place match is rendered as a separate small block below the final with its own header "Third place play-off".
- For `two-bronze` mode, show both semi-final losers in a "Bronze medalists" box.

### 7.5 Responsiveness

Wrap the bracket in `overflow-x-auto`. For export, render a hidden full-width copy (`PrintView`) so the capture is not clipped by scroll.

---

## 8. State Management

Zustand store with persistence:

```ts
export const useTournamentStore = create(persist((set, get) => ({
  tournament: { name: '', date: '', venue: '' },
  categories: [] as Category[],
  addCategory: (c) => set(s => ({ categories: [...s.categories, c] })),
  addPlayer: (catId, p) => /* push into category.players if fixture is null */,
  removePlayer: (catId, pid) => /* same */,
  generate: (catId) => /* category.fixture = generateFixture(players) */,
  recordResult: (catId, matchId, data) => /* setWinner + clear downstream */,
  resetFixture: (catId) => /* fixture = null */,
}), { name: 'wrestling-fixture-v1' }));
```

Use `immer` middleware to keep nested updates readable. Export/import JSON simply dumps and restores `categories`.

---

## 9. Export Implementation

### 9.1 PDF / Image

```ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportBracketPdf(el: HTMLElement, title: string) {
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#fff' });
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const w = pdf.internal.pageSize.getWidth() - 40;
  const h = (canvas.height * w) / canvas.width;
  pdf.setFontSize(16); pdf.text(title, 20, 28);
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 20, 40, w, Math.min(h, 520));
  pdf.save(`${title}.pdf`);
}
```

For large brackets (32+ players) use A3 landscape or scale to fit and split across pages. For "Export All", loop categories, render each into the hidden `PrintView`, and `pdf.addPage()` between them.

PNG: `canvas.toBlob` → download link.

### 9.2 Excel

```ts
import * as XLSX from 'xlsx';
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(playersRows), 'Players');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(matchRows), 'Matches');
XLSX.writeFile(wb, `${category.name}.xlsx`);
```

Match rows: Round, Match No., Player 1, Player 2, Score 1, Score 2, Winner.

### 9.3 Print

Add `@media print` rules: hide navigation and buttons, force landscape via `@page { size: A4 landscape; margin: 10mm; }`, use `print-color-adjust: exact` so header colours print.

---

## 10. Validation and Edge Cases

| Case | Handling |
| --- | --- |
| Fewer than 2 players | Disable Generate, show hint |
| Duplicate player name in same category | Warn; allow if club differs |
| Odd counts (e.g. 11) | Byes added automatically, labelled "BYE" |
| Add/remove player after draw | Blocked; offer "Reset fixture" with warning |
| Re-draw after scores entered | Confirmation modal listing what will be lost |
| Draw (equal score) | Reject; wrestling needs a winner (or pick winner manually) |
| Overlapping weight ranges in same age group | Warn on category creation |
| Browser storage cleared | Encourage JSON backup; show "Last backup" date |
| Very long names | Truncate with tooltip, full name in PDF via `text-ellipsis` + `title` |

---

## 11. Development Plan

| Phase | Tasks | Est. |
| --- | --- | --- |
| 1. Setup | Vite, Tailwind, router, folder structure, UI primitives | 1 day |
| 2. Categories | Form, validation, list/cards, delete/duplicate | 1–2 days |
| 3. Players | Add one by one, edit, bulk add, CSV import | 1–2 days |
| 4. Fixture logic | `generateFixture`, `setWinner`, tests | 2 days |
| 5. Bracket UI | Columns, match cards, SVG connectors, themes | 3–4 days |
| 6. Results | Score modal, auto-advance, downstream reset | 1–2 days |
| 7. Export | PDF, PNG, Excel, print CSS, JSON backup | 2 days |
| 8. Polish & QA | Responsive, accessibility, edge cases, manual test on real data | 2 days |

**Total: about 3 weeks for one developer.**

---

## 12. Acceptance Checklist

- [ ] Can create categories such as U14, U17, U19, U23 with weight classes (Under 55, 55–65 …).
- [ ] Can add players one by one to any category.
- [ ] Generate Fixture produces a random knockout bracket for any count from 2 to 128.
- [ ] Byes are placed correctly and never face each other.
- [ ] Winners advance automatically through to the Final.
- [ ] Bracket visually matches the reference (round headers, coloured match cards, connector lines, Final, third place).
- [ ] Export to PDF, image and Excel works; print layout is clean.
- [ ] Data survives page refresh; backup and restore works.

---

## 13. Future Enhancements

- Seeding (top wrestlers kept apart) and club/state separation in round 1.
- Round-robin / repechage formats used in Olympic-style wrestling.
- Mat (court) assignment and match scheduling with times.
- Weigh-in sheet and automatic eligibility check against weight limits.
- Backend (Node/Firebase) with login, multi-device sync and a public live bracket link.
- Multi-language support and QR code on printed sheets.

---

## 14. Quick Start Summary for the Developer

1. Scaffold with Vite + Tailwind and install the packages in Section 3.
2. Implement the types (Section 4) and `lib/bracket.ts` (Section 5) first and cover them with tests.
3. Build the Zustand store, then Category and Player screens.
4. Build the bracket UI with flex columns and an SVG connector layer.
5. Add the score modal and result propagation.
6. Add export features last, using a dedicated `PrintView` for consistent output.

