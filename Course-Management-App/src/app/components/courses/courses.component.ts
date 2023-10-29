import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course, Language, Status } from 'src/app/domain/course';
import { CourseService } from 'src/app/services/course.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CourseService]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [] ;

  cols! : Column[];



  constructor(private http: HttpClient, private courseService:CourseService){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(result => this.courses=result)

    this.cols = [
      { field: 'language', header: 'Language' },
      { field: 'level', header: 'Level' },
      { field: 'place', header: 'Place' },
      { field: 'status', header: 'Status' },
      { field: 'price', header: 'Price' },
  ];

  }

  planNewCourse(){

    const course={
      id: 2,
      language: Language.SPANIS,
      level: "A2",
      place: "Luzern",
      status: Status.PLANNING,
      price: 700,
    }
    this.http.post('https://cas-project2-default-rtdb.europe-west1.firebasedatabase.app/courses.json', course)
    .subscribe(data => console.log(data))
  
  }

}
