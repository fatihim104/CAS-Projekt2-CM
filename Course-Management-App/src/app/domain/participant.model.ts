import { Course } from "./course.model";

export interface Participant {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?:number;
    email?: string;
    birthDay?: string;
    nationality?: string;
    activeCourses?: Course[];
    completedCourses?: Course[];
}