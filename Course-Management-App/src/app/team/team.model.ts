import { Course } from "../course/course.model";

export interface Team {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    startDate?: string;
    birthDay?: string;
    nationality?: number;
    activeCourses?: Course[];
    passivCourses?: Course[];
}