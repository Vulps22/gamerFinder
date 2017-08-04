export class Register {

  constructor(
    public username: string,
	public password: string,
	public email: string,
    public steamID: string,
	public dob: string,
	public adultEmail?: string
	
  ) {  }

}