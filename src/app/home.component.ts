import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from './game/game.service';
import{ Game } from './game/objects/Game';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameService]
})
export class HomePageComponent implements OnInit{
  title = 'app';
  games = new Array();
  constructor(private http: Http, private gameService: GameService, private router: Router){
  }
  
  ngOnInit(){
	  this.gameService.doGetMostRequested().then( data=>{
		  for(let g of data){
			  this.games.push(new Game(g.id, g.name, g.steamid, g.requests));
		  }
	  });
	}
	
	gameClicked(id){
		this.router.navigate(["game", id]);
	}
}
