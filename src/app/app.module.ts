import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AirPollutionWorldComponent } from './air-pollution-world/air-pollution-world.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AirPollutionWorldMapComponent } from './air-pollution-world/air-pollution-world-map/air-pollution-world-map.component';

@NgModule({
  declarations: [
    AppComponent,
    AirPollutionWorldComponent,
    HomeComponent,
    AirPollutionWorldMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
