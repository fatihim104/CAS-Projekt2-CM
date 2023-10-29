import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
    selector: 'tab-menu',
    templateUrl: './tab-menu.component.html'
})

export class TabMenuComponent implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        
        this.getActiveRoute();
    }

    

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    getActiveRoute() {

        this.items = [
            {
              label: 'Home',
              //command: () => this.router.navigate(['home']),
              routerLink: 'home',
            },
            {
              label: 'Courses',
              //command: () => this.router.navigate(['tab-1']),
              routerLink: 'courses',
            },
            {
              label: 'Team',
              //command: () => this.router.navigate(['tab-2']),
              routerLink: 'team',
            },
            {
                label: 'Participants',
                //command: () => this.router.navigate(['tab-2']),
                routerLink: 'participants',
            },
            {
                label: 'Contact',
                //command: () => this.router.navigate(['tab-2']),
                routerLink: 'contact',
            },
          ];
        //   this.activeItem = this.items[0];
    }
    

   
}