import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from "rxjs";
import { Course } from '../domain/course';

@Injectable({providedIn: 'root'})
export class CourseService {
    private url = "https://cas-project2-default-rtdb.europe-west1.firebasedatabase.app/"

    constructor(private http: HttpClient) { }
    
    getCourses():Observable<Course[]>{
     return this.http.get<Course[]>(this.url+"courses.json")
        .pipe(
            map(data => {
                const courses : Course[] = [];
                for(const key in data){
                    courses.push({...data[key], id:key})
                }
                return courses; 
            }),
            tap(data => console.log(data)
            )
        )   
    }
}