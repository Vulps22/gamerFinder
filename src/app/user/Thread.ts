import{User} from './User';
import{Message} from './Message';
export class Thread {

  constructor(
    public id: string,
    public user1: string,
    public user2: string,
    public target: string,
	public count: string,
	public messages?: Message[]
	
  ) {  }

}