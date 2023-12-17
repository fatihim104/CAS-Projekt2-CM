import { Course } from "./course.model";

export interface Team {
    id?: string;
    name: string;
    lastName?: string;
    email?: string;
    startDate?: string;
    birthDay?: string;
    nationality?: number;
    activeCourses?: Course[];
    passivCourses?: Course[];
}