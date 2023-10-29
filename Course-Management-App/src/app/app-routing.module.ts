import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeamComponent } from './components/team/team.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
  {
    path:"", redirectTo: '/home', pathMatch: 'full',
  }, 
  {
    path:"home", component:HomeComponent,
  },
  {
    path:"courses", component:CoursesComponent,
  },
  {
    path:"team", component:TeamComponent,
  },
  {
    path:"participants", component:ParticipantsComponent,
  },
  {
    path:"contact", component:ContactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
