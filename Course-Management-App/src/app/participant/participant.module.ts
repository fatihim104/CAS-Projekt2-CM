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

import { ParticipantsComponent } from './participants/participants.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { DetailParticipantComponent } from './detail-participant/detail-participant.component';
import { EditParticipantComponent } from './edit-participant/edit-participant.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ParticipantsComponent },
      { path: 'participants/add', component: AddParticipantComponent },
      { path: 'participants/edit/:id', component: EditParticipantComponent },
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
    RouterModule.forChild(routes),
  ],
  exports:[],
  providers:[MessageService, ConfirmationService]
})
export class ParticipantModule {
  
}
