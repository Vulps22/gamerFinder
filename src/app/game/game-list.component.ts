import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GameService } from './game.service';

import 'rxjs/add/operator/switchMap';


import { Game } from './objects/Game';
import { Request } from './objects/Request';
import { User } from '../user/objects/User';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent {
	games: Game[] = new Array();
	user: User;
	page = 1;
	pages = new Array();
	maxPages;
	constructor(private route: ActivatedRoute, private gameService: GameService, private router: Router){}
	
	ngOnInit() {
		let userString = localStorage.getItem("user");
		let user = JSON.parse(userString);
		this.user = new User(user.id, user.username, user.email, user.steamID, user.age);
		this.getGames();
	}
	
	getGames(){
		this.gameService.requestUserGames(this.user.steamID, this.page).then(data=>{
			this.games = new Array();
			for(let game of data.games){
				if(game.display == "0"){
					game.hidden = true;
				}else{
					game.hidden = false;
				}
				this.games.push(new Game(game.id, game.name, game.steamid, game.count, game.latest, game.hidden));
			}
			for(var i = 0; i<data.pages; i++){
			this.pages[i] = i+1;
			}
			this.maxPages = data.pages;
			//console.log(this.pages);
		})}
		
	gotoPage(page){
		this.page = page;
		this.getGames();
	}
	
	nextPage(){
		this.page++;
		this.getGames();
	}
	
	previousPage(){
		this.page--;
		this.getGames();
	}
	
	gameClicked(id){
		this.router.navigate(["game", id]);
	}
}