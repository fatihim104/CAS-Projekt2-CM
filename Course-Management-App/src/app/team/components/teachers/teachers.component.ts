import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Team } from 'src/app/team/team.model';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { TeamService } from 'src/app/team/services/team.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [TeamService, ConfirmationService, MessageService],
})
export class TeachersComponent {
  teachers?: Team[] | any;
  currentUser$: Observable<User | undefined>;
  UserRole = UserRole;

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
      .subscribe({
        next: (data) => (this.teachers = data),
        error: (error) => {
          console.error('Error fetching teachers', error);
          this.teachers = [];
        },
      });
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
