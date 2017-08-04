import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from './User';
import { Request } from '../game/Request';
import { Game } from '../game/Game';

import { UserService } from './user.service';

@Component({
  selector: 'public-profile',
  templateUrl: './public-profile.component.html',
})
export class PublicProfileViewComponent{
	user: User;
	requests = new Array();;
	
	constructor(private userService: UserService, private router: Router, private route: ActivatedRoute){}
	
	ngOnInit(){
		this.route.params.subscribe(params=>{
			this.doSetup(params.id);
		})
	}
	
	doSetup(id){
		this.userService.getUser(id).then(data=>{
			console.log(data);
			this.user = new User(data.id, data.username, undefined, data.steamID, data.age, data.profilePic);
		})
		this.userService.getRequestsFromUser(id).then(data=>{
			console.log(data);
			for(let request of data){
				console.log(request);
				console.log(request.id);
				let game = new Game(request.game.id, request.game.name, request.game.steamid, undefined, undefined, !request.game.display);
				this.requests.push(new Request(request.id, request.appID, request.userID, request.minAge, request.maxAge, request.since, undefined, game, request.needMic));
			}
		});
	}
	
}
