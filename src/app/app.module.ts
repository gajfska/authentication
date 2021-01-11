import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
      RegisterComponent,
      LoginComponent,
      HomeComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
