import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';


import 'rxjs/add/operator/toPromise';

import { GameViewComponent } from './game.component';
import { GamesViewComponent } from './games-view.component';
import { GameListComponent } from './game-list.component';
import { RequestFormComponent } from './game-request.component';

import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
	GameViewComponent,
	GamesViewComponent,
	GameListComponent,
	RequestFormComponent
  ],
  imports: [
    CommonModule,
	HttpModule,
	FormsModule,
	GameRoutingModule
	
	
  ],
  exports: [GameListComponent],
  providers: []
})
export class GameModule {


	}
