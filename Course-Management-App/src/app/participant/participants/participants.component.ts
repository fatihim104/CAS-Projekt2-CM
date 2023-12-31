import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { Participant } from 'src/app/domain/participant.model';
import { ParticipantService } from 'src/app/services/participant.service';

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
    this.participantService
      .getParticipants()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe(
        (data) => {
          this.students = data;
          console.log(this.students);
        },
        (error) => {
          console.error('Error fetching participants', error);
          this.students = [];
        }
      );
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
          detail: 'Product Deleted',
          life: 2000,
        });
      },
    });
  }
}
