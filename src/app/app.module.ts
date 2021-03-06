import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { OpenRefineComponent } from './shared/open-refine/open-refine.component';
import { RawDataTableComponent } from './shared/raw-data-table/raw-data-table.component';
import { MetricOverviewComponent } from './shared/metric-overview/metric-overview.component';
import { MetricChecksOverviewComponent } from './shared/metric-checks-overview/metric-checks-overview.component';
import { QualityHeaderColComponent } from './shared/quality-header-col/quality-header-col.component';
import { SpanQualityHeaderColComponent } from './shared/span-quality-header-col/span-quality-header-col.component';
import { RawDataScrollBarVisualizationComponent } from './shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component';
import { MetricDetailVisualizationComponent } from './shared/metric-detail-visualization/metric-detail-visualization.component';
import { CheckInputDirectiveDirective } from './shared/metric-checks-overview/check-input-directive.directive';
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListPipe, NonMetricsProjectListPipe } from './project-list/project-list.pipe';

import { ContextMenuModule } from 'ngx-contextmenu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { MetricBrowserComponent } from './metric-browser/metric-browser.component';
import { MetricPreviewComponent } from './test/metric-preview/metric-preview.component';
import { OpenDataProvenanceVisComponent } from './open-data-prov/provenance-vis/open-data-provenance-vis.component';
import { RefineProvenanceComponent } from './refine-provenance/refine-provenance.component';
import { ProvenanceProjectListPipe, NonProvenanceProjectListPipe } from './refine-provenance/provenance-project-list.pipe';
import { RefineProvenanceExplorerComponent } from './refine-provenance-explorer/refine-provenance-explorer.component';
import { QualityProvenanceVisComponent } from './refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/list-projects',
    pathMatch: 'full'
  },
  { path: 'home',
    redirectTo: '/list-projects',
    pathMatch: 'full'
  },
  {
    path: 'list-projects',
    component: ProjectListComponent,
    // Use it to store items such as page titles, breadcrumb text, and other read-only, static data. You'll use the resolve guard to retrieve dynamic data later in the guide.
    data: { title: 'MetricDoc Projects' }
  },
  { 
    path: 'create-project',
    component: CreateProjectComponent,
    data: { title: 'Create New MetricDoc Project'}
  },
  { 
    path: 'create-project/:projectId',
    component: CreateProjectComponent,
    data: { title: 'Create New MetricDoc Project'}
  },
  {
    path: 'metric-browser',
    component: MetricBrowserComponent,
    data: { title: 'Browse Available Metrics'}
  },
  {
    path: 'metric-project/:projectId',
    component: OpenRefineComponent
  },
  // Open Data Provenance - Adequate - Provenance Vis
  {
    path: 'open-data-provenance/:projectName',
    component: OpenDataProvenanceVisComponent,
    data: 
      {
        title: 'Open Data Provenance Visualization'
      }
  },
  {
    path: 'open-data-provenance',
    component: OpenDataProvenanceVisComponent,
    data: 
      {
        title: 'Open Data Provenance Visualization'
      }
  },
  {
    path: 'provenance-explorer',
    component: RefineProvenanceComponent,
    data: 
      {
        title: 'OpenRefine Quality Provenance List'
      }
  },
  {
    path: 'provenance-explorer/:projectId',
    component: RefineProvenanceExplorerComponent,
    data: 
      {
        title: 'OpenRefine Provenance Explorer'
      }
  },
  { path: '**', component: ProjectListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    OpenRefineComponent,
    RawDataTableComponent,
    MetricOverviewComponent,
    MetricChecksOverviewComponent,
    QualityHeaderColComponent,
    SpanQualityHeaderColComponent,
    RawDataScrollBarVisualizationComponent,
    MetricDetailVisualizationComponent,
    CheckInputDirectiveDirective,
    ProjectListComponent,
    CreateProjectComponent,
    ProjectListPipe, 
    NonMetricsProjectListPipe, 
    MetricBrowserComponent, 
    MetricPreviewComponent, 
    OpenDataProvenanceVisComponent, 
    RefineProvenanceComponent, 
    ProvenanceProjectListPipe,
    NonProvenanceProjectListPipe,
    RefineProvenanceExplorerComponent,
    QualityProvenanceVisComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
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
