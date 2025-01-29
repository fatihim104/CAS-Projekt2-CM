import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TabMenuComponent } from './shared/components/tab-menu/tab-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  standalone: true,
  imports: [TabMenuComponent, RouterOutlet],
})
export class AppComponent {
  constructor() {}

  title = 'Course-Management-App';
}
