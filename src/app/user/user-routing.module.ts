import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { PublicProfileViewComponent } from './public-profile.component';
import { MemberHomeComponent } from './member-home.component';
import { RegisterComponent } from './register.component';
import { MessageViewComponent } from './message.component';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: MemberHomeComponent },
  { path: 'messages', component: MessageViewComponent },
  { path: 'user/:id', component: PublicProfileViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}