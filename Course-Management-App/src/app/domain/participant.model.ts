import { Timestamp } from "firebase/firestore";
import { Course } from "./course.model";

export interface Participant {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?:number;
    email?: string;
    birthDay?: string | Timestamp;
    nationality?: string;
    candidates?:Participant[];
    activeCourses?: Course[];
    completedCourses?: Course[];
}