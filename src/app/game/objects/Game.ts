export class Game {

  constructor(
    public id: string,
    public name: string,
    public steamID: string,
    public count?: string,
	public latest?: string,
	public hidden?: boolean
	
  ) {  }

}