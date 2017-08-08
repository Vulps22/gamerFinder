import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component'
import { HomePageComponent } from './home.component'
import { AboutViewComponent } from './about.component'
import { ChangeLogComponent } from './change-log.component'

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutViewComponent },
  { path: 'changes', component: ChangeLogComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}