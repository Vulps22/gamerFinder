import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GameService } from './game.service';


import { Game } from './objects/Game';
import { Request } from './objects/Request';
import { User } from '../user/objects/User';

@Component({
  selector: 'request-form',
  templateUrl: './game-request.component.html',
})
export class RequestFormComponent {
	user: User;
	request: Request;
	@Input() id;
	minAge;
	maxAge;
	
	 @Output() show: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private route: ActivatedRoute, private gameService: GameService, private router: Router){}
	
	ngOnInit() {
		let userString = localStorage.getItem("user");
		let user = JSON.parse(userString);
		this.user = new User(user.id, user.username, user.email, user.steamID, user.age);
		this.request = new Request("", this.id, user.id, user.age, user.age);
		let age = parseInt(this.user.age);
		if(age>18){
			this.minAge = 16;
			this.maxAge = 99;
		}else{
			this.minAge = 13;
			this.maxAge = 18;
		}
	}
	
	onSubmit(){
		console.log("SENDING SUBMISSION");
		console.log(this.request);
		this.gameService.addRequest(this.request).then(data=>{this.show.emit(false)});
	}
		
	
}