import { Component, OnInit, inject } from '@angular/core';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/participant/participant.model';
import { ParticipantService } from 'src/app/participant/services/participant.service';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { UserService } from 'src/app/shared/user/user.service';
import { HeaderPageComponent } from '../../../shared/components/header-page/header-page.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgClass } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

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
    CardModule,
    SharedModule,
    ButtonModule,
    TooltipModule,
    RouterLink,
  ],
})
export class ParticipantsComponent implements OnInit {
  private participantService = inject(ParticipantService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private userService = inject(UserService);

  students?: Participant[] | any;
  currentUser$: Observable<User | undefined>;
  UserRole = UserRole;

  constructor() {
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
