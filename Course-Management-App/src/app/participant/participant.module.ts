import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MessageService, ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';

import { ParticipantsComponent } from './components/participants/participants.component';
import { AddParticipantComponent } from './components/add-participant/add-participant.component';
import { DetailParticipantComponent } from './components/detail-participant/detail-participant.component';
import { EditParticipantComponent } from './components/edit-participant/edit-participant.component';
import { AdminGuard } from '../shared/guard/admin.guard';
import { SharedModule } from '../shared/shared.module';
import { FieldsetModule } from 'primeng/fieldset';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ParticipantsComponent },
      { path: 'participants/add', component: AddParticipantComponent, canActivate:[AdminGuard] },
      { path: 'participants/edit/:id', component: EditParticipantComponent, canActivate:[AdminGuard] },
      { path: 'participants/detail/:id', component: DetailParticipantComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ParticipantsComponent,
    AddParticipantComponent,
    DetailParticipantComponent,
    EditParticipantComponent,
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
    FieldsetModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports:[],
  providers:[MessageService, ConfirmationService]
})
export class ParticipantModule {
  
}
