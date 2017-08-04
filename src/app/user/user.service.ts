import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { User } from './User';
import { Register } from './Register';
import { Message } from './Message';
import { Thread } from './Thread';
import { Request } from '../game/Request';

@Injectable()
export class UserService {
	user;
	isLoggedIn = false;
	constructor(private http: Http, private router: Router){}
	
	getUser(id){
		
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=userGet";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> <User>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	login(model){
		
		let params: URLSearchParams = new URLSearchParams();
		params.set('username', model.username);
		params.set('password', model.pass);
		this.doLogin(params).then(data=> {
			this.user = data;
			if(this.user == "2"){
				alert("Username or password is incorrect");
				return false;
			}else if(this.user == "1"){
				alert("ERROR: Missing data");
				return false;
			}else{
				console.log(this.user["id"]);
				localStorage.setItem("user", JSON.stringify(this.user));
				this.user = new User(this.user["id"], this.user["username"], this.user["email"], this.user["steamID"], this.user["age"]);
				this.isLoggedIn = true;
				this.router.navigate(["user"]);
			}
		},(error)=>{});		
	}
	
	doLogin(params: URLSearchParams): Promise<string>{
		
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=userLogin";
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> <string> response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
    }
	
	getIsLoggedIn(){
		return this.isLoggedIn;
	}
	
	doRegister(r: Register){
		
		let params: URLSearchParams = new URLSearchParams();
		params.set('username', r.username);
		params.set('password', r.password);
		params.set('email', r.email);
		//params.set('steamid', r.steamID);
		params.set('dob', r.dob);

		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=userCreate";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			//.map(response=> response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	doesUsernameExist(username){
		let params: URLSearchParams = new URLSearchParams();
		params.set('username', username);
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=chkUsername";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
	}
	
	doesEmailExist(email){
		let params: URLSearchParams = new URLSearchParams();
		params.set('email', email);
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=chkEmail";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
	}
	
	getThreadsForUser(id){
		
		let params: URLSearchParams = new URLSearchParams();
		params.set('user', id);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=messageGetThreads";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> <Thread>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	
	getMessagesForThread(id, page){
		let params: URLSearchParams = new URLSearchParams();
		params.set('thread', id);
		params.set('page', page);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=messageGetThread";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> <Message[]>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	sendMessage(m){
		let params: URLSearchParams = new URLSearchParams();
		params.set('thread', m.thread);
		params.set('sender', m.sender);
		params.set('message', m.message);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=messageSend";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=><Message>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
		
	}
	getRequestsFromUser(id){
		let params: URLSearchParams = new URLSearchParams();
		params.set('id', id);
	
		let SERVICE_URL = "http://gamerfinder.net/classes/index.php?fn=requestGetUser";
		
		let tempPromise = this.http.get(SERVICE_URL, new RequestOptions({"search": params}))
			.do(data=>{})
			.map(response=> <Request[]>response.json())
			.catch(this.handleError);
		return tempPromise.toPromise();
	}
	
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	
}