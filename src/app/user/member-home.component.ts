import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './User';
import { Game } from '../game/Game';
import { Request } from '../game/Request';

import{ GameModule } from '../game/game.module';

import { GameService } from '../game/game.service';
import { UserService } from './user.service';

@Component({
  selector: 'member-home',
  templateUrl: './member-home.component.html',
})
export class MemberHomeComponent{
	user: User;
	tabSelected = 1;
	requests = new Array();
	rToDel = null;
	constructor(private gameService: GameService, private userService: UserService, private router: Router){}
	
	ngOnInit(){
		if(localStorage.getItem("user")){
			let u = localStorage.getItem("user");
			let user = JSON.parse(u);
			this.user = new User(user.id, user.username, user.email, user.steamID, user.age);
			console.log(this.user);
			this.doSetup();
		}else{
			this.router.navigate([""]);
		}
		
	}
	
	doSetup(){
		this.requests = new Array();
		this.userService.getRequestsFromUser(this.user.id).then(data=>{
			console.log(data);
			for(let request of data){
				console.log(request);
				console.log(request.id);
				let game = new Game(request.game.id, request.game.name, request.game.steamid, undefined, undefined, !request.game.display);
				let req = new Request(request.id, request.appID, request.userID, request.minAge, request.maxAge, request.since, undefined, game, request.needMic);
				this.requests.push(req);
			}
		});
	}
	
	doDelete(){
		this.gameService.deleteRequest(this.rToDel).then(data=>{
			this.doSetup();
			console.log(this.requests);
		});
	}
	
}
