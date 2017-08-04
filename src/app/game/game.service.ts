import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';

import { Game } from './Game';
import { Request } from './request';

@Injectable()
export class GameService {
	
	constructor(private http: Http){}
	
	getGame(id){
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=gameGet";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>console.log(data))
			.map(response=> <Game>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	flagGame(id, user){
		/* console.log("=========flagGameParams==========")
		console.log(id);
		console.log(user); */
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
		params.set('user', user);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=gameFlag";
		this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
		.subscribe();
	}
	
	addRequest(request: Request){
		 console.log("=========addRequestParams==========")
		console.log(request); 
		let params: URLSearchParams = new URLSearchParams();
		params.set('app', request.appID);
		params.set('user', request.userID);
		params.set('min', request.min);
		params.set('max', request.max);
		if(request.mic){
			params.set('mic', "1");
		}else{
			params.set('mic', "0");
		}
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=requestAdd";
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
		return tempPromise.toPromise();
	}
	
	getRequestsForGame(id, age){
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
		params.set('age', age);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=requestGet";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> <Request>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	requestUserGames(id, page){

		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
		params.set('page', page);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=gameUserGames";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>console.log(data))
			.map(response=> <Game[]>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	requestAllGames(page){

		let params: URLSearchParams = new URLSearchParams();
		params.set('page', page);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=gameAllGames";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>console.log(data))
			.map(response=> <Game[]>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	doSearch(search, page){

		let params: URLSearchParams = new URLSearchParams();
		params.set('page', page);
		params.set('search', search);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=gameSearch";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>console.log(data))
			.map(response=> <Game[]>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	doGetMostRequested(){
	  let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=requestMost";
	  let tempPromise = this.http.get(SERVICE_URL)
			.do(data=>console.log(data))
			.map(response=> <Game>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
  }
  
	getRequestCountForGame(id){
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=requestCount";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>console.log(data))
			.map(response=> <Game[]>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
	}
	
	private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}
}