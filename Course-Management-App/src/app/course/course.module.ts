import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { CoursesComponent } from './courses/courses.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanNewCourseComponent } from './plan-new-course/plan-new-course.component';

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
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [CoursesComponent, PlanNewCourseComponent],
    providers: [],
})
export class CourseModule { }
