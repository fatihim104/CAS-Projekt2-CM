import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Course, Language, Status } from 'src/app/domain/course.model';
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
  courses?: Course[] | any ;

  cols! : Column[];



  constructor( private courseService:CourseService){}

  ngOnInit(): void {
    this.getCourses()

    this.cols = [
      { field: 'language', header: 'Language' },
      { field: 'level', header: 'Level' },
      { field: 'place', header: 'Place' },
      { field: 'status', header: 'Status' },
      { field: 'price', header: 'Price' },
  ];

  }

  getCourses(){
    this.courseService.getCourses().snapshotChanges().pipe(
       
         map(changes =>
    
        changes.map(c=>          
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        
          )
        )
    ).subscribe(data=> {
      this.courses = data;
      
    }, 
    (error) => {
      console.error("Error fetching courses", error);
      this.courses = [];
    });
  }

  planNewCourse(){

    const course={
      language: Language.SPANISH,
      level: "A2",
      place: "Luzern",
      status: Status.PLANNING,
      price: 700,
    }
    this.courseService.create(course).then(() => {
      console.log("created successfully!");
    })
  
  }
}
