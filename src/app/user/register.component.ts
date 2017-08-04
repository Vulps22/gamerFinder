import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Register } from './Register';

import { UserService } from './user.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent{
	register = new Register("", "", "", "", "");
	showError = false;
	showParentalConsent = false;
	showSteamInstruction = false;
	agreed = false;
	tooYoung = false;
	errorMessage = "";
	constructor(private userService: UserService, private router: Router){}
	
	ngOnInit(){
	}
	
	doRegistration(){
		let r = this.register;
		if(r.username == "" || r.password == "" || r.email == "" || r.dob == ""){
			this.showError = true;
			this.errorMessage = "You must fill in all the fields before continuing.";
		}else if(this.checkAge() || !this.userExists() || !this.emailExists()){
			if(this.showParentalConsent){
				if(r.adultEmail == "" || r.adultEmail == undefined){
					this.showError = true;
					this.errorMessage = "Your parents must enter an email address before you can continue.";
				}else{
					if(!this.agreed){
						this.showError = true;
						this.errorMessage = "You must accept the Privacy Policy and Terms of Use before continuing."
					}else{
						this.showError == false;
						this.userService.doRegister(this.register);}
				}
			}else{
				console.log("Line 43");
					if(!this.agreed){
						console.log(this.agreed);
						console.log("not agreed");
						this.showError = true;
						this.errorMessage = "You must accept the Privacy Policy and Terms of Use before continuing."
					}else{
						console.log("agreed");
						this.showError == false;
						this.userService.doRegister(this.register).then(data=>{
							console.log("done!!!!!");
							window.location.assign('http://gamerfinder.net/classes/login.php');
						});
					}
				}
		}else{
			alert("Please review the errors shown below the submit button.");
		}
	}
		
	
	userExists(){
		this.userService.doesUsernameExist(this.register.username).then(data =>{
			if(data == "true"){
				this.showError = true;
				this.errorMessage = "Your username Already Exists.";
			}else{
				//showError = false;
				return false;
			}
		});
	}
	
	emailExists(){
		this.userService.doesEmailExist(this.register.email).then(data =>{
			if(data == "true"){
				this.showError = true;
				this.errorMessage = "Your email Already Exists.";
			}else{
				//showError = false;
				return false;
			}
		});
	}
	
	checkAge(){//is the user old enough
		let birthday = new Date(this.register.dob);  
		var today = new Date();  
		var years = today.getFullYear() - birthday.getFullYear();  

		// Reset birthday to the current year.  
		birthday.setFullYear(today.getFullYear());  

		// If the user's birthday has not occurred yet this year, subtract 1.  
		if (today < birthday)  
		{  
			years--;  
		}  
		if(this.tooYoung){
			return false;
		}else if(years < 13){
			this.showError = true;
			this.errorMessage = "You must be at least 13 to use this service."
			this.tooYoung = true;
			return false;
		}else if(years >=13 && years <18){
			this.showParentalConsent = true;
			return true;
		}
	}
	
}
