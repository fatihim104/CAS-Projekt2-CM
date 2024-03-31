import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {
    greeting:string="Hallo"
    
    constructor(public router: Router) { }

    ngOnInit() { }
}