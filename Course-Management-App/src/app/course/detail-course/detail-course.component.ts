import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/domain/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss'],
})
export class DetailCourseComponent implements OnInit {
  selectedCourse: any;
  selectedCourseId:string = "";
  participants: any[] = [] ;
  
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedCourseId = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.courseService
      .getCourse(this.selectedCourseId)
      .subscribe((course) => {
        this.selectedCourse = course;
        this.participants = this.selectedCourse.students;
        
      });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
