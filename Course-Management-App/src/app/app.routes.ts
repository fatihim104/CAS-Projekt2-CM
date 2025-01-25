import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { UserComponent } from './shared/user/user.component';

export const routes: Routes = [
  {
    path:"", redirectTo: '/home', pathMatch: 'full',
  }, 
  {
    path:"auth", loadChildren:() =>  import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path:"home", component:HomeComponent,
  },
  {
    path:"courses", loadChildren:() =>  import('./course/course.routes').then((m) => m.courseRoutes),
  },
  {
    path:"team", loadChildren:() => import('./team/team.routes').then(m=>m.teamRoutes),
  },
  {
    path:"participants", loadChildren:() => import('./participant/participant.routes').then(m=>m.participantRoutes),  
  },
  {
    path:"user", component:UserComponent,
  }
];
