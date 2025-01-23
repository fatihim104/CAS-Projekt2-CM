import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TabMenuComponent } from './shared/components/tab-menu/tab-menu';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService],
    standalone: true,
    imports: [TabMenuComponent, RouterOutlet, RouterModule]
})
export class AppComponent {

  constructor(){}

  title = 'Course-Management-App';
}
