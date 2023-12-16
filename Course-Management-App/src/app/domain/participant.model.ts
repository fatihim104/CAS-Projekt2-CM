import { Course } from "./course.model";

export interface Participant {
    id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    birthDay?: string;
    nationality?: number;
    activeCourses: Course[];
    completedCourses: Course[];
}