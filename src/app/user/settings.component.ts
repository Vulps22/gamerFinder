import { Component } from '@angular/core';

import { User } from './objects/User';

import { UserService } from './user.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})

export class SettingsComponent {
	//model: Options
	user;
	constructor(private userService: UserService) {}


}