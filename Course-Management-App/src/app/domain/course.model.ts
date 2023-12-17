import { Participant } from "./participant.model";
import { Team } from "./team.model";

export interface Course {
    id?: string;
    language: Language;
    level?: string;
    place?: string;
    time?: string;
    status?: Status;
    price?: number;
    teacher?: Team;
    participants?: Participant[];
}

export enum Language{
    ENGLISH = "English",
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