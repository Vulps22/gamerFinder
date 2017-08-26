import { Component } from '@angular/core';
import { DropdownModule  } from 'ngx-dropdown';


import { UserModule } from './user/user.module';
import { User } from './user/objects/User';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html'
})
export class navbarComponent {
	isCollapsed = true;
	user: User;
	
	ngOnInit(){
		this.isLoggedIn();
	}
	
	isLoggedIn(){
		
		if(localStorage.getItem("user")){
			let u = localStorage.getItem("user");
			let user = JSON.parse(u);
			this.user = new User(user["id"], user["username"], user["email"], user["steamID"], user["age"]);
			//console.log("USER");
			//console.log(this.user);
			return true;
		}else{
			return false;
		}
		
	}
	
	logout(){
		localStorage.removeItem("user");
		 this.user = undefined;
	}
}