import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MapComponent } from './map/map.component';
import { ShapeService } from './_services/shape.service';
import { PopUpService } from './_services/pop-up.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    ContactComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ShapeService, PopUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
