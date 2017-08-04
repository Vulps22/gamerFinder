import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { GameViewComponent } from './game.component';
import { GamesViewComponent } from './games-view.component';

const gameRoutes: Routes = [
  { path: 'game/:id', component: GameViewComponent },
  { path: 'games', component: GamesViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(gameRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule {}