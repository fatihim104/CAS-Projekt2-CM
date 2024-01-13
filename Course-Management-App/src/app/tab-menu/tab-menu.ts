import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../domain/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, tap } from 'rxjs';
import { UserService } from '../services/user.service';

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
  user: User | undefined;
  // isLoggedin : boolean=false;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.hasToken = this.authService.hasToken;

    this.currentUser$ = this.userService.getCurrentUser();
    // this.currentUser$.subscribe((user) => {
    //   this.role = user?.role;
    // });
  }

  ngOnInit() {
    // this.currentUser$.pipe(switchMap(user => {
    //   return user ? user : " "

    // })
    // ).subscribe((user) => {
    //   if(user){
    //     this.role = user?.role || "";
    //   }
    //   console.log("rol:", this.role);

    // console.log("rol:", this.role);
    // this.getActiveRoute();

//bu calisti
    this.currentUser$.subscribe((user) => {
      this.role = user?.role;
      this.getActiveRoute();
    });
    this.getActiveRoute()


}
  

  logout() {
    this.authService.signOut();
    this.router.navigate(['/auth']);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  getActiveRoute() {
    console.log('rol:', this.role);
    // this.currentUser$.subscribe((user) => {
    //   console.log('currentuser:', user);

      this.items = [
        {
          label: 'Home',
          routerLink: 'home',
        },
        {
          label: 'Courses',
          routerLink: 'courses',
          visible: true,
        },
        {
          label: 'Team',
          routerLink: 'team',
        },
        {
          label: 'Participants',
          routerLink: 'participants',
          visible: this.role == 'admin',
        },
        {
          label: 'Contact',
          routerLink: 'contact',
        },
      ];
    // });
  }
}
