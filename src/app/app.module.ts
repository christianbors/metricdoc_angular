import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { OpenRefineComponent } from './shared/open-refine/open-refine.component';
import { RawDataTableComponent } from './shared/raw-data-table/raw-data-table.component';
import { MetadataTestComponent } from './shared/metadata-test/metadata-test.component';
import { MetricOverviewComponent } from './shared/metric-overview/metric-overview.component';
import { MetricChecksOverviewComponent } from './shared/metric-checks-overview/metric-checks-overview.component';
import { QualityHeaderColComponent } from './shared/quality-header-col/quality-header-col.component';
import { SpanQualityHeaderColComponent } from './shared/span-quality-header-col/span-quality-header-col.component';

import { AccordionModule, PaginationModule, } from 'ng-bootstrap'
import { ContextMenuModule } from 'angular2-contextmenu';
import { RawDataScrollBarVisualizationComponent } from './shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component';
import { MetricDetailVisualizationComponent } from './shared/metric-detail-visualization/metric-detail-visualization.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckInputDirectiveDirective } from './shared/metric-checks-overview/check-input-directive.directive';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    HomeComponent,
    OpenRefineComponent,
    RawDataTableComponent,
    MetadataTestComponent,
    MetricOverviewComponent,
    MetricChecksOverviewComponent,
    QualityHeaderColComponent,
    SpanQualityHeaderColComponent,
    RawDataScrollBarVisualizationComponent,
    MetricDetailVisualizationComponent,
    CheckInputDirectiveDirective
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
