import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
    standalone: true
})

export class HomeComponent implements OnInit {
    greeting:string="Hallo"
    
    constructor(@Inject(Router) public router: Router) { }

    ngOnInit() { }
}