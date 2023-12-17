import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/domain/participant.model';
import { Team } from 'src/app/domain/team.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Status } from 'src/app/domain/course.model';
import { Language } from 'src/app/domain/course.model';
import { Level } from 'src/app/domain/course.model';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-plan-new-course',
  templateUrl: './plan-new-course.component.html',
  styleUrls: ['./plan-new-course.component.scss'],
  providers: [TitleCasePipe]
})
export class PlanNewCourseComponent implements OnInit {
  students!: Participant[] ;
  teachers!: Team[] ;
  statusOptions: { label: string }[]= [] ;
  languageOptions: { label: string }[]= [] ;
  levelOptions: { label: string }[]= [] ;


  form: FormGroup = new FormGroup({
    selectedLanguage: new FormControl(''),
    selectedLevel: new FormControl(''),
    place: new FormControl(''),
    selectedStatus: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    selectedStudents: new FormControl([]),
    selectedTeacher: new FormControl(''),
    price: new FormControl('')
  });

  submitted = false;

  constructor(private formBuilder: FormBuilder, private courseService:CourseService, private titlecasePipe: TitleCasePipe) {
    this.languageOptions = Object.keys(Language).map(key => ({ label: this.titlecasePipe.transform(key) }));
    this.levelOptions = Object.keys(Level).map(key => ({ label: key }));
    this.statusOptions = Object.keys(Status).map(key => ({ label: key.toLowerCase() }));
  }

  ngOnInit(): void {
    
    this.students = [ {name: "Ali"}, {name: "Veli"},  {name: "Mehmet"} ]
    this.teachers = [ {name: "Hans"}, {name: "Müller"},  {name: "Kafka"} ]
    

    this.form = this.formBuilder.group(
      {
        selectedLanguage:['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
        selectedLevel:['', Validators.required],
        place:[''],
        selectedStatus:['', Validators.required],
        date:['', Validators.required],
        time:['', Validators.required],
        selectedStudents:[''],
        selectedTeacher:['', Validators.required],
        price:['', [Validators.required, Validators.pattern('^[0-9]+$')] ],
      }
    )   
  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.courseService.create(this.form.value).then(() => {
      console.log("created successfully!");
    })

    console.log(JSON.stringify(this.form.value, null, 2));
    console.log(this.f['language'])
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
