import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, SharedModule } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable} from 'rxjs';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/shared/user/user.service';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'tab-menu',
    templateUrl: './tab-menu.component.html',
    standalone: true,
    imports: [
        MenubarModule,
        SharedModule,
        ButtonModule,
        RouterLink,
        AvatarModule,
        TieredMenuModule,
        AsyncPipe,
    ],
})
export class TabMenuComponent implements OnInit {
  private router = inject(Router);
  authService = inject(AuthService);
  afAuth = inject(AngularFireAuth);
  private userService = inject(UserService);

  items: MenuItem[] | undefined;
  profileItems: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  hasToken: Observable<boolean>;
  currentUser$: Observable<User | undefined>;
  role: UserRole | undefined ;
  profileText:string | undefined = "";

  constructor() {
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
