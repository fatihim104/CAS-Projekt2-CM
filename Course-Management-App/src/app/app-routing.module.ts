import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path:"", redirectTo: '/home', pathMatch: 'full',
  }, 
  {
    path:"auth", loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:"home", component:HomeComponent,
  },
  {
    path:"courses", loadChildren:() => import('./course/course.module').then(m=>m.CourseModule),
  },
  {
    path:"team", loadChildren:() => import('./team/team.module').then(m=>m.TeamModule),
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
