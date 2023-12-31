import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Team } from 'src/app/domain/team.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ParticipantService } from 'src/app/services/participant.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss'],
  providers: [ MessageService],
})
export class EditTeacherComponent {
  teachers!: Team[];
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

  selectedTeacher:any;
  selectedTeacherId:string="";

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    birthDay: new FormControl(''),
    startDay: new FormControl(''),
    nationality: new FormControl(''),
    activeCourses: new FormControl([]),
    completedCourses: new FormControl([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private messageService: MessageService
  ) {}  

  ngOnInit(): void {
    this.getForm();
    this.selectedTeacherId = this.activatedRoute.snapshot.paramMap.get('id')!
    this.teamService.getTeacher(this.selectedTeacherId).subscribe((teacher:any) => {
      this.selectedTeacher = teacher;
      this.form.setValue(this.selectedTeacher)
      this.form.controls['birthDay'].patchValue(this.selectedTeacher.birthDay.toDate())
      this.form.controls['startDay'].patchValue(this.selectedTeacher.startDay.toDate())
    })

  }

  getForm() {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      lastName: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
      birthDay: [''],
      startDay: [''],
      nationality: [''],
      activeCourses: [''],
      completedCourses: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  save(): void {
       
    if (this.form.invalid) {
      return;
    }

    this.teamService.update(this.selectedTeacherId, this.form.value).then(() => {
    
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Teacher updated',
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

  goBack(): void {
    this.location.back();
  }


}
