import {
  Component,
  OnInit, 
  inject 
} from '@angular/core';
import { MenuItem, SharedModule } from 'primeng/api';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable} from 'rxjs';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/shared/user/user.service';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { NgIf, AsyncPipe } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'tab-menu',
    templateUrl: './tab-menu.component.html',
    standalone: true,
    imports: [
        MenubarModule,
        SharedModule,
        NgIf,
        ButtonModule,
        RouterLink,
        AvatarModule,
        TieredMenuModule,
        AsyncPipe,
        RouterModule
    ],
})
export class TabMenuComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private afAuth = inject(AngularFireAuth);
  private userService = inject(UserService)
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
    console.log(role)
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
        // visible: role===UserRole.ADMIN,
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
