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
import { DialogModule } from 'primeng/dialog'; 
import { CoursesComponent } from './components/courses/courses.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanNewCourseComponent } from './components/plan-new-course/plan-new-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DetailCourseComponent } from './components/detail-course/detail-course.component';
import { AdminGuard } from '../shared/guard/admin.guard';
import { MycoursesComponent } from './components/mycourses/mycourses.component';

const routes: Routes = [
    {
        path:"",
        children:[
            {path:"", component:CoursesComponent},
            {path:"courses/plan", component:PlanNewCourseComponent, canActivate: [AdminGuard]},
            {path:"courses/edit/:id", component:EditCourseComponent, canActivate: [AdminGuard]},
            {path:"courses/detail/:id", component:DetailCourseComponent},
            {path:"courses/mycourse", component:MycoursesComponent},
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
        DialogModule,
        ConfirmDialogModule,
        SpeedDialModule,   
        FieldsetModule,      
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [CoursesComponent, PlanNewCourseComponent, EditCourseComponent, DetailCourseComponent, MycoursesComponent],
    providers: [MessageService, ConfirmationService],
})
export class CourseModule { }
