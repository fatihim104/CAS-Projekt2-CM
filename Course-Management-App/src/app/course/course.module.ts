import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { ChipModule } from 'primeng/chip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DetailCourseComponent } from './detail-course/detail-course.component';
import { AdminGuard } from '../guard/admin.guard';

const routes: Routes = [
    {
        path:"",
        children:[
            {path:"", component:CoursesComponent},
            {path:"courses/plan", component:PlanNewCourseComponent, canActivate: [AdminGuard]},
            {path:"courses/edit/:id", component:EditCourseComponent, canActivate: [AdminGuard]},
            {path:"courses/detail/:id", component:DetailCourseComponent},
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
        ChipModule,
        FormsModule,
        ConfirmDialogModule,         
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [CoursesComponent, PlanNewCourseComponent, EditCourseComponent, DetailCourseComponent],
    providers: [MessageService, ConfirmationService],
})
export class CourseModule { }
