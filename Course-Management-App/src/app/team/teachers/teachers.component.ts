import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/domain/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [TeamService, ConfirmationService, MessageService],
})

export class TeachersComponent {
teachers?: Team[] | any;

constructor(
  private teamService: TeamService,
  private confirmationService: ConfirmationService,
  private messageService: MessageService
) {}

ngOnInit(): void {
  this.getTeachers();
}

getTeachers() {
  this.teamService
    .getTeachers()
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
        this.teachers = data;
        console.log(this.teachers);
      },
      (error) => {
        console.error('Error fetching participants', error);
        this.teachers = [];
      }
    );
}

deleteTeacher(teacher: Team) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + teacher.firstName + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.teamService
  .delete(teacher.id);
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

