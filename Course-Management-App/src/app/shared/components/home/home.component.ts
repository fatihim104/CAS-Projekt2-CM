import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {
    router = inject(Router);

    greeting:string="Hallo"

    ngOnInit() { }
}