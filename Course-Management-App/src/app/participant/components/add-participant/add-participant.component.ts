import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LanguageEnum, Level, LevelEnum } from 'src/app/course/course.model';
import { Participant } from 'src/app/participant/participant.model';
import { ParticipantService } from 'src/app/participant/services/participant.service';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss'],
  providers: [TitleCasePipe, MessageService],
})

export class AddParticipantComponent {
  private formBuilder = inject(FormBuilder);
  private participantService = inject(ParticipantService);
  private titlecasePipe = inject(TitleCasePipe);
  private router = inject(Router);
  private messageService = inject(MessageService);

  students!: Participant[];
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    birthDay: new FormControl(''),
    nationality: new FormControl(''),
    activeCourses: new FormControl([]),
    completedCourses: new FormControl([]),
  });

  constructor() {
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

    this.participantService
      .create(this.form.value)
      .then((data) => {
        if (data) {
          this.messageService.add({
            key: 'tl',
            severity: 'success',
            summary: 'New participant created',
          });

          setTimeout(() => {
            this.router.navigate(['/participants']);
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
