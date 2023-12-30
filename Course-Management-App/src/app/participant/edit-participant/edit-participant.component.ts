import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Participant } from 'src/app/domain/participant.model';
import { ParticipantService } from 'src/app/services/participant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.scss'],
  providers: [ MessageService],
})
export class EditParticipantComponent implements OnInit {
  students!: Participant[];
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

  selectedStudent:any;
  selectedStudentId:string="";

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

  constructor(
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private messageService: MessageService
  ) {}  

  ngOnInit(): void {
    this.getForm();
    this.selectedStudentId = this.activatedRoute.snapshot.paramMap.get('id')!
    this.participantService.getParticipant(this.selectedStudentId).subscribe((participant:any) => {
      this.selectedStudent = participant;
      this.form.setValue(this.selectedStudent)
      this.form.controls['birthDay'].patchValue(this.selectedStudent.birthDay.toDate())
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

    this.participantService.update(this.selectedStudentId, this.form.value).then(() => {
    
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Participant updated',
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
