import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropdownModule  } from 'ngx-dropdown';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';


import 'rxjs/add/operator/toPromise';

import { AppRoutingModule } from './app-routing.module';
import { navbarComponent } from './navbar.component'
import { PageNotFoundComponent } from './page-not-found.component'
import { HomePageComponent } from './home.component'
import { AboutViewComponent } from './about.component'
import { AppComponent } from './app.component';
import { ChangeLogComponent } from './change-log.component'

import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
	navbarComponent,
	PageNotFoundComponent,
	HomePageComponent,
	AboutViewComponent,
	ChangeLogComponent
  ],
  imports: [
    BrowserModule,
	DropdownModule,
	HttpModule,
	FormsModule,
	GameModule,
	UserModule,
	CollapseModule,
	AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

	


	}
platformBrowserDynamic().bootstrapModule(AppModule);