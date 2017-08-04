import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './User';

import{ GameModule } from '../game/game.module';

import { GameService } from '../game/game.service';

@Component({
  selector: 'member-home',
  templateUrl: './member-home.component.html',
})
export class MemberHomeComponent{
	user: User;
	
	constructor(gameService: GameService, private router: Router){}
	
	ngOnInit(){
		if(localStorage.getItem("user")){
			let u = localStorage.getItem("user");
			let user = JSON.parse(u);
			this.user = new User(user.id, user.username, user.email, user.steamID, user.age);
			console.log(this.user);
		}else{
			this.router.navigate([""]);
		}
	}
	
}
