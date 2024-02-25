import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User, UserRole } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  visible: boolean = false;
  selectedUser: User = {};
  userRoles: { value: string }[] = [];

  constructor(
    private userService: UserService,
  ) {
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

  save(userName: string, role: any) {
console.log(userName);
console.log(role);
console.log(this.selectedUser);

    const editedUser = {
      displayName: userName,
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
