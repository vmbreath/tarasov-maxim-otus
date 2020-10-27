import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecentlyAddedComponent} from './recently-added/recently-added.component';
import {GoLearningComponent} from './go-learning/go-learning.component';
import {SettingsComponent} from './settings/settings.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {path: '', component: GoLearningComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'added', component: RecentlyAddedComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RecentlyAddedComponent,
    GoLearningComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
