import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GameService } from './game.service';
import { UserService } from '../user/user.service';

import 'rxjs/add/operator/switchMap';


import { Game } from './objects/Game';
import { Request } from './objects/Request';
import { User } from '../user/objects/User';
import { Message } from '../user/objects/Message';

@Component({
  selector: 'game-viewer',
  templateUrl: './game.component.html',
})
export class GameViewComponent {
	game: Game;
	user: User;
	requests = new Array();
	showForm = false;
	btnTxt = "Create a Request";
	canSubmit = true;
	
	constructor(private route: ActivatedRoute,
  private router: Router, http: Http, private gameService: GameService, private userService: UserService){}
	
	ngOnInit() {
		console.log("ONINIT");
		let us = localStorage.getItem("user");
		console.log(us);
		console.log("hello World");
		if(localStorage.getItem("user") !== null){
			console.log("loggedIn");
			let u = localStorage.getItem("user");
			let user = JSON.parse(u);
			this.user = new User(user.id, user.username, user.email, user.steamID, user.age);
			console.log(this.user);
		}
		this.route.params.subscribe(params=>{
			this.doSetup(params.id);
		})
			
	
	}
	
	doSetup(id){
		//TODO: If statement checking for user logged in. if not call function not requiring age
		if(this.user == undefined){
			this.user = new User("", "", "", "", "-1");
		}
		this.gameService.getRequestsForGame(id, this.user.age).then(requests=>{
			for(let r of requests){
				console.log(r);
				this.userService.getUser(r.userID).then(data => {
					let user = new User(data.id, data.username, undefined, undefined, data.age)
					if(r.userID == this.user.id){
						this.canSubmit = false;
						this.btnTxt = "You have already made a request. since: " + r.since;
					}
					console.log("///////////");
					console.log(r);
					this.requests.push(new Request(r.id, r.appID, r.userID, r.min, r.max, r.since, user, undefined, r.needMic));
				});
			  
			}
		});
		let game
		this.gameService.getGame(id).then(data =>{
			game = new Game(data.id, data.name, data.steamid);
			this.game = game;
		});
		 
		
		
	}
	
	flagGame(){
		//console.log(this.user);
		//console.log(this.game.id);
		this.gameService.flagGame(this.game.id, this.user.id);
		alert("This game has been flagged and will be reviewed for removal shortly.");
	}
	
	getRequestsForGame(id){
		console.log("Getting Requests for: " + id);
	}
	
	getUserForRequest(id){
		console.log(id);
		this.userService.getUser(id).then(data=>{return new User(data.id, data.username, undefined, undefined, data.age)});
		
	}
	
	toggleForm(e){
		this.showForm = e;
		this.btnTxt = "Your request has been submitted!";
		this.doSetup(this.game.id);
	}
	
	doAccept(request){
		this.userService.createThread(this.user.id, request.user.id).then(data=>{
			let message = new Message("-1", data, this.user.id, this.user.username + " has accepted your request to play " + this.game.name);
			this.userService.sendMessage(message).then(data=>{
				this.router.navigate(['/messages']);
			});
			
		});
	}
	
	
}