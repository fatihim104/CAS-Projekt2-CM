export interface Course {
    id?: string;
    language?: Language;
    level?: string;
    place?: string;
    status?: Status;
    price?: number;
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