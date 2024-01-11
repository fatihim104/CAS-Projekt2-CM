import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/domain/course.model';
import { Participant } from 'src/app/domain/participant.model';
import { CourseService } from 'src/app/services/course.service';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-detail-participant',
  templateUrl: './detail-participant.component.html',
  styleUrls: ['./detail-participant.component.scss'],
})
export class DetailParticipantComponent {
  selectedStudent: any;
  selectedStudentId: string = '';
  courses: Course[] = [];

  constructor(
    private participantService: ParticipantService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.selectedStudentId =
      this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.participantService
      .getParticipant(this.selectedStudentId)
      .subscribe((student) => {
        this.selectedStudent = student;
      });

    this.courseService
      .getCoursesByStudent(this.selectedStudentId)
      .subscribe((data: Course[]) => {
        this.courses = data;
        console.log(this.courses);
      });
  }

  getDate(course:Course){
    const timestamp = course?.date;
  if (typeof timestamp === 'object' && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  } else {
    return ''; 
  }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
