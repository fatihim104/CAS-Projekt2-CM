import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../domain/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
    selector: 'tab-menu',
    templateUrl: './tab-menu.component.html'
})

export class TabMenuComponent implements OnInit {
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;

    isLoggedIn: Observable<boolean>
    currentUser$:Observable<User | undefined> ;
    role:string = "";

    constructor(private router: Router, private cdRef: ChangeDetectorRef, public authService: AuthService, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
        this.isLoggedIn = this.authService.hasToken;
        this.currentUser$=this.afAuth.authState.pipe(
          switchMap(user => {
            return user? this.firestore.collection('users').doc<User>(user.uid).valueChanges() : [];
          })
         
        )
    }

    ngOnInit() {
         
        this.currentUser$.subscribe((user) => {
          if(user){
            this.role = user?.role || "";
            this.getActiveRoute(); 
          }
          
        });                  
    }

    logout(){
      this.authService.signOut()
      this.router.navigate(['/auth'])
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    getActiveRoute() {
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
            },
            {
                label: 'Contact',
                routerLink: 'contact',
            },
          ];
        
    }
  }