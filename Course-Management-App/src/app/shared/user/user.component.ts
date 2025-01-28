import { Component, OnInit, inject } from '@angular/core';
import { User, UserRole } from './user.model';
import { UserService } from './user.service';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    standalone: true,
    imports: [
        TableModule,
        SharedModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
    ],
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];
  visible: boolean = false;
  selectedUser: User = {};
  userRoles: { value: string }[] = [];

  constructor() {
    this.userRoles = Object.keys(UserRole).map((key) => {
      return { value: key };
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  editUser(user: User) {
    this.visible = true;
    this.selectedUser = user;
  }

  save( role: any) {
    const editedUser = {
      role: role.value,
    };

    this.userService
      .update(this.selectedUser.uid, editedUser)
      .then(() => this.closeDialog());
  }

  closeDialog() {
    this.visible = false;
  }
}
