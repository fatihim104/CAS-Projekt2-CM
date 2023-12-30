import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamComponent } from './components/team/team.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path:"", redirectTo: '/home', pathMatch: 'full',
  }, 
  {
    path:"home", component:HomeComponent,
  },
  {
    path:"courses", loadChildren:() => import('./course/course.module').then(m=>m.CourseModule),
  },
  {
    path:"team", component:TeamComponent,
  },
  {
    path:"participants", loadChildren:() => import('./participant/participant.module').then(m=>m.ParticipantModule),
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
