import { User } from '../user/user';
import { Game } from './Game';
export class Request {

  constructor(
    public id: string,
    public appID: string,
    public userID: string,
    public min: string,
	public max: string,
	public since?: string,
	public user?: User,
	public game?: Game,
	public mic?: boolean
  ) {  }

}