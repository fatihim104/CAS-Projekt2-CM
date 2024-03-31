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
import { User, UserRole } from 'src/app/shared/user/user.model';
import { CourseRegistrationService } from 'src/app/course/services/course-registration.service';
import { CourseService } from 'src/app/course/services/course.service';
import { UserService } from 'src/app/shared/user/user.service';
import { ParticipantService } from 'src/app/participant/services/participant.service';
import { AuthService } from 'src/app/auth/services/auth.service';

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
  UserRole = UserRole;
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
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
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
      
    this.courseService.getCourse(this.selectedCourseId).subscribe({
      next:(course) => {
        this.selectedCourse = course;
        this.participants = this.selectedCourse.students;
        //this.getUpdatedParticipants();
      },
      error: (error) => console.error('Error getting selected course', error)      
    });

    this.getCandidates();

    this.getForm();
  }

  // getUpdatedParticipants() {
  //   const studentIds = this.selectedCourse.students.map((student: { id: any; }) => student.id);
  
  //   this.participantService.getParticipantsByIds(studentIds).subscribe({
  //     next: (participants) => {
  //       this.participants = participants;
  //     },
  //     error: (error) => console.error('Error getting updated participants', error)
  //   });
  // }

  removeParticipant(participant: Participant, selectedCourseId: string){
    this.registrationService.removeParticipantFromCourse(participant, selectedCourseId)
      .subscribe({
        next: () => this.showMessage('success', 'Successful', 'Participant removed from course'),
        error: (error) => console.error('Error removing student',  error)
      })
  }

  getCandidates() {
    return this.registrationService
      .getCandidatesByCourseId(this.selectedCourseId)
      .subscribe((data) => {
        this.candidates = data;
      });
  }

  acceptCourse(candidate: Participant, courseId: string) {
    
    const newUser = {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      name:`${candidate.firstName} ${candidate.lastName}`,
      phone: candidate.phone,
      email: candidate.email,
      birthDay: "",
    }

    this.addCandidateToParticipants(candidate, courseId, newUser)

    this.createNewUser(candidate)

    this.userService.addUserForMailTrigger(newUser)
     
  }

  addCandidateToParticipants(candidate: Participant, courseId: string, newUser:any){
    let participantId : string = "";
    this.participantService.create(newUser)
    .then((documentReference) => {
      participantId = documentReference.id

      this.registrationService
      .addCandidateToCourse(courseId, participantId)
      .subscribe({
        next: () => {
          this.registrationService.delete(candidate.id)
          
          this.showMessage('success', 'Successful', 'Candidate added Course and Participant list.')
        },
        error: (error) => console.error(error),
    });
    }) 
  }

  createNewUser(candidate:Participant){
    const generatedPassword = this.generateRandomPassword(8)
    
    this.authService.createUser(candidate.email as string, generatedPassword, candidate.firstName).subscribe({
      next: (data) => {
        console.log(data.userId);
        
        this.showMessage('success', 'Successful', 'Candidate added to User list.')
      },
      error: (error) => console.error(error),
    }
    )

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
      life: life ? life : 3000 ,
    });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  generateRandomPassword(passlength:number) {
    return Array(passlength)
      .fill(
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      )
      .map(function (x) {
        const pwd = Math.floor(Math.random() * x.length);
        return x.substring(pwd, pwd + 1);
      })
      .join("");
  };


}
