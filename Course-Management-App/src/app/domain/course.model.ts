import { Participant } from "./participant.model";
import { Team } from "./team.model";

export interface Course {
    id?: string;
    language: Language;
    level?: string;
    place?: string;
    date?: string;
    time?: string;
    status?: Status;
    price?: number;
    teacher?: Team;
    participants?: Participant[];
}

export enum Language{
    ENGLISH = "ENGLISH",
    GERMAN = "GERMAN",
    ITALIAN = "ITALIAN",
    SPANISH = "SPANISH",
    FRENCH = "FRENCH"
}

export enum Status {
    ONGOING = "ONGOING",
    PLANNING = "PLANNING",
    READY = "READY",
    CANCELLED = "CANCELLED",
    FINISHED = "FINISHED"
}

export enum Level {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2"
}