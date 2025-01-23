import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/participant/participant.model';
import { ParticipantService } from 'src/app/participant/services/participant.service';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { UserService } from 'src/app/shared/user/user.service';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgClass, NgFor } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HeaderPageComponent } from '../../../shared/components/header-page/header-page.component';

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss'],
    providers: [ParticipantService, ConfirmationService, MessageService],
    standalone: true,
    imports: [
        HeaderPageComponent,
        ToastModule,
        ConfirmDialogModule,
        NgClass,
        NgFor,
        CardModule,
        SharedModule,
        ButtonModule,
        TooltipModule,
        RouterLink,
    ],
})
export class ParticipantsComponent implements OnInit {
  students?: Participant[] | any;
  currentUser$: Observable<User | undefined>;
  UserRole = UserRole;

  constructor(
    private participantService: ParticipantService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getParticipants();
  }

  getParticipants() {
    this.participantService.getParticipants().subscribe({
      next: (data) => (this.students = data),
      error: (error) => {
        console.error('Error fetching participants', error);
        this.students = [];
      },
    });
  }

  deleteStudent(student: Participant) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + student.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.participantService.delete(student.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Participant Deleted',
          life: 2000,
        });
      },
    });
  }
}
