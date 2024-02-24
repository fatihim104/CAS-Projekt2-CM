import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Participant } from 'src/app/participant/participant.model';
import { ParticipantService } from 'src/app/participant/services/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
  providers: [ParticipantService, ConfirmationService, MessageService],
})
export class ParticipantsComponent implements OnInit {
  students?: Participant[] | any;

  constructor(
    private participantService: ParticipantService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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
