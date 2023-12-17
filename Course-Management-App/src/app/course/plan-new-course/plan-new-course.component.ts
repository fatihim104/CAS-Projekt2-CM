import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/domain/participant.model';
import { Team } from 'src/app/domain/team.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Status } from 'src/app/domain/course.model';


@Component({
  selector: 'app-plan-new-course',
  templateUrl: './plan-new-course.component.html',
  styleUrls: ['./plan-new-course.component.scss']
})
export class PlanNewCourseComponent implements OnInit {
  students!: Participant[] ;
  teachers!: Team[] ;
  // statusOptions = Status;
  // statusKey:any[];

  statusOptions: { label: string }[]= []


  form: FormGroup = new FormGroup({
    language: new FormControl(''),
    level: new FormControl(''),
    place: new FormControl(''),
    status: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    selectedStudents: new FormControl([]),
    selectedTeacher: new FormControl(''),
    price: new FormControl('')
  });

  submitted = false;

  constructor(private formBuilder: FormBuilder, private courseService:CourseService) {
    // this.statusKey = Object.keys(this.statusOptions)
    this.statusOptions = Object.keys(Status).map(key => ({ label: key.toLowerCase() }));
  }

  ngOnInit(): void {
    
    this.students = [ {name: "Ali"}, {name: "Veli"},  {name: "Mehmet"} ]
    this.teachers = [ {name: "Hans"}, {name: "Müller"},  {name: "Kafka"} ]
    

    this.form = this.formBuilder.group(
      {
        language:['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
        level:['', Validators.required],
        place:[''],
        status:['', Validators.required],
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

    // if (this.form.invalid) {
    //   return;
    // }

    // this.courseService.create(this.form.value).then(() => {
    //   console.log("created successfully!");
    // })

    console.log(JSON.stringify(this.form.value, null, 2));
    console.log(this.f['language'])
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
