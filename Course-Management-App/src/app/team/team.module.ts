import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { MessageService, ConfirmationService} from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';

import { TeachersComponent } from './components/teachers/teachers.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { DetailTeacherComponent } from './components/detail-teacher/detail-teacher.component';
import { AdminGuard } from '../shared/guard/admin.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TeachersComponent },
      { path: 'team/add', component: AddTeacherComponent, canActivate: [AdminGuard] },
      { path: 'team/edit/:id', component: EditTeacherComponent, canActivate: [AdminGuard] },
      { path: 'team/detail/:id', component: DetailTeacherComponent },
    ],
  },
];

@NgModule({
  declarations: [
    TeachersComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    DetailTeacherComponent,
  ],
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
    CardModule,
    TooltipModule,
    DividerModule,
    ConfirmDialogModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports:[],
  providers:[MessageService, ConfirmationService, DatePipe]

})
export class TeamModule { }
