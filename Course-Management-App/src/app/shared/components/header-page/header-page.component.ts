import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../../user/user.model';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header-page',
    templateUrl: './header-page.component.html',
    styleUrls: ['./header-page.component.css'],
    standalone: true,
    imports: [NgIf, ButtonModule, TooltipModule, RouterLink, AsyncPipe]
})
export class HeaderPageComponent implements OnInit {

  @Input() currentUser$?: Observable<User | undefined> ;
  @Input() routerLinkEdit: string = "";
  @Input() routerLinkBack: string = "";
  @Input() routerLinkAdd: string = "";
  @Input() header: string = "";
  @Input() tooltip: string = "";
  @Input() backButton: boolean = false;
  @Input() editButton: boolean = false;
  @Input() addButton: boolean = false;

  UserRole = UserRole;

  ngOnInit(): void {
  }

}
