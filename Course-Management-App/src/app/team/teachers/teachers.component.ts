import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/domain/team.model';
import { User } from 'src/app/domain/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [TeamService, ConfirmationService, MessageService],
})
export class TeachersComponent {
  teachers?: Team[] | any;
  currentUser$: Observable<User | undefined>;

  constructor(
    private teamService: TeamService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

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
        this.teamService.delete(teacher.id);
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
