import {
  Component,
  OnInit  
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable} from 'rxjs';
import { User } from 'src/app/shared/user/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  hasToken: Observable<boolean>;
  currentUser$: Observable<User | undefined>;
  role: string | undefined = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.hasToken = this.authService.hasToken;

    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.currentUser$.subscribe((user) => {
      this.role = user?.role;
      this.getActiveRoute(this.role == 'admin');
    });
    this.getActiveRoute(this.role == 'admin');
  }

  logout() {
    this.authService.signOut();
    this.getActiveRoute(false);
    this.router.navigate(['/auth']);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  getActiveRoute(visible: boolean) {
    this.items = [
      {
        label: 'Home',
        routerLink: 'home',
      },
      {
        label: 'Courses',
        routerLink: 'courses',
      },
      {
        label: 'Team',
        routerLink: 'team',
      },
      {
        label: 'Participants',
        routerLink: 'participants',
        visible: visible,
      },
      {
        label: 'Contact',
        routerLink: 'contact',
      },
    ];
  }
}
