import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {RecentlyAddedComponent} from "./recently-added/recently-added.component";
import {GoLearningComponent} from "./go-learning/go-learning.component";

const routes: Routes = [
  {path: 'settings', component: SettingsComponent, pathMatch: 'full'},
  {path: 'added', component: RecentlyAddedComponent, pathMatch: 'full'},
  {path: 'go', component: GoLearningComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
