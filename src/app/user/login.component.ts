import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';

import { Login } from './login';
import { User } from './user';

import { UserService } from './user.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
})

export class LoginComponent {
	model = new Login("", "");
	user;
	constructor(private http: Http, private userService: UserService) {}
	
	onSubmit(){
		console.log("submission complete!");
		console.log(this.model.username);
		console.log(this.model.pass);
		this.userService.login(this.model);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

}