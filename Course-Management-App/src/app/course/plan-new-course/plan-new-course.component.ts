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
import { Status } from 'src/app/domain/course.model';
import { Language } from 'src/app/domain/course.model';
import { Level } from 'src/app/domain/course.model';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

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
    private courseService: CourseService,
    private titlecasePipe: TitleCasePipe,
    private datePipe: DatePipe,
    private router: Router,
    private messageService: MessageService
  ) {
    this.languageOptions = Object.keys(Language).map((key) => ({
      label: this.titlecasePipe.transform(key),
    }));
    this.levelOptions = Object.keys(Level).map((key) => ({ label: key }));
    this.statusOptions = Object.keys(Status).map((key) => ({
      label: key.toLowerCase(),
    }));
  }

  ngOnInit(): void {
    this.students = [{ name: 'Ali' }, { name: 'Veli' }, { name: 'Mehmet' }];
    this.teachers = [{ name: 'Hans' }, { name: 'Müller' }, { name: 'Kafka' }];
    this.getForm();
   
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
    const fDate = this.form.value; 
    // fDate.date = this.datePipe.transform(fDate.date , 'dd-MM-YYYY')
    // fDate.time = this.datePipe.transform(fDate.time , 'HH:mm')
    console.log(this.form.controls['date'].value)
    console.log(this.f['time'].value)
    
    // if (this.form.invalid) {
    //   return;
    // }

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

  onReset(): void {
    this.form.reset();
  }
}
