import { CoursesComponent } from './components/courses/courses.component';
import { Routes } from '@angular/router';
import { PlanNewCourseComponent } from './components/plan-new-course/plan-new-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

import { DetailCourseComponent } from './components/detail-course/detail-course.component';
import { AdminGuard } from '../shared/guard/admin.guard';
import { MycoursesComponent } from './components/mycourses/mycourses.component';


export const courseRoutes: Routes = [
    {
        path:"",
        component: CoursesComponent,
        children:[
            {path:"courses/plan", component:PlanNewCourseComponent, canActivate: [AdminGuard]},
            {path:"courses/edit/:id", component:EditCourseComponent, canActivate: [AdminGuard]},
            {path:"courses/detail/:id", component:DetailCourseComponent},
            {path:"courses/mycourse", component:MycoursesComponent},
        ]
    }
];

