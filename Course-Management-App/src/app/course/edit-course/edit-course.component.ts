import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/domain/participant.model';
import { Team } from 'src/app/domain/team.model';
import { TitleCasePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Language, Level, Status } from 'src/app/domain/course.model';
import { Location } from '@angular/common';
import { ParticipantService } from 'src/app/services/participant.service';
import { map } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
  providers: [TitleCasePipe, MessageService],
})
export class EditCourseComponent implements OnInit {
  students!: Participant[];
  teachers!: Team[];
  statusOptions: { label: string }[] = [];
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

  selectedCourse:any;
  selectedCourseId:string = "";

  editForm: FormGroup = new FormGroup({
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
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private participantService: ParticipantService,
    private teamService: TeamService,
    private titlecasePipe: TitleCasePipe,
    private router: Router,
    private location: Location,
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
    this.getForm();
    this.getParticipants();
    this.getTeachers()
    this.selectedCourseId = this.activatedRoute.snapshot.paramMap.get('id')!
    this.courseService.getCourse(this.selectedCourseId).subscribe((course: any) => {
      this.selectedCourse=course;
      this.editForm.setValue(this.selectedCourse) 
      this.editForm.controls['date'].patchValue(this.selectedCourse.date.toDate())
      this.editForm.controls['time'].patchValue(this.selectedCourse.time.toDate())
    })
    
 
  }
  getForm(){
    this.editForm = this.formBuilder.group({
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
    return this.editForm.controls;
  }
  
  save(){
    if (this.editForm.invalid) {
      return;
    }
       
    this.courseService.update(this.selectedCourseId, this.editForm.value).then(() => {
    
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Course updated',
      });
      
      setTimeout(() => {
        this.goBack()
      }, 1000);
      }
    ).catch((error:any) => {
      console.log(error);
      
      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'There is an error',
        detail: error,
      });
    })
    
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

  goBack(): void {
    this.location.back();
  }
}
