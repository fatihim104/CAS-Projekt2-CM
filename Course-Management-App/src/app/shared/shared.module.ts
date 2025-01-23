import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';




@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RouterModule,
        TooltipModule,
        HeaderPageComponent
    ],
    exports: [HeaderPageComponent]
})
export class SharedModule { }
