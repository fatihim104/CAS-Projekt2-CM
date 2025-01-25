import { TeachersComponent } from './components/teachers/teachers.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { DetailTeacherComponent } from './components/detail-teacher/detail-teacher.component';
import { AdminGuard } from '../shared/guard/admin.guard';
import { Routes } from '@angular/router';


export const teamRoutes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      { path: 'team/add', component: AddTeacherComponent, canActivate: [AdminGuard] },
      { path: 'team/edit/:id', component: EditTeacherComponent, canActivate: [AdminGuard] },
      { path: 'team/detail/:id', component: DetailTeacherComponent },
    ],
  },
];