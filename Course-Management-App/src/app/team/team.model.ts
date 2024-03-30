import { Course, Language } from "../course/course.model";

export interface Team {
    id?: string;
    firstName?: string;
    lastName?: string;
    branch?:Language;
    email?: string;
    startDate?: string;
    birthDay?: string;
    nationality?: number;
    activeCourses?: Course[];
    passivCourses?: Course[];
}