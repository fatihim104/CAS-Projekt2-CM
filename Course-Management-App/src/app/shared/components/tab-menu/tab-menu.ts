import {
  Component,
  OnInit  
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable} from 'rxjs';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  profileItems: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  hasToken: Observable<boolean>;
  currentUser$: Observable<User | undefined>;
  role: UserRole | undefined ;
  profileText:string | undefined = "";

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
      this.profileText = user?.email?.slice(0,2)
      this.getActiveRoute(this.role);
    });
    this.getActiveRoute();
    this.getProfileItems()
  
  }

  logout() {
    this.authService.signOut();
    this.getActiveRoute();
    this.router.navigate(['/auth']);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  getActiveRoute(role?:UserRole | undefined) {
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
        visible: role===UserRole.ADMIN,
      },
      {
        label: 'Users',
        routerLink: 'user',
        visible: role===UserRole.ADMIN,
      },
      {
        label: 'MyCourses',
        routerLink: '/courses/mycourse',
        visible:  role===UserRole.TEACHER || role===UserRole.USER,
      }
    ];
  }

  getProfileItems(){
    this.profileItems = [
      {
        label : "Logout",
        command : () => this.logout(),
      }
    ]
  }
}
