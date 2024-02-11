import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';
import { Participant } from 'src/app/participant/participant.model';
import { User } from 'src/app/shared/user/user.model';
import { CourseRegistrationService } from 'src/app/course/services/services/course-registration.service';
import { CourseService } from 'src/app/course/services/services/course.service';
import { UserService } from 'src/app/shared/user/user.service';
import { ParticipantService } from 'src/app/participant/services/participant.service';
import { DocumentReference } from 'firebase/firestore';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class DetailCourseComponent implements OnInit {
  selectedCourse: any;
  selectedCourseId: string = '';
  participants: any[] = [];
  currentUser$: Observable<User | undefined>;
  candidates: Participant[] = [];
  visible: boolean = false;

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private courseService: CourseService,
    private registrationService: CourseRegistrationService,
    private participantService: ParticipantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.selectedCourseId =
      this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.courseService.getCourse(this.selectedCourseId).subscribe((course) => {
      this.selectedCourse = course;
      this.participants = this.selectedCourse.students;
    });

    this.getCandidates(this.selectedCourseId);

    this.getForm();
  }

  removeParticipant(participant: Participant, selectedCourseId: string){
    this.registrationService.removeParticipantFromCourse(participant, selectedCourseId)
      .subscribe({
        next: () => this.showMessage('success', 'Successful', 'Participant removed from course'),
        error: (error) => console.error('Error removing student',  error)
      })
  }

  getCandidates(courseId: string) {
    return this.registrationService
      .getCandidatesByCourseId(this.selectedCourseId)
      .subscribe((data) => {
        this.candidates = data;
      });
  }

  acceptCourse(candidate: Participant, courseId: string) {
    let participantId : string = "";
    this.participantService.create({
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      phone: candidate.phone,
      email: candidate.email,
      birthDay:"",
    }
    ).then((documentReference) => {
      participantId = documentReference.id

      this.registrationService
      .addCandidateToCourse(courseId, participantId)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Successful', 'Candidate added to course')
     
          this.registrationService.delete(candidate.id)
          this.showMessage('success', 'Successful', 'Candidate added Participants list.')

          
        },
        error: (error) => console.error(error),
    });
    })
    
    
  }

  deleteCandidate(candidate: Participant) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + candidate.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.registrationService.delete(candidate.id);
        this.showMessage('success', 'Successful', 'Candidate Deleted')
      },
    });
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
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const newRegistration = {
      ...this.form.value,
      courseId: this.selectedCourseId,
    };

    this.registrationService
      .create(newRegistration)
      .then((data) => {
        if (data) {
          this.showMessage('success', 'Successful', 'Thank you for your apply. We will contact with you!')
        }
        this.form.reset();
        this.closeDialog();
      })
      .catch((error) => {
        this.showMessage('error', 'There is an error', error)
      });
  }


  showMessage(severity?:string, summary?:string, detail?: string, life?:number){
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life ? life : 2000 ,
    });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
