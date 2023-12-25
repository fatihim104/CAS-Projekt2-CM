import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 

import { CoursesComponent } from './courses/courses.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanNewCourseComponent } from './plan-new-course/plan-new-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';


const routes: Routes = [
    {
        path:"",
        children:[
            {path:"", component:CoursesComponent},
            {path:"courses/plan", component:PlanNewCourseComponent},
            {path:"courses/edit/:id", component:EditCourseComponent},

        ]
    }
]
@NgModule({
    imports: [ 
        CommonModule,
        ButtonModule,
        TableModule,
        CalendarModule,
        MultiSelectModule,
        DropdownModule,
        InputTextModule,
        ReactiveFormsModule,
        ToastModule,
        TagModule, 
        ConfirmDialogModule,         
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [CoursesComponent, PlanNewCourseComponent, EditCourseComponent],
    providers: [MessageService, ConfirmationService],
})
export class CourseModule { }
