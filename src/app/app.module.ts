import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AirPollutionWorldComponent } from './air-pollution-world/air-pollution-world.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AirPollutionWorldMapComponent } from './air-pollution-world/air-pollution-world-map/air-pollution-world-map.component';
import { AirPollutionWorldTable } from './air-pollution-world/air-pollution-world-table/air-pollution-world-table.component';
import { AirPollutionWorldFigures } from './air-pollution-world/air-pollution-world-figures/air-pollution-world-figures.component';
import { AirPollutionWorldFilterComponent } from './air-pollution-world/air-pollution-world-filter/air-pollution-world-filter.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AirPollutionWorldComponent,
    HomeComponent,
    AirPollutionWorldMapComponent,
    AirPollutionWorldTable,
    AirPollutionWorldFigures,
    AirPollutionWorldFilterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
