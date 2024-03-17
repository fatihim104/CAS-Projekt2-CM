import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../../user/user.model';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  @Input() currentUser$?: Observable<User | undefined> ;
  @Input() routerLink: string = "";
  @Input() header: string = "";
  @Input() tooltip: string = "";
  @Input() showButton: boolean = false;
  @Input() buttonIcon: string = "";

  UserRole = UserRole;

  ngOnInit(): void {
  }

}
