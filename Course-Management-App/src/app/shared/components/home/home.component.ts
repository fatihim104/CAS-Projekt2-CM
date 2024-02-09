import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {
    greeting:string="Hallo"
    
    constructor() { }

    ngOnInit() { }
}