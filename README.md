# TournaX – Tournament Knockout Fixture Planner & Scoring System 🏆

A web application built with **React 18 + TypeScript + Tailwind CSS** for sports and tournament organizers to create divisions/categories, register players, automatically draw fair knockout brackets with bit-reversal bye distribution (2–128 participants), score matches in real-time, and export official fixtures in PDF, PNG, Excel, and Print formats.

---

## 🌟 Key Features

1. **Tournament & Division Management**
   - Interactive Tournament Tile with quick inline details modal (Title, Date, Venue, Organizer).
   - Age Groups: U14, U17, U19, U23, Senior, and Custom.
   - Weight & Rating Formats: Under Limit (e.g. Under 55kg), Range (e.g. 55–65kg), or Open format.
   - Gender Divisions: Men, Women, Mixed.
   - Auto-generated division labels.
   - Duplicate category protection.
   - Division cloning and deletion.

2. **Player Roster Management**
   - Individual player registration (Name, Club/Team/State, Weight/Rating, DOB/Age).
   - Bulk Add tool (paste multiple names, one per line).
   - CSV Roster Import with live preview table.
   - Guardrails: Validation & warnings for < 2 players.
   - Roster lock safeguard during active bracket play.

3. **Knockout Bracket Generation & Fair Bye Distribution**
   - Unbiased Fisher–Yates randomization.
   - Supports 2 to 128 players.
   - **Bit-reversal bye distribution** guarantees that no two byes ever meet, and byes are distributed evenly across bracket halves.
   - Byes automatically advance to Round 2 upon generation.
   - Re-draw protection with safety confirmation dialog when match results exist.
   - Fixture locking to prevent accidental redraws.
   - Playoff settings: Bronze match playoff, two bronze medals, or finalists only.

4. **Live Match Scoring & Automatic Advancement**
   - Click any ready match card to enter player scores or designate the winner directly.
   - Victory decisions: Points Decision, Technical Superiority / Stoppage, Stoppage / Knockout / Pin, Walkover / Forfeit, Disqualification.
   - Automated advancement to the subsequent round.
   - Cascading downstream result reset with confirmation warning when an earlier winner is changed.
   - Semi-final losers automatically feed into the Bronze Medal playoff or Double Bronze medal podium.

5. **Export & Print Options**
   - **PDF**: Formatted A4 landscape bracket export with tournament header and metadata.
   - **Image (PNG)**: High-resolution bracket export.
   - **Excel (.xlsx)**: Generates 3 sheets (`Overview`, `Players`, `Bracket Matches`).
   - **Print**: Dedicated print stylesheet (`@media print`) and clean `/print/:id` routes.
   - **Offline Persistence**: Auto-saves instantly to `localStorage`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State & Persistence**: Zustand (with `persist` middleware)
- **Exports**: `html2canvas`, `jspdf`, `xlsx` (SheetJS)
- **Icons**: `lucide-react`
- **Testing**: Vitest, React Testing Library

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Run Automated Unit Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```
