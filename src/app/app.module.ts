import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HighchartsChartModule} from 'highcharts-angular';
import {AgGridModule} from 'ag-grid-angular';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';
import {FormsModule} from '@angular/forms';
import {NgxScrollTopModule} from 'ngx-scrolltop';

import {MapComponent} from './map/map.component';
import {ShapeService} from './_services/shape.service';
import {PopUpService} from './_services/pop-up.service';
import {NavbarComponent} from './navbar/navbar.component';
import {ContactComponent} from './contact/contact.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartCaseComponent} from './chart/chartCase.component';
import {TablegridComponent} from './tablegrid/tablegrid.component';
import {ChartDeathComponent} from './chart/chart-death.component';
import {FooterComponent} from './footer/footer.component';
import {GoogleAnalyticsService} from './_services/google-analytics.service';
import {TablesummaryComponent} from './tablesummary/tablesummary.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    ContactComponent,
    DashboardComponent,
    ChartCaseComponent,
    TablegridComponent,
    ChartDeathComponent,
    FooterComponent,
    TablesummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    EmojiModule,
    FormsModule,
    NgxScrollTopModule,
    AgGridModule.withComponents([])
  ],
  providers: [ShapeService, PopUpService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
