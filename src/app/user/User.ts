export class User {

  constructor(
    public id: string,
    public username: string,
    public email?: string,
    public steamID?: string,
	public age?: string,
	public picture?: string[],
	public hasMic?: boolean
	
  ) {  }

}