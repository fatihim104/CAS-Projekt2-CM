
import { Participant } from './participant.model';
import { Team } from './team.model';
import { Timestamp } from 'firebase/firestore';

export interface Course {
  id?: string;
  language: Language;
  level: Level;
  place?: string;
  date?: string | Timestamp;
  time?: string;
  status?: Status;
  price?: number;
  teacher?: Team;
  students?: Participant[];
}

export enum LanguageEnum {
  ENGLISH = 'ENGLISH',
  GERMAN = 'GERMAN',
  ITALIAN = 'ITALIAN',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
}

export type Language = {
  label: LanguageEnum;
};

export enum Status {
  ONGOING = 'ONGOING',
  PLANNING = 'PLANNING',
  READY = 'READY',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}

export enum LevelEnum {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export type Level = {
  label: LevelEnum;
};
