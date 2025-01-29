import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { Observable } from 'rxjs';
import { Team } from 'src/app/team/team.model';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { TeamService } from 'src/app/team/services/team.service';
import { UserService } from 'src/app/shared/user/user.service';
import { HeaderPageComponent } from '../../../shared/components/header-page/header-page.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgClass, AsyncPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [TeamService, ConfirmationService, MessageService],
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
    AsyncPipe,
  ],
})
export class TeachersComponent {
  private teamService = inject(TeamService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private userService = inject(UserService);

  teachers?: Team[] | any;
  currentUser$: Observable<User | undefined>;
  UserRole = UserRole;

  constructor() {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    this.teamService.getTeachers().subscribe({
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
