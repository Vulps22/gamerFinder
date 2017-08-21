import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User} from './User';
import { Thread} from './Thread';
import { Message} from './Message';
import { UserService } from './user.service';
@Component({
  selector: 'message-view',
  templateUrl: './message.component.html',
})
export class MessageViewComponent{
	threads = new Array();
	selectedThread: Thread;
	user;
	page;
	selected = false;
	canLoad = false;
	defaultValue: string = '';

	constructor(private userService: UserService, private router: Router){}
	
	ngOnInit(){
		if(localStorage.getItem("user")){
			let u = localStorage.getItem("user");
			let user = JSON.parse(u);
			this.user = new User(user.id, user.username, user.email, user.steamID, user.age);
			console.log(this.user);
				this.userService.getThreadsForUser(this.user.id).then(data=>{
				console.log(data);
				this.threads = data;
			});
		}else{
			this.router.navigate([""]);
		}
		
	}
	
	selectThread(thread){
		this.selectedThread = new Thread(thread.id, thread.user1, thread.user2, thread.target, thread.count, new Array());
		this.page = 1;
		this.selected = true;
		this.getMessagesForThread();
	}
	
	getMessagesForThread(){

		
		console.log("getting messages for: ");
		console.log(this.selectedThread);
		this.userService.getMessagesForThread(this.selectedThread.id, this.page).then(data=>{
			console.log(data);
			if(data.length >0){
				this.selectedThread.messages.unshift.apply(this.selectedThread.messages, data)
				//this.selectedThread = thread;
				console.log(this.selectedThread);
				if(this.page < this.selectedThread.count){
					this.canLoad = true;
				}else{
					this.canLoad = false;
				}
				setTimeout(function(){
					var objDiv = document.getElementById("messages");
					console.log(objDiv.scrollHeight);
					console.log(objDiv.scrollTop);
					objDiv.scrollTop = objDiv.scrollHeight;
				}, 50);
			}
			
		})
	}
	
	/* updateMessagesForThread(){

		
		console.log("getting messages for: ");
		console.log(this.selectedThread);
		this.userService.getUnreadMessagesForThread(this.selectedThread.id).then(data=>{
			console.log(data);
			if(data.length >0){
				this.selectedThread.messages.push(data);
				//this.selectedThread = thread;
				console.log(this.selectedThread);
				if(this.page < this.selectedThread.count){
					this.canLoad = true;
				}else{
					this.canLoad = false;
				}
				setTimeout(function(){
						var objDiv = document.getElementById("messages");
						console.log(objDiv.scrollHeight);
						console.log(objDiv.scrollTop);
						objDiv.scrollTop = objDiv.scrollHeight;
				}, 50);
			}
			
		})
	} */
	
	shouldSend($event){
		//console.log($event);
		if ($event.keyCode == 13) {
			if($event.shiftKey){
				console.log("SHIFT + ENTER");
				
			}else{
				console.log("send message");
				let message = new Message("", this.selectedThread.id, this.user.id, $event.target.value);
				console.log(message);
				this.userService.sendMessage(message).then(data=>{
					this.defaultValue = '';
					this.selectedThread.messages.push(data);
					setTimeout(function(){
						var objDiv = document.getElementById("messages");
						console.log(objDiv.scrollHeight);
						console.log(objDiv.scrollTop);
						objDiv.scrollTop = objDiv.scrollHeight;
				}, 50);
				});
			}
		}
	}
	
	loadMore(){
		this.page ++;
		this.getMessagesForThread();
	}
}
