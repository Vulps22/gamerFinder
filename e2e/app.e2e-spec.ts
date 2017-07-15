import { PlayPage } from './app.po';

describe('play App', () => {
  let page: PlayPage;

  beforeEach(() => {
    page = new PlayPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
