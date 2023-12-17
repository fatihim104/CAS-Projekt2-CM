import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { CoursesComponent } from './courses/courses.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanNewCourseComponent } from './plan-new-course/plan-new-course.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    {
        path:"",
        children:[
            {path:"", component:CoursesComponent},
            {path:"courses/plan", component:PlanNewCourseComponent},

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
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [CoursesComponent, PlanNewCourseComponent],
    providers: [],
})
export class CourseModule { }
