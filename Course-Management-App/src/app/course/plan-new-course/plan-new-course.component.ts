import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/domain/participant.model';
import { Team } from 'src/app/domain/team.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { TeamService } from 'src/app/services/team.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { LevelEnum, Status } from 'src/app/domain/course.model';
import { LanguageEnum } from 'src/app/domain/course.model';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-plan-new-course',
  templateUrl: './plan-new-course.component.html',
  styleUrls: ['./plan-new-course.component.scss'],
  providers: [TitleCasePipe, MessageService, DatePipe],
})
export class PlanNewCourseComponent implements OnInit {
  students!: Participant[];
  teachers!: Team[];
  statusOptions: { label: string }[] = [];
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

  form: FormGroup = new FormGroup({
    language: new FormControl(''),
    level: new FormControl(''),
    place: new FormControl(''),
    status: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    students: new FormControl([]),
    teacher: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private titlecasePipe: TitleCasePipe,
    private courseService: CourseService,
    private participantService: ParticipantService,
    private teamService: TeamService,
    private router: Router,
    private messageService: MessageService
  ) {

    this.languageOptions = Object.keys(LanguageEnum).map((key) => ({
      label: this.titlecasePipe.transform(key),
    }));

    this.levelOptions = Object.keys(LevelEnum).map((key) => ({ label: key }));
    
    this.statusOptions = Object.keys(Status).map((key) => ({
      label: key.toLowerCase(),
    }));
  }

  ngOnInit(): void {
    this.getForm();
    this.getParticipants();
    this.getTeachers()
  }

  getForm(){
    this.form = this.formBuilder.group({
      language: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      level: ['', Validators.required],
      place: [''],
      status: ['', Validators.required],
      date: [''],
      time: [''],
      students: [''],
      teacher: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
     
    if (this.form.invalid) {
      return;
    }

    this.courseService
      .create(this.form.value)
      .then((data) => {
        if (data) {
          this.messageService.add({
            key: 'tl',
            severity: 'success',
            summary: 'New Course created',
          });
          
          setTimeout(() => {
            this.router.navigate(['/courses']);
          }, 1500);
        }
      })
      .catch((error) => {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'There is an error',
          detail: error,
        });
      });
  }

  getParticipants() {
    this.participantService
      .getParticipants()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const studentData = c.payload.doc.data();
            return {
              id: c.payload.doc.id,
              ...studentData,
              name: `${studentData.firstName} ${studentData.lastName}`,
            };
          })
        )
      )
      .subscribe(
        (data) => {
          this.students = data;
          console.log(this.students)
        },
        (error) => {
          console.error('Error fetching participants', error);
          this.students = [];
        }
      );
  }

  getTeachers(){
    this.teamService
    .getTeachers()
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    )
    .subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error('Error fetching participants', error);
        this.teachers = [];
      }
    );

  }

  onReset(): void {
    this.form.reset();
  }
}
