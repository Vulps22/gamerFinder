import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { GameModule } from '../game/game.module';

import 'rxjs/add/operator/toPromise';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { MemberHomeComponent } from './member-home.component';
import { MessageViewComponent } from './message.component';
import { PublicProfileViewComponent } from './public-profile.component';

import { UserService } from './user.service';

import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
	LoginComponent,
	RegisterComponent,
	MemberHomeComponent,
	MessageViewComponent,
	PublicProfileViewComponent
  ],
  imports: [
    CommonModule,
	HttpModule,
	FormsModule,
	UserRoutingModule,
	GameModule
	
	
  ],
  providers: [UserService],
  exports: [LoginComponent]
})
export class UserModule {


	}
