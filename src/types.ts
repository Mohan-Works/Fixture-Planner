export type Gender = 'Men / Boys' | 'Women / Girls';

export type ThirdPlaceMode = 'none' | 'bronze-match' | 'two-bronze';

export type Player = {
  id: string;
  name: string;
  club?: string;
  weight?: number;
  dob?: string;
};

export type Slot = {
  playerId: string | null;
  isBye?: boolean;
};

export type ResultType = 'points' | 'fall' | 'tech' | 'walkover' | 'dq';

export type MatchStatus = 'pending' | 'ready' | 'done' | 'bye';

export type Match = {
  id: string;
  round: number;           // 0 = first round
  index: number;           // position in the round
  p1: Slot;
  p2: Slot;
  score1?: number;
  score2?: number;
  winnerId?: string;
  resultType?: ResultType;
  status: MatchStatus;
  isThirdPlace?: boolean;
};

export type Round = {
  index: number;
  name: string;
  matches: Match[];
};

export type Fixture = {
  generatedAt: number;
  locked: boolean;
  size: number;            // bracket size, power of 2
  rounds: Round[];
  thirdPlace?: Match;
  twoBronze?: {
    loser1Id: string | null;
    loser2Id: string | null;
  };
};

export type Category = {
  id: string;
  name: string;
  ageGroup: string;
  weightMin: number | null;
  weightMax: number | null;
  gender?: Gender;
  thirdPlaceMode: ThirdPlaceMode;
  players: Player[];
  fixture: Fixture | null;
  createdAt: number;
};

export type TournamentInfo = {
  name: string;
  date: string;
  venue: string;
  organizer?: string;
};
