import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from './objects/User';
import { Request } from '../game/objects/Request';
import { Game } from '../game/objects/Game';

import { UserService } from './user.service';

@Component({
  selector: 'public-profile',
  templateUrl: './public-profile.component.html',
})
export class PublicProfileViewComponent{
	user: User;
	requests = new Array();
	isLoggedIn = false;
	isReporting = false;
	theReason = 1;
	reasons = [{id: 1, name: "Spamming"}, {id: 2, name: "Bullying"}, {id: 3, name: "Innapropriate Behaviour"}, {id: 4, name: "Lying About Age"}, {id: 5, name: "Duplicate Account/Invalid Steam Account"}, {id: 6, name: "Hate Speech/Discrimination"}, ]
	localUser: User;
	constructor(private userService: UserService, private router: Router, private route: ActivatedRoute){}
	
	ngOnInit(){
		this.route.params.subscribe(params=>{
			this.doSetup(params.id);
		})
		
		if(localStorage.getItem("user")){
			let u = localStorage.getItem("user");
			let user = JSON.parse(u);
			this.localUser = new User(user.id, user.username, user.email, user.steamID, user.age);
			this.isLoggedIn = true;
		}
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
			console.log(this.requests);
		});
	}
	
	doContact(){
		this.userService.createThread(this.localUser.id, this.user.id).then(data=>{
			this.router.navigate(['/messages'])
		});
	}
	
	doReport(){
		this.userService.reportUser(this.localUser.id, this.user.id, this.theReason).then(data=>{
			alert("You have reported this user. Your report will be reviewed urgently and appropriate action will be taken.")
			this.isReporting = false;
		});
	}
}
