import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { UserComponent } from './shared/user/user.component';

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
    path:"user", component:UserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
