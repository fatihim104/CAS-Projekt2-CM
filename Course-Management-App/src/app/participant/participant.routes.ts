import { Routes } from '@angular/router';
import { ParticipantsComponent } from './components/participants/participants.component';
import { AddParticipantComponent } from './components/add-participant/add-participant.component';
import { DetailParticipantComponent } from './components/detail-participant/detail-participant.component';
import { EditParticipantComponent } from './components/edit-participant/edit-participant.component';
import { AdminGuard } from '../shared/guard/admin.guard';


export const participantRoutes: Routes = [
  {
    path: '',
    component: ParticipantsComponent,
    children: [
      { path: 'participants/add', component: AddParticipantComponent, canActivate:[AdminGuard] },
      { path: 'participants/edit/:id', component: EditParticipantComponent, canActivate:[AdminGuard] },
      { path: 'participants/detail/:id', component: DetailParticipantComponent },
    ],
  },
];