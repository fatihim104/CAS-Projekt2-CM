import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Language, LanguageEnum, Level, LevelEnum } from 'src/app/course/course.model';
import { Team } from 'src/app/team/team.model';
import { TeamService } from 'src/app/team/services/team.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
  providers: [TitleCasePipe, MessageService],
})
export class AddTeacherComponent {
  teachers!: Team[];
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

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
    private titlecasePipe: TitleCasePipe,
    private router: Router,
    private messageService: MessageService
  ) {
    this.languageOptions = Object.keys(LanguageEnum).map((key) => ({
      label: this.titlecasePipe.transform(key),
    }));
    this.levelOptions = Object.keys(LevelEnum).map((key) => ({ label: key }));
  }

  ngOnInit(): void {
    this.getForm();
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

  onSubmit(): void {
       
    if (this.form.invalid) {
      return;
    }

    this.teamService.create(this.form.value)
      .then((data) => {
        if (data) {
          this.messageService.add({
            key: 'tl',
            severity: 'success',
            summary: 'New teacher created',
          });

          setTimeout(() => {
            this.router.navigate(['/team']);
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
