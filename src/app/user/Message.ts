export class Message {

  constructor(
    public id: string,
	public thread: string,
    public sender: string,
	public message: string,
	public read?: boolean,
  ) {  }

}