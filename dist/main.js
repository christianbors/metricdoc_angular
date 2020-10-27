(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-toggleable-md navbar-light bg-light\">\n  <a class=\"navbar-brand\" href=\"/list-projects\">MetricDoc</a>\n  <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#metricdocDropdown\" aria-controls=\"metricdocDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"metricdocDropdown\">\n    <ul class=\"navbar-nav mr-auto\">\n      <!-- <li class=\"nav-item\"\n        [class.disabled]=\"!projectActive\">\n        <a class=\"nav-link\" href=\"\" id=\"addMetric\" data-toggle=\"modal\" data-target=\"#addMetricModal\">Back To Project Overview</a>\n      </li> -->\n      <li class=\"nav-item dropdown\" *ngIf=\"projectId\">\n        <a class=\"nav-link nav-item dropdown-toggle\" href=\"\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Current Project <span class=\"caret\"></span></a>\n        <ul class=\"dropdown-menu\">\n          <li><a class=\"nav-link nav-item\" id=\"addMetric\">Add Metric</a></li>\n          <li><a class=\"nav-link nav-item\" id=\"exportMetrics\" (click)=\"onRecalculate()\">Recalculate All ...</a></li>\n        </ul>\n      </li>\n     <li class=\"nav-item dropdown\" *ngIf=\"projectId\">\n        <a class=\"nav-link nav-item dropdown-toggle\" href=\"\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Metrics Library<span class=\"caret\"></span></a>\n        <ul class=\"dropdown-menu\">\n          <li class=\"dropdown-header\">Import</li>\n          <li><a class=\"nav-link nav-item\" href=\"\" id=\"importMetrics\">Import Metrics</a></li>\n          <li><a class=\"nav-link nav-item\" href=\"\" id=\"importProject\">Import Project Settings</a></li>\n\n          <li class=\"dropdown-header\">Export</li>\n          <li><a class=\"nav-link nav-item\" href=\"\" id=\"exportQuality\">Export Quality Values</a></li>\n          <li><a class=\"nav-link nav-item\" href=\"\" id=\"exportMetrics\">Export Quality Metrics</a></li>\n        </ul>\n      </li>\n      <!-- <li>\n        <a class=\"nav-link\" href=\"#\" id=\"showExamples\" data-toggle=\"modal\" data-target=\"#examplesModal\">Metric and Check Info</a>\n      </li> -->\n    </ul>\n  </div>\n\n</nav>\n\n<div class=\"container-fluid\">\n  <div class=\"row\" style=\"min-height: 90vh\">\n    <nav class=\"col-sm-3 col-md-2 hidden-xs-down bg-light sidebar\"\n      [hidden]=\"!sidebarShown\">\n      <ul class=\"nav nav-pills flex-column\" *ngIf=\"navbarPos\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"/list-projects\"\n            [class.active]=\"navbarPos == '/list-projects'\">Available Projects <span class=\"sr-only\">(current)</span></a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"/create-project\"\n            [class.active]=\"navbarPos.includes('/create-project')\"\n            (click)=\"this.routingHelperService.navigateTo('create-project')\">Create New Project</a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"/metric-browser\"\n            [class.active]=\"navbarPos.includes('/metric-browser')\">Browse Available Metrics</a>\n        </li>\n        <!-- <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"/open-data-provenance\"\n            [class.active]=\"navbarPos.includes('/open-data-provenance')\">Open Data Provenance</a>\n        </li> -->\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"/provenance-explorer\"\n            [class.active]=\"navbarPos.includes('/refine-provenance')\">OpenRefine Quality Provenance</a>\n        </li>\n      </ul>\n    </nav>\n    <div [class.col-sm-9]=\"sidebarShown\"\n      [class.col-sm-12]=\"!sidebarShown\">\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</div>\n<div class='d3tooltip'></div>\n\n \n<!-- <li class=\"nav-item\">\n  <a class=\"nav-link\" href=\"\" id=\"addMetric\" data-toggle=\"modal\" data-target=\"#addMetricModal\">Add Metric</a>\n</li> -->\n<!-- <li class=\"nav-item\">\n  <a class=\"nav-link\" href=\"\" id=\"recalculate\">Recalculate Metrics</a>\n</li> -->\n<!-- <li class=\"nav-item dropdown\">\n  <a class=\"nav-link nav-item dropdown-toggle\" href=\"\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Export <span class=\"caret\"></span></a>\n  <ul class=\"dropdown-menu\">\n    <li><a class=\"nav-link nav-item\" href=\"\" id=\"exportQuality\">Export Quality Values</a></li>\n    <li><a class=\"nav-link nav-item\" href=\"\" id=\"exportMetrics\">Export Quality Metrics</a></li>\n  </ul>\n</li> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/create-project/create-project.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/create-project/create-project.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"projectId\">\n  <ng-container *ngIf=\"projectMetadata && refineProject && rowModel\">\n  <h2>\n    {{projectMetadata.name}}\n  </h2>\n  <p>\n    Number of Columns: {{refineProject.columnModel.columns.length}}\n  </p>\n  <p>\n    Number of Rows: {{rowModel.total}}\n  </p>\n  <p>\n    <button type=\"button\" class=\"btn btn-secondary\" \n      (click)=\"goToRefineProject()\">\n        Go To OpenRefine Project\n    </button>\n    <button type=\"button\" class=\"btn btn-primary\"\n      [disabled]=\"importSuccess\"\n      (click)=\"addMetricsOverlay()\">\n        Convert to Metrics Project\n    </button>\n  </p>\n  <p>\n    <ngb-alert *ngIf=\"errorMessage\" [dismissible]=\"true\">\n      <strong>Error:</strong> {{errorMessage}}\n    </ngb-alert>\n  </p>\n  </ng-container>\n  <ng-container *ngIf=\"metricFunctions\">\n    <h3>Recommended Metrics</h3>\n    <div class=\"list-group\" style=\"margin-bottom: 12px\" *ngFor=\"let functionsColumn of objectKeys(metricFunctions); let colIndex = index; trackBy: columnFn\">\n      <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n        Column: {{functionsColumn}}\n      </li>\n      <!-- [routerLink]=\"['/metric-project', proj.key]\"\n        routerLinkActive=\"active\" -->\n      <li class=\"list-group-item list-group-item-action flex-column\" \n        *ngFor=\"let metricRecommendation of metricFunctions[functionsColumn]; let metricIndex = index; trackBy: metricFn\"\n        [class.disabled]=\"metricsDisabled[functionsColumn][metricIndex]\"\n        (click)=\"toggleMetric($event, functionsColumn, metricIndex)\">\n        <div class=\"d-flex w-100 justify-content-between\">\n          <div class=\"float-left\">\n            <span class=\"fa fa-bar-chart\"></span>\n            Metric - {{metricRecommendation.name}}\n          </div>\n          <div class=\"float-right\">{{metricRecommendation.name}}( \n            <input type=\"text\" \n              [value]=\"metricRecommendation.parameters\" \n              (click)=\"$event.stopPropagation()\"\n              (keyup)=\"onTextKey($event, colIndex, metricIndex)\"> )\n          </div>\n        </div>\n        <div class=\"d-flex w-100 justify-content-between\">\n          <small [style.marginRight.px]=\"100\">Description: {{metricRecommendation.description}}</small>\n          <small class=\"float-right\">Default Parameters: {{metricRecommendation.params}}</small>\n        </div>\n      </li>\n    </div>\n  </ng-container>\n</ng-container>\n<ng-container *ngIf=\"!projectId\">\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Choose From Existing Project:\n    <span class=\"badge badge-default badge-pill\">{{(refineProjects | nonMetricProjects).length}}</span>\n  </li>\n  <!-- (click)=\"openProject(rowIndex)\"> -->\n  <li class=\"list-group-item list-group-item-action flex-column\" *ngFor=\"let proj of (refineProjects | nonMetricProjects); let rowIndex = index; trackBy: rowFn\"\n    [routerLink]=\"['/create-project', proj.key]\"\n    routerLinkActive=\"active\">\n    <div class=\"d-flex w-100 justify-content-between\">\n      <div class=\"float-left\">\n        <span class=\"fa fa-calculator fa-lg\"></span>\n        {{proj.value.name}}\n      </div>\n      <!-- <span class=\"float-left\"></span> -->\n    </div>\n    <div class=\"d-flex w-100 justify-content-between\">\n      <small class=\"float-left\">last changed: {{proj.value.modified}}</small>\n      <small class=\"float-right\">created: {{proj.value.created}}</small>\n    </div>\n  </li>\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Go to OpenRefine ...\n    <!-- <span class=\"badge badge-default badge-pill\">{{(refineProjects | nonMetricProjects).length}}</span> -->\n  </li>\n</ng-container>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/metric-browser/metric-browser.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/metric-browser/metric-browser.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <p></p> -->\n<table *ngIf=\"availableMetrics\">\n  <thead class=\"thead-default\">\n    <th>Name</th>\n    <th>Description</th>\n    <th>Parameters</th>\n    <th>Default Parameters</th>\n    <th>Returns</th>\n  </thead>\n  <tr *ngFor=\"let singleColFunction of availableMetrics.singleColumnFunctions\">\n    <th></th>\n    <th>{{singleColFunction.description}}</th>\n    <th>{{singleColFunction.params}}</th>\n    <th>{{singleColFunction.defaultParams}}</th>\n    <th>{{singleColFunction.returns}}</th>\n  </tr>\n</table>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"list-group\" style=\"margin-bottom: 12px\" *ngIf=\"!projectId\">\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Active Metric Projects\n  </li>\n  <li class=\"list-group-item list-group-item-action flex-column\" \n    *ngFor=\"let proj of gitlabProjects; let rowIndex = index; trackBy: rowFn\"\n    [routerLink]=\"['/open-data-provenance', proj.id]\"\n    routerLinkActive=\"active\">\n    <div class=\"d-flex w-100 justify-content-between\">\n      <div class=\"float-left\">\n        <span class=\"fa fa-calculator fa-lg\"></span>\n        {{proj.name_with_namespace}}\n        <!-- <metric-preview [projectId]=\"proj.key\"></metric-preview> -->\n      </div>\n      <!-- <span class=\"float-left\"></span> -->\n    </div>\n    <div class=\"d-flex w-100 justify-content-between\">\n      <small class=\"float-left\">last changed: {{proj.last_activity_at}}</small>\n      <small class=\"float-right\">created: {{proj.created_at}}</small>\n    </div>\n</div>\n<svg class=\"quality-stream\" [style.width.px]=\"1500\"\n  [style.height.px]=\"350\" *ngIf=\"projectId\"></svg>\n<svg class=\"git-graph\" [style.width.px]=\"1500\"\n  [style.height.px]=\"350\" *ngIf=\"projectId\"></svg>\n<!-- <div>\n  <p *ngFor=\"let commit of commits\">created: {{commit.created_at}}, id: {{commit.id}}</p>\n</div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/project-list/project-list.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/project-list/project-list.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>OpenRefine Projects</h1>\n<!-- <ul class=\"list-group\"> -->\n<div class=\"list-group\" style=\"margin-bottom: 12px\" *ngIf=\"refineProjects\">\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Active Metric Projects\n    <span class=\"badge badge-default badge-pill\">{{(refineProjects | metricProjects).length}}</span>\n  </li>\n  <li class=\"list-group-item list-group-item-action flex-column\" \n    *ngFor=\"let proj of (refineProjects | metricProjects); let rowIndex = index; trackBy: rowFn\"\n    [routerLink]=\"['/metric-project', proj.key]\"\n    routerLinkActive=\"active\">\n    <div class=\"d-flex w-100 justify-content-between\">\n      <div class=\"float-left\">\n        <span class=\"fa fa-calculator fa-lg\"></span>\n        {{proj.value.name}}\n        <!-- <metric-preview [projectId]=\"proj.key\"\n          [svgHeight]=\"100\"></metric-preview> -->\n      </div>\n      <!-- <span class=\"float-left\"></span> -->\n    </div>\n    <div class=\"d-flex w-100 justify-content-between\">\n      <small class=\"float-left\">last changed: {{proj.value.modified}}</small>\n      <small class=\"float-right\">created: {{proj.value.created}}</small>\n    </div>\n  </li>\n</div>\n<!-- Projects without Metrics Added -->\n<div class=\"list-group\" *ngIf=\"refineProjects\">\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Projects Missing Metrics\n    <span class=\"badge badge-default badge-pill\">{{(refineProjects | nonMetricProjects).length}}</span>\n  </li>\n  <!-- (click)=\"openProject(rowIndex)\"> -->\n  <li class=\"list-group-item list-group-item-action flex-column disabled\" *ngFor=\"let proj of (refineProjects | nonMetricProjects); let rowIndex = index; trackBy: rowFn\"\n    [routerLink]=\"['/create-project', proj.key]\"\n    routerLinkActive=\"active\"\n    (click)=\"this.routineHelperService.navigateTo('create-project')\">\n    <div class=\"d-flex w-100 justify-content-between\">\n      <div class=\"float-left\">\n        <span class=\"fa fa-calculator fa-lg\"></span>\n        {{proj.value.name}}\n      </div>\n      <!-- <span class=\"float-left\"></span> -->\n    </div>\n    <div class=\"d-flex w-100 justify-content-between\">\n      <small class=\"float-left\">last changed: {{proj.value.modified}}</small>\n      <small class=\"float-right\">created: {{proj.value.created}}</small>\n    </div>\n  </li>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.html ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- OLD VIEW -->\n<!-- <svg #qualityView class=\"barchart\" id=\"qualityView\" [style.width.%]=\"qualityViewWidth\" [style.height.%]=\"componentHeight\"></svg> -->\n<svg #qualityComparison class=\"barchart\" id=\"comparisonView\" [style.width.%]=\"100\" [style.height.%]=\"componentHeight\">\n  <!-- OLD DETAIL VIEW -->\n  <svg #issueView class=\"heatmap\" id=\"issueView\" *ngIf=\"showDetail\" [style.width.px]=\"detailViewWidth\" [style.height.%]=\"componentHeight\"></svg>\n</svg>\n<!-- <h3>Issues per Transformation Step</h3>\n<svg #issuesHistory class=\"barchart\" id=\"issueHistory\" [style.width.%]=\"100\" [style.height.%]=\"componentHeight\"></svg> -->\n<!-- <h3>Quality Comparison View</h3>\n<svg #qualityComparison class=\"barchart\" id=\"comparisonView\" [style.width.%]=\"100\" [style.height.%]=\"componentHeight\"></svg> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/refine-provenance-explorer/refine-provenance-explorer.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/refine-provenance-explorer/refine-provenance-explorer.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Quality Metrics per Transformation Step\n  <button class=\"btn btn-primary btn-sm\" \n    (click)=\"toggleShowDetail(); $event.stopPropagation(); $event.preventDefault()\">Toggle Detail\n  </button>\n</h3>\n<app-quality-provenance-vis #qualityProvenanceVis \n  [pageWidth]=\"pageWidth\" \n  [componentHeight]=\"detailHeight\"\n  [openRefineService]=\"openRefineService\"\n  [projectId]=\"projectId\"\n  [histId]=\"histId\"\n  [shiftHistId]=\"shiftHistId\"\n  [nodeHistory]=\"nodeHistory\"\n  [shiftNodeHistory]=\"shiftNodeHistory\"\n  [nodeWidth]=\"nodeWidth\"\n  [scaleHistory]= \"scaleHistory\"\n  [sankeyDiag]=\"sankeyDiag\"\n  [qualityViewWidth]=\"qualityViewWidth\"\n  [showDetail]=\"showDetail\"\n  [detailViewWidth]=\"detailViewWidth\"\n  [loadFinished]=\"loadFinished\"></app-quality-provenance-vis>\n<svg #provGraph class=\"provGraph\" [style.width.%]=\"pageWidth\" [style.height.%]=\"sankeyHeight\"></svg>\n<context-menu #qualityMetric>\n  <!-- <ng-template contextMenuItem divider=\"true\"></ng-template> -->\n  <ng-template contextMenuItem let-item (execute)=\"deleteMetric($event.item)\">\n    Bye, {{item?.name}}\n  </ng-template>\n  <ng-template contextMenuItem passive=\"true\">\n    Input something: <input type=\"text\">\n  </ng-template>\n</context-menu>\n<context-menu #issue>\n  <ng-template contextMenuItem let-item>\n    Add Metric: {{item}}\n  </ng-template>\n</context-menu>\n<!-- TODO: uncomment refine project -->\n<!-- <iframe [style.width.%]=\"pageWidth\" [style.height.%]=\"refineHeight\" [src]=\"refineProjectUrl\"></iframe> -->\n <!-- (window:resize)=\"onResize(svg.getBoundingClientRect())\" -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/refine-provenance/refine-provenance.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/refine-provenance/refine-provenance.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>OpenRefine Quality Provenance Explorer</h1>\n<!-- <ul class=\"list-group\"> -->\n<div class=\"list-group\" style=\"margin-bottom: 12px\" *ngIf=\"refineProjects\">\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Available Quality Provenance Projects\n    <span class=\"badge badge-default badge-pill\">{{(refineProjects | provenanceProjectList).length}}</span>\n  </li>\n  <li class=\"list-group-item list-group-item-action flex-column\" \n    *ngFor=\"let proj of (refineProjects | provenanceProjectList); let rowIndex = index; trackBy: rowFn\"\n    [routerLink]=\"['/provenance-explorer', proj.key]\"\n    routerLinkActive=\"active\">\n    <div class=\"d-flex w-100 justify-content-between\">\n      <div class=\"float-left\">\n        <span class=\"fa fa-calculator fa-lg\"></span>\n        {{proj.value.name}}\n      </div>\n      <!-- <span class=\"float-left\"></span> -->\n    </div>\n    <div class=\"d-flex w-100 justify-content-between\">\n      <small class=\"float-left\">last changed: {{proj.value.modified}}</small>\n      <small class=\"float-right\">created: {{proj.value.created}}</small>\n    </div>\n  </li>\n</div>\n<!-- Projects without Metrics Added -->\n<div class=\"list-group\" *ngIf=\"refineProjects\">\n  <li class=\"list-group-item justify-content-between list-group-item-secondary\">\n    Projects Without Provenance\n    <span class=\"badge badge-default badge-pill\">{{(refineProjects | nonProvenanceProjectList).length}}</span>\n  </li>\n  <!-- (click)=\"openProject(rowIndex)\"> -->\n  <li class=\"list-group-item list-group-item-action flex-column disabled\" *ngFor=\"let proj of (refineProjects | nonProvenanceProjectList); let rowIndex = index; trackBy: rowFn\"\n    [routerLink]=\"['/create-project', proj.key]\"\n    routerLinkActive=\"active\"\n    (click)=\"this.routineHelperService.navigateTo('create-project')\">\n    <div class=\"d-flex w-100 justify-content-between\">\n      <div class=\"float-left\">\n        <span class=\"fa fa-calculator fa-lg\"></span>\n        {{proj.value.name}}\n      </div>\n      <!-- <span class=\"float-left\"></span> -->\n    </div>\n    <div class=\"d-flex w-100 justify-content-between\">\n      <small class=\"float-left\">last changed: {{proj.value.modified}}</small>\n      <small class=\"float-right\">created: {{proj.value.created}}</small>\n    </div>\n  </li>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/barchart/barchart.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/barchart/barchart.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d3-chart\" #chart></div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/metric-checks-overview/metric-checks-overview.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/metric-checks-overview/metric-checks-overview.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-4\">\n    <ngb-accordion #acc=\"ngbAccordion\" activeIds=\"\"\n      class=\"metric-info-panel\">\n      <ngb-panel\n        title=\"Metric Detail\"\n        [disabled]=\"!metricSelection\">\n        <ng-template *ngIf=\"metricSelection\" id=\"simpleList\" class=\"list-group fixed-panel\" ngbPanelContent>\n            <label>Name: {{metricSelection[0].name}}</label>\n            <br>\n            <label>Description: {{metricSelection[0].description}}</label>\n            <br>\n            <form action=\"\">\n              <label>Data Type: </label>\n              <input type=\"radio\" [(ngModel)]=\"metricSelection[0].datatype\"\n                [checked]=\"metricSelection[0].datatype == 'string'\"\n                (change)=\"onSelectionChange('string')\"\n                name=\"datatype\" \n                value=\"string\"> String\n              <input type=\"radio\" [(ngModel)]=\"metricSelection[0].datatype\"\n                [checked]=\"metricSelection[0].datatype == 'numeric'\" \n                (change)=\"onSelectionChange('numeric')\"\n                name=\"datatype\" \n                value=\"numeric\"> Numeric\n              <input type=\"radio\" [(ngModel)]=\"metricSelection[0].datatype\"\n                [checked]=\"metricSelection[0].datatype == 'datetime'\" \n                (change)=\"onSelectionChange('datetime')\"\n                name=\"datatype\" \n                value=\"datetime\"> Date/Time\n              <input type=\"radio\" [(ngModel)]=\"metricSelection[0].datatype\"\n                [checked]=\"metricSelection[0].datatype == 'unknown'\"\n                (change)=\"onSelectionChange('unknown')\"\n                name=\"datatype\" \n                value=\"categoric\"> Undefined\n            </form>\n        </ng-template>\n      </ngb-panel>\n    </ngb-accordion>\n  </div>\n  <div class=\"col-md-8\">\n    <ngb-accordion class=\"checks-panel\" (panelChange)=\"beforeChange($event)\">\n      <ngb-panel [disabled]=\"!metricSelection\">\n        <ng-template ngbPanelTitle>\n          <span>\n            <div class=\"panel-title float-left\">\n              Quality Checks\n              <button class=\"btn btn-primary btn-sm\" \n                (click)=\"addCheck(); $event.stopPropagation(); $event.preventDefault()\"\n                [disabled]=\"!metricSelection\">Add Check</button>\n            </div>\n            <!-- <div *ngIf=\"metricSelection\" class=\"panel-title float-right\">Concatenation: -->\n              <div *ngIf=\"metricSelection\" [(ngModel)]=\"metricSelection[0].concat\" class=\"panel-title float-right\" ngbRadioGroup name=\"concat\">\n                Concatenation:\n                <label class=\"btn btn-secondary btn-sm\"\n                  [style.margin]=0\n                  (click)=\"clickConcat($event, 'AND')\">\n                  <input type=\"radio\" value=\"AND\"> AND\n                </label>\n                <label class=\"btn btn-secondary btn-sm\"\n                  [style.margin]=0\n                  (click)=\"clickConcat($event, 'OR')\">\n                  <input type=\"radio\" value=\"OR\"> OR\n                </label>\n              </div>\n            <!-- </div> -->\n          </span>\n          <!-- <div class=\"clearfix\"></div> -->\n        </ng-template>\n        <ng-template *ngIf=\"metricSelection\" id=\"checksList\" class=\"list-group fixed-panel\" ngbPanelContent>\n          <ul class=\"list-group\">\n            <ng-template #popContent>\n              <div ngbRadioGroup \n                name=\"context-menu\"\n                [(ngModel)]=\"selectedEvaluable\">\n                <button class=\"btn btn-danger btn-sm\"\n                  (click)=\"removeEvaluableSelection()\">remove</button>\n                <button class=\"btn btn-sm\"\n                  (click)=\"disableEvaluableSelection()\">{{selectedEvaluable.disabled ? 'enable' : 'disable'}}</button>\n                <button class=\"btn btn-primary btn-sm\">comment</button>\n              </div>\n            </ng-template>\n            <div class=\"input-group\"\n              *ngIf=\"metricSelection[0].spanningEvaluable\">\n              <span class=\"input-group-addon\" placement=\"top\" \n                [ngbPopover]=\"popContent\"\n                (click)=\"onSelectEvaluable(metricSelection[0].spanningEvaluable)\">Edit</span>\n              <input class=\"form-control list-group-item pop metricInput\" \n                [(ngModel)]=\"metricSelection[0].spanningEvaluable.evaluable\"\n                (keyup)=\"checkValidity($event)\"\n                (click)=\"onSelectEvaluable(metricSelection[0].spanningEvaluable)\">\n            </div>\n            <div class=\"input-group\" *ngFor=\"let check of metricSelection[0].evalTuples\" #popover=\"\">\n                <span class=\"input-group-addon\" placement=\"top\"\n                  [ngbPopover]=\"popContent\"\n                  (click)=\"onSelectEvaluable(check)\">Edit</span>\n                <input class=\"form-control list-group-item pop metricInput\"\n                  [(ngModel)]=\"check.evaluable\"\n                  (keyup)=\"checkValidity($event)\"\n                  (click)=\"onSelectEvaluable(check)\"\n                  placement=\"bottom\"\n                  (ngbTooltip)=\"check.comment\">\n            </div>\n          </ul>\n        </ng-template>\n      </ngb-panel>\n    </ngb-accordion>\n  </div>\n</div>\n<div *ngIf=\"alertType\" class=\"row\">\n  <div class=\"col-md-12\">\n    <ngb-alert *ngIf=\"alertType != 'info'\" [type]=\"alertType\">{{ checkFeedback }}</ngb-alert>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"metricSelection\" \n    #legend\n    [style.height.px]=\"viewOffsetTop - 49\">\n  <h4 #detailTitle>Detail View  <button type=\"button\" class=\"btn btn-info btn-xs\">Info</button></h4>\n  <div #metricInfo>\n    <h5 *ngIf=\"metricSelection.length == 1\">Selected Metric:</h5>\n    <h5 *ngIf=\"metricSelection.length > 1\">Selected Metrics:</h5>\n    <ng-container *ngFor=\"let metric of metricSelection; let selectedIdx = index; trackBy: rowFn\">\n      <h5><svg class=\"legend\"><rect [style.fill]=\"getColor(metric)\"></rect></svg>{{selectedColumns[selectedIdx]}} - {{metric.name}}</h5>\n    </ng-container>\n  </div>\n</div>\n<svg #visParent class=\"heatmap\">\n  <rect></rect>\n</svg>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/metric-overview/metric-overview.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/metric-overview/metric-overview.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngb-accordion>\n<!--   <accordion-group heading=\"Metric Information\"\n    [isOpen]=\"status.isFirstOpen\"\n    [isDisabled]=\"status.isFirstDisabled\"> -->\n  <ngb-panel heading=\"Metric Information\">\n    <ng-template ngbPanelContent>\n      <ul id=\"simpleList\" class=\"list-group fixed-panel\">\n          <li class=\"list-group-item\">\n            <label for=\"metricName\">\n              Name:\n            </label>\n            <span id=\"metricName\"></span>\n          </li>\n          <li class=\"list-group-item\">\n            <label for=\"metricName\">\n              Description: \n            </label>\n            <div id=\"metricDescription\"></div>\n          </li>\n          <li class=\"list-group-item\">\n            <div class=\"form-group\" id=\"metricDatatype\">\n              <label for=\"metricType\" class=\"control-label\">Data Type: </label>\n              <label class=\"radio-inline\">\n                <input type=\"radio\"> String</label>\n              <label class=\"radio-inline\">\n                <input type=\"radio\"> Numeric</label>\n              <label class=\"radio-inline\">\n                <input type=\"radio\"> Date/Time</label>\n              <label class=\"radio-inline\">\n                <input type=\"radio\"> Categoric</label>\n            </div>\n          </li>\n        </ul>\n    </ng-template>\n  </ngb-panel>\n  <!-- </accordion-group> -->\n</ngb-accordion>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/open-refine/open-refine.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/open-refine/open-refine.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <ng-template *ngIf=\"projectId\"> -->\n  <div class=\"row\">\n    <metric-accordion\n      [metricSelection]=\"selectedMetrics\"\n      [columnSelection]=\"selectedColumns\"\n      [projectId]=\"projectId\"\n      [project]=\"openRefineProject\"\n      (onSelectionUpdated)=\"handleSelectionUpdated($event)\"></metric-accordion>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-9\">\n      <app-raw-data-table\n        [projectId]=\"projectId\"\n        [project]=\"openRefineProject\"\n        [columnMetricColors]=\"columnMetricColors\"\n        [spanMetricColors]=\"spanMetricColors\"\n        (onOverviewMetricSelected)=\"handleOverviewSelection($event)\"\n        (sortEmitter)=\"handleSort($event)\"\n        (tableHeightChanged)=\"handleTableHeightUpdated($event)\"\n        (pageChangedEmitter)=\"handleDataRowsPageChanged($event)\">\n      </app-raw-data-table>\n    </div>\n    <div class=\"col-md-3\">\n          <!-- <div id=\"legend\">\n              <h4 id=\"detailColumnHeader\"></h4>\n              <div id=\"detailMetricHeader\"></div>\n              <div id=\"selectedMetricsHeader\"></div>\n              <div hidden id=\"filtering\"><button type=\"button\" class=\"btn btn-xs btn-default\">Only show dirty entries</button></div>\n          </div> -->\n      <metric-detail-view\n        [viewOffsetTop]=\"detailViewOffsetTop\"\n        [rowModel]=\"rowModel\"\n        [metricSelection]=\"selectedMetrics\"\n        [selectedColumns]=\"selectedColumns\"\n        [columnMetricColors]=\"columnMetricColors\"\n        [spanMetricColors]=\"spanMetricColors\"\n        [rowsFrom]=\"rowsFrom\"\n        [rowsTo]=\"rowsTo\"\n        (onDataRowsSelected)=\"handleDataRowsSelected($event)\"></metric-detail-view>\n    </div>\n  </div>\n<!-- </ng-template>\n<ng-template *ngIf=\"!projectId\">\n  <p>Loading Project ...\n  </p>\n</ng-template> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/quality-header-col/quality-header-col.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/quality-header-col/quality-header-col.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg [style.width]=\"svgWidth\"></svg>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/raw-data-table/raw-data-table.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/raw-data-table/raw-data-table.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"project\">\n  <table class='table spanning-metrics-overview'>\n    <thead #spanOverviewHead class='thead-default'>\n      <ng-container *ngIf=\"project.overlayModels.metricsOverlayModel\">\n        <ng-container *ngIf=\"project.overlayModels.metricsOverlayModel.spanningMetrics\">\n          <tr>\n            <th [style.padding.px]=\"0\"\n              [colSpan]=\"project.columnModel.columns.length + 1\">Multiple-Column Metrics</th>\n          </tr>\n          <ng-container *ngFor=\"let metric of project.overlayModels.metricsOverlayModel.spanningMetrics\">\n            <tr>\n              <th [style.padding.px]=\"0\"></th>\n              <th *ngFor=\"let col of metric.spanningColumns\"\n                [style.padding.px]=\"0\">{{col}}</th>\n            </tr>\n            <tr>\n              <th [style.padding.px]=\"0\"\n                [style.paddingBottom.px]=\"6\"\n                [style.paddingLeft.px]=\"8\"\n                [style.paddingRight.px]=\"4\"\n                [style.width.px]=\"colWidths[0]\">{{metric.name}}\n              </th>\n              <th span-metric-col [ngClass]=\"checkValues(metric, cellIndex)\" class=\"metric-overview-col\"\n                [colSpan]=\"metric.spanningColumns.length\"\n                [colWidths]=\"colWidths\"\n                [metric]=\"metric\"\n                [metricsOverlayModel]=\"project.overlayModels.metricsOverlayModel\"\n                [spanMetricColors]=\"spanMetricColors\"\n                [style.padding.px]=\"0\"\n                [style.paddingTop.px]=\"6\"\n                (contextmenu)=\"onContextMenu($event, metric)\"\n                (click)=\"onClickOverview($event, metric)\"></th>\n            </tr>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </thead>\n  </table>\n  <div class=\"raw-data-container\">\n    <svg #tableOverlay scroll-bar-vis class=\"table-overlay\"\n      [class.disabled]=\"disabled\"\n      [style.top.px]=\"overlayOffsetTop\"\n      [style.width.px]=\"overlayWidth\"\n      [metricsOverlayModel]=\"project.overlayModels.metricsOverlayModel\"\n      [colWidths]=\"colWidths\"\n      [bodyHeight]=\"bodyHeight\"\n      [rowsFrom]=\"rowsFrom\"\n      [itemsPerPage]=\"itemsPerPage\"\n      [columnMetricColors]=\"columnMetricColors\"\n      [spanMetricColors]=\"spanMetricColors\"\n      (click)=\"onClickRect($event)\"></svg>\n    <table class='table metrics-overview'>\n      <thead #colOverviewHead class='thead-default'>\n        <ng-container *ngIf=\"project.overlayModels.metricsOverlayModel\">\n          <ng-container *ngIf=\"project.overlayModels.metricsOverlayModel.availableMetrics\">\n            <tr>\n              <th [style.padding.px]=\"0\"\n                [colSpan]=\"project.columnModel.columns.length + 1\">Single-Column Metrics\n                  <div ngbDropdown class=\"d-inline-block\">\n                    <button class=\"btn btn-outline-primary btn-sm\" id=\"dropdownBasic1\" ngbDropdownToggle>Sort Columns</button>\n                    <div ngbDropdownMenu aria-labelledby=\"dropdownBasic1\">\n                      <button class=\"dropdown-item btn-sm\" (click)=\"handleSort($event, 'sortOriginal')\">Original Structure</button>\n                      <button class=\"dropdown-item btn-sm\" (click)=\"handleSort($event, 'sortByDirtiness')\">By Dirtiness</button>\n                    </div>\n                  </div>\n              </th>\n            </tr>\n            <tr>\n              <th [style.padding.px]=\"0\"></th>\n              <th *ngFor=\"let column of project.columnModel.columns\"\n                [style.padding.px]=\"0\"\n                [style.paddingRight.px]=\"6\"\n                [style.width.px]=\"colWidths[i+1]\">{{column.name}}</th>\n            </tr>\n            <tr class='overview-row' *ngFor=\"let metric of project.overlayModels.metricsOverlayModel.availableMetrics; let rowIndex = index; trackBy: rowFn\">\n              <th [style.padding.px]=\"0\"\n                [style.paddingBottom.px]=\"6\"\n                [style.paddingLeft.px]=\"8\"\n                [style.paddingRight.px]=\"4\">{{metric}}\n              </th>\n                <ng-container *ngFor=\"let metricColumn of objectKeys(project.overlayModels.metricsOverlayModel.metrics); let cellIndex = index; trackBy: trackByFn\">\n                  <th class=\"metric-overview-col\"\n                    *ngIf=\"metricColumn\" \n                    metric-col \n                    [ngClass]=\"checkValues(metric, cellIndex)\" \n                    [metricCol]=\"metricColumn\" \n                    [metric]=\"metric\"\n                    [metricsOverlayModel]=\"project.overlayModels.metricsOverlayModel\"\n                    [columnMetricColors]=\"columnMetricColors\"\n                    [svgWidth]=\"colWidths[cellIndex+1]\"\n                    [style.padding.px]=\"0\"\n                    [style.paddingTop.px]=\"6\"\n                    (contextmenu)=\"onContextMenu($event, metricColumn, project.overlayModels.metricsOverlayModel.availableMetrics[rowIndex])\"\n                    (click)=\"onClickOverview($event, metric, cellIndex)\"></th>\n              </ng-container>\n            </tr>\n          </ng-container>\n        </ng-container>\n        <tr #headerCols class='column-names'>\n          <th></th>\n          <th *ngFor=\"let column of project.columnModel.columns; let i = index; trackBy: trackByFn\"\n            [style.padding.px]=\"0\"\n            [style.paddingRight.px]=\"6\">{{column.name}}</th>\n        </tr>\n      </thead>\n      <tbody scroll-raw-data-body\n        #rawDataBody \n        class='metrics-overview'\n        [class.disabled]=\"disabled\"\n        *ngIf=\"rowModel\">\n        <tr #bodyCols *ngFor=\"let row of rowModel.rows; let rowIndex = index; let last = last; trackBy: trackRows\">\n          <th\n            [style.width.px]=\"colWidths[0]\"></th>\n          <td *ngFor=\"let column of project.columnModel.columns; let i = index; trackBy: trackByFn\"\n            [style.padding.px]=\"0\"\n            [style.paddingRight.px]=\"6\"\n            [style.width.px]=\"colWidths[i+1]\">\n            <ng-container *ngIf=\"row.cells[column.cellIndex]\">{{row.cells[column.cellIndex].v}}</ng-container>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <!-- TODO: replace pagination -->\n  <!-- <pagination *ngIf=\"rowModel\" class=\"pagination-sm\"\n    [style.padding.px]=\"6\" \n    [totalItems]=\"rowModel.filtered\" \n    [(ngModel)]=\"page\" \n    [maxSize]=\"maxSize\"\n    [boundaryLinks]=\"true\" \n    [itemsPerPage]=\"itemsPerPage\"\n    [rotate]=\"false\" \n    (numPages)=\"numPages = $event\" \n    (pageChanged)=\"pageChanged($event)\"\n    (click)=\"changePage($event)\"></pagination> -->\n  <ngb-pagination *ngIf=\"rowModel\"\n    [collectionSize]=\"rowModel.filtered\"\n    [(page)]=\"page\"\n    [maxSize]=\"maxSize\"\n    [boundaryLinks]=\"true\"\n    [pageSize]=\"itemsPerPage\"\n    [size]=\"sm\"\n    aria-label=\"Default Pagination\"></ngb-pagination>\n  <context-menu #existingMetric>\n    <ng-template contextMenuItem divider=\"true\"></ng-template>\n    <ng-template contextMenuItem let-item (execute)=\"deleteMetric($event.item)\">\n      Delete {{item?.name}}?\n    </ng-template>\n    <ng-template contextMenuItem passive=\"true\">\n      Input something: <input type=\"text\">\n    </ng-template>\n  </context-menu>\n  <context-menu #newMetric>\n    <ng-template contextMenuItem let-item>\n      Add Metric: {{item}}\n    </ng-template>\n  </context-menu>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test/metric-preview/metric-preview.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/metric-preview/metric-preview.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg [style.width.px]=\"1\"\n  [style.height.px]=\"1\"></svg>\n  <!-- *ngIf=\"metricsOverlayModel\" -->\n"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropdown-submenu {\n  position: relative; }\n\n.dropdown-submenu a::after {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n  position: absolute;\n  right: 6px;\n  top: .8em; }\n\n.dropdown-submenu .dropdown-menu {\n  top: 0;\n  left: 100%;\n  margin-left: .1rem;\n  margin-right: .1rem; }\n\n/* automatically generated */\n\n.loading {\n  padding: 1em; }\n\ndemo {\n  height: 100%;\n  width: 100%; }\n\n.demo-header {\n  align-items: center;\n  /*background: $brand;*/\n  /*box-shadow: 0 0.1em 1.5em rgba($dark-grey, 0.5);*/\n  /*color: $white;*/\n  display: flex;\n  padding: 1em; }\n\n.demo-header__toggle {\n  background: transparent;\n  /*border: 0.15rem solid $white;*/\n  border-left: 0;\n  border-right: 0;\n  cursor: pointer;\n  font-size: 0;\n  height: 1.5rem;\n  margin-right: 1rem;\n  position: relative;\n  width: 2rem; }\n\n.demo-header__toggle::after {\n    /*background: $white;*/\n    content: '';\n    height: 0.15rem;\n    left: 0;\n    margin-top: -0.075rem;\n    position: absolute;\n    top: 50%;\n    width: 100%; }\n\n.demo-sidebar {\n  background-color: #fff;\n  padding: 2em 1em; }\n\n.demo-sidebar.ng-sidebar--opened.ng-sidebar--over {\n    box-shadow: 0 0 2.5em rgba(85, 85, 85, 0.5); }\n\n.demo-contents {\n  padding: 0 2em; }\n\n.demo-control {\n  /*background-color: $light-grey;\n  border: 1px solid $dark-grey;*/\n  cursor: pointer;\n  margin-bottom: 0.5em;\n  padding: 0.5em 2em;\n  transition: background-color 0.15s; }\n\n.demo-control:hover {\n    /*background-color: $dark-grey;*/\n    /*color: $white;*/ }\n\ndiv.d3tooltip {\n  position: absolute;\n  text-align: center;\n  width: 160px;\n  padding: 4px;\n  font: 13px sans-serif;\n  background: lightsteelblue;\n  border: 2px;\n  border-color: gray;\n  border-radius: 8px;\n  pointer-events: none;\n  opacity: 0;\n  overflow: visible; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxpQ0FBeUI7VUFBekIseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsU0FBUyxFQUFBOztBQUdYO0VBQ0UsTUFBTTtFQUNOLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsbUJBQW1CLEVBQUE7O0FBR3JCLDRCQUFBOztBQUVBO0VBQ0UsWUFBWSxFQUFBOztBQUdkO0VBQ0UsWUFBWTtFQUNaLFdBQVcsRUFBQTs7QUFHYjtFQUNFLG1CQUFtQjtFQUNuQixzQkFBQTtFQUNBLG1EQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFhO0VBQ2IsWUFBWSxFQUFBOztBQUdaO0VBQ0UsdUJBQXVCO0VBQ3ZCLGdDQUFBO0VBQ0EsY0FBYztFQUNkLGVBQWU7RUFDZixlQUFlO0VBQ2YsWUFBWTtFQUNaLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLFdBQVcsRUFBQTs7QUFWYjtJQWFJLHNCQUFBO0lBQ0EsV0FBVztJQUNYLGVBQWU7SUFDZixPQUFPO0lBQ1AscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsV0FBVyxFQUFBOztBQUlqQjtFQUNFLHNCQUFzQjtFQUN0QixnQkFBZ0IsRUFBQTs7QUFGbEI7SUFLSSwyQ0FBMkMsRUFBQTs7QUFJL0M7RUFDRSxjQUFjLEVBQUE7O0FBR2hCO0VBQ0U7Z0NDYjhCO0VEZTlCLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGtDQUFrQyxFQUFBOztBQU5wQztJQVNJLGdDQUFBO0lBQ0EsaUJBQUEsRUFBa0I7O0FBSXRCO0VBQ0ksa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osWUFBWTtFQUNaLHFCQUFxQjtFQUNyQiwwQkFBMEI7RUFDMUIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLFVBQVU7RUFDVixpQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kcm9wZG93bi1zdWJtZW51IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZHJvcGRvd24tc3VibWVudSBhOjphZnRlciB7XG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDZweDtcbiAgdG9wOiAuOGVtO1xufVxuXG4uZHJvcGRvd24tc3VibWVudSAuZHJvcGRvd24tbWVudSB7XG4gIHRvcDogMDtcbiAgbGVmdDogMTAwJTtcbiAgbWFyZ2luLWxlZnQ6IC4xcmVtO1xuICBtYXJnaW4tcmlnaHQ6IC4xcmVtO1xufVxuXG4vKiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCAqL1xuXG4ubG9hZGluZyB7XG4gIHBhZGRpbmc6IDFlbTtcbn1cblxuZGVtbyB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5kZW1vLWhlYWRlciB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC8qYmFja2dyb3VuZDogJGJyYW5kOyovXG4gIC8qYm94LXNoYWRvdzogMCAwLjFlbSAxLjVlbSByZ2JhKCRkYXJrLWdyZXksIDAuNSk7Ki9cbiAgLypjb2xvcjogJHdoaXRlOyovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDFlbTtcbn1cblxuICAuZGVtby1oZWFkZXJfX3RvZ2dsZSB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgLypib3JkZXI6IDAuMTVyZW0gc29saWQgJHdoaXRlOyovXG4gICAgYm9yZGVyLWxlZnQ6IDA7XG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDA7XG4gICAgaGVpZ2h0OiAxLjVyZW07XG4gICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMnJlbTtcblxuICAgICY6OmFmdGVyIHtcbiAgICAgIC8qYmFja2dyb3VuZDogJHdoaXRlOyovXG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGhlaWdodDogMC4xNXJlbTtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBtYXJnaW4tdG9wOiAtMC4wNzVyZW07XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgfVxuXG4uZGVtby1zaWRlYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgcGFkZGluZzogMmVtIDFlbTtcblxuICAmLm5nLXNpZGViYXItLW9wZW5lZC5uZy1zaWRlYmFyLS1vdmVyIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMi41ZW0gcmdiYSg4NSwgODUsIDg1LCAwLjUpO1xuICB9XG59XG5cbi5kZW1vLWNvbnRlbnRzIHtcbiAgcGFkZGluZzogMCAyZW07XG59XG5cbi5kZW1vLWNvbnRyb2wge1xuICAvKmJhY2tncm91bmQtY29sb3I6ICRsaWdodC1ncmV5O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZGFyay1ncmV5OyovXG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMC41ZW07XG4gIHBhZGRpbmc6IDAuNWVtIDJlbTtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjE1cztcblxuICAmOmhvdmVyIHtcbiAgICAvKmJhY2tncm91bmQtY29sb3I6ICRkYXJrLWdyZXk7Ki9cbiAgICAvKmNvbG9yOiAkd2hpdGU7Ki9cbiAgfVxufVxuXG5kaXYuZDN0b29sdGlwIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBwYWRkaW5nOiA0cHg7XG4gICAgZm9udDogMTNweCBzYW5zLXNlcmlmO1xuICAgIGJhY2tncm91bmQ6IGxpZ2h0c3RlZWxibHVlO1xuICAgIGJvcmRlcjogMnB4O1xuICAgIGJvcmRlci1jb2xvcjogZ3JheTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgb3BhY2l0eTogMDtcbiAgICBvdmVyZmxvdzp2aXNpYmxlO1xufSIsIi5kcm9wZG93bi1zdWJtZW51IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5kcm9wZG93bi1zdWJtZW51IGE6OmFmdGVyIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNnB4O1xuICB0b3A6IC44ZW07IH1cblxuLmRyb3Bkb3duLXN1Ym1lbnUgLmRyb3Bkb3duLW1lbnUge1xuICB0b3A6IDA7XG4gIGxlZnQ6IDEwMCU7XG4gIG1hcmdpbi1sZWZ0OiAuMXJlbTtcbiAgbWFyZ2luLXJpZ2h0OiAuMXJlbTsgfVxuXG4vKiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCAqL1xuLmxvYWRpbmcge1xuICBwYWRkaW5nOiAxZW07IH1cblxuZGVtbyB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7IH1cblxuLmRlbW8taGVhZGVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgLypiYWNrZ3JvdW5kOiAkYnJhbmQ7Ki9cbiAgLypib3gtc2hhZG93OiAwIDAuMWVtIDEuNWVtIHJnYmEoJGRhcmstZ3JleSwgMC41KTsqL1xuICAvKmNvbG9yOiAkd2hpdGU7Ki9cbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMWVtOyB9XG5cbi5kZW1vLWhlYWRlcl9fdG9nZ2xlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC8qYm9yZGVyOiAwLjE1cmVtIHNvbGlkICR3aGl0ZTsqL1xuICBib3JkZXItbGVmdDogMDtcbiAgYm9yZGVyLXJpZ2h0OiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMDtcbiAgaGVpZ2h0OiAxLjVyZW07XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMnJlbTsgfVxuICAuZGVtby1oZWFkZXJfX3RvZ2dsZTo6YWZ0ZXIge1xuICAgIC8qYmFja2dyb3VuZDogJHdoaXRlOyovXG4gICAgY29udGVudDogJyc7XG4gICAgaGVpZ2h0OiAwLjE1cmVtO1xuICAgIGxlZnQ6IDA7XG4gICAgbWFyZ2luLXRvcDogLTAuMDc1cmVtO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICB3aWR0aDogMTAwJTsgfVxuXG4uZGVtby1zaWRlYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgcGFkZGluZzogMmVtIDFlbTsgfVxuICAuZGVtby1zaWRlYmFyLm5nLXNpZGViYXItLW9wZW5lZC5uZy1zaWRlYmFyLS1vdmVyIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMi41ZW0gcmdiYSg4NSwgODUsIDg1LCAwLjUpOyB9XG5cbi5kZW1vLWNvbnRlbnRzIHtcbiAgcGFkZGluZzogMCAyZW07IH1cblxuLmRlbW8tY29udHJvbCB7XG4gIC8qYmFja2dyb3VuZC1jb2xvcjogJGxpZ2h0LWdyZXk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRkYXJrLWdyZXk7Ki9cbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgcGFkZGluZzogMC41ZW0gMmVtO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzOyB9XG4gIC5kZW1vLWNvbnRyb2w6aG92ZXIge1xuICAgIC8qYmFja2dyb3VuZC1jb2xvcjogJGRhcmstZ3JleTsqL1xuICAgIC8qY29sb3I6ICR3aGl0ZTsqLyB9XG5cbmRpdi5kM3Rvb2x0aXAge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDE2MHB4O1xuICBwYWRkaW5nOiA0cHg7XG4gIGZvbnQ6IDEzcHggc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZDogbGlnaHRzdGVlbGJsdWU7XG4gIGJvcmRlcjogMnB4O1xuICBib3JkZXItY29sb3I6IGdyYXk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIG9wYWNpdHk6IDA7XG4gIG92ZXJmbG93OiB2aXNpYmxlOyB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _global_nav_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global-nav.service */ "./src/app/global-nav.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(router, globalNavService) {
        var _this = this;
        this.router = router;
        this.globalNavService = globalNavService;
        this.sidebarShown = true;
        router.events.subscribe(function (change) {
            if (change instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                _this.navbarPos = change.urlAfterRedirects;
                if (change.urlAfterRedirects.includes('metric-project')) {
                    _this.sidebarShown = false;
                    _this.projectId = change.url.substr(16);
                }
                else {
                    _this.sidebarShown = true;
                }
            }
        });
    }
    AppComponent.prototype.onRecalculate = function () {
        this.globalNavService.onRecalculate();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            providers: [_global_nav_service__WEBPACK_IMPORTED_MODULE_2__["GlobalNavService"]],
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _global_nav_service__WEBPACK_IMPORTED_MODULE_2__["GlobalNavService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared_barchart_barchart_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/barchart/barchart.component */ "./src/app/shared/barchart/barchart.component.ts");
/* harmony import */ var _shared_open_refine_open_refine_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/open-refine/open-refine.component */ "./src/app/shared/open-refine/open-refine.component.ts");
/* harmony import */ var _shared_raw_data_table_raw_data_table_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/raw-data-table/raw-data-table.component */ "./src/app/shared/raw-data-table/raw-data-table.component.ts");
/* harmony import */ var _shared_metric_overview_metric_overview_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/metric-overview/metric-overview.component */ "./src/app/shared/metric-overview/metric-overview.component.ts");
/* harmony import */ var _shared_metric_checks_overview_metric_checks_overview_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/metric-checks-overview/metric-checks-overview.component */ "./src/app/shared/metric-checks-overview/metric-checks-overview.component.ts");
/* harmony import */ var _shared_quality_header_col_quality_header_col_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared/quality-header-col/quality-header-col.component */ "./src/app/shared/quality-header-col/quality-header-col.component.ts");
/* harmony import */ var _shared_span_quality_header_col_span_quality_header_col_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/span-quality-header-col/span-quality-header-col.component */ "./src/app/shared/span-quality-header-col/span-quality-header-col.component.ts");
/* harmony import */ var _shared_raw_data_scroll_bar_visualization_raw_data_scroll_bar_visualization_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component */ "./src/app/shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component.ts");
/* harmony import */ var _shared_metric_detail_visualization_metric_detail_visualization_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/metric-detail-visualization/metric-detail-visualization.component */ "./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.ts");
/* harmony import */ var _shared_metric_checks_overview_check_input_directive_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/metric-checks-overview/check-input-directive.directive */ "./src/app/shared/metric-checks-overview/check-input-directive.directive.ts");
/* harmony import */ var _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./project-list/project-list.component */ "./src/app/project-list/project-list.component.ts");
/* harmony import */ var _create_project_create_project_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./create-project/create-project.component */ "./src/app/create-project/create-project.component.ts");
/* harmony import */ var _project_list_project_list_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./project-list/project-list.pipe */ "./src/app/project-list/project-list.pipe.ts");
/* harmony import */ var ngx_contextmenu__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-contextmenu */ "./node_modules/ngx-contextmenu/fesm5/ngx-contextmenu.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ng_sidebar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-sidebar */ "./node_modules/ng-sidebar/lib/index.js");
/* harmony import */ var ng_sidebar__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(ng_sidebar__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _metric_browser_metric_browser_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./metric-browser/metric-browser.component */ "./src/app/metric-browser/metric-browser.component.ts");
/* harmony import */ var _test_metric_preview_metric_preview_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./test/metric-preview/metric-preview.component */ "./src/app/test/metric-preview/metric-preview.component.ts");
/* harmony import */ var _open_data_prov_provenance_vis_open_data_provenance_vis_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./open-data-prov/provenance-vis/open-data-provenance-vis.component */ "./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.ts");
/* harmony import */ var _refine_provenance_refine_provenance_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./refine-provenance/refine-provenance.component */ "./src/app/refine-provenance/refine-provenance.component.ts");
/* harmony import */ var _refine_provenance_provenance_project_list_pipe__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./refine-provenance/provenance-project-list.pipe */ "./src/app/refine-provenance/provenance-project-list.pipe.ts");
/* harmony import */ var _refine_provenance_explorer_refine_provenance_explorer_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./refine-provenance-explorer/refine-provenance-explorer.component */ "./src/app/refine-provenance-explorer/refine-provenance-explorer.component.ts");
/* harmony import */ var _refine_provenance_explorer_quality_provenance_vis_quality_provenance_vis_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component */ "./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var appRoutes = [
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
        component: _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_17__["ProjectListComponent"],
        // Use it to store items such as page titles, breadcrumb text, and other read-only, static data. You'll use the resolve guard to retrieve dynamic data later in the guide.
        data: { title: 'MetricDoc Projects' }
    },
    {
        path: 'create-project',
        component: _create_project_create_project_component__WEBPACK_IMPORTED_MODULE_18__["CreateProjectComponent"],
        data: { title: 'Create New MetricDoc Project' }
    },
    {
        path: 'create-project/:projectId',
        component: _create_project_create_project_component__WEBPACK_IMPORTED_MODULE_18__["CreateProjectComponent"],
        data: { title: 'Create New MetricDoc Project' }
    },
    {
        path: 'metric-browser',
        component: _metric_browser_metric_browser_component__WEBPACK_IMPORTED_MODULE_23__["MetricBrowserComponent"],
        data: { title: 'Browse Available Metrics' }
    },
    {
        path: 'metric-project/:projectId',
        component: _shared_open_refine_open_refine_component__WEBPACK_IMPORTED_MODULE_8__["OpenRefineComponent"]
    },
    // Open Data Provenance - Adequate - Provenance Vis
    {
        path: 'open-data-provenance/:projectName',
        component: _open_data_prov_provenance_vis_open_data_provenance_vis_component__WEBPACK_IMPORTED_MODULE_25__["OpenDataProvenanceVisComponent"],
        data: {
            title: 'Open Data Provenance Visualization'
        }
    },
    {
        path: 'open-data-provenance',
        component: _open_data_prov_provenance_vis_open_data_provenance_vis_component__WEBPACK_IMPORTED_MODULE_25__["OpenDataProvenanceVisComponent"],
        data: {
            title: 'Open Data Provenance Visualization'
        }
    },
    {
        path: 'provenance-explorer',
        component: _refine_provenance_refine_provenance_component__WEBPACK_IMPORTED_MODULE_26__["RefineProvenanceComponent"],
        data: {
            title: 'OpenRefine Quality Provenance List'
        }
    },
    {
        path: 'provenance-explorer/:projectId',
        component: _refine_provenance_explorer_refine_provenance_explorer_component__WEBPACK_IMPORTED_MODULE_28__["RefineProvenanceExplorerComponent"],
        data: {
            title: 'OpenRefine Provenance Explorer'
        }
    },
    { path: '**', component: _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_17__["ProjectListComponent"] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _shared_barchart_barchart_component__WEBPACK_IMPORTED_MODULE_7__["BarchartComponent"],
                _shared_open_refine_open_refine_component__WEBPACK_IMPORTED_MODULE_8__["OpenRefineComponent"],
                _shared_raw_data_table_raw_data_table_component__WEBPACK_IMPORTED_MODULE_9__["RawDataTableComponent"],
                _shared_metric_overview_metric_overview_component__WEBPACK_IMPORTED_MODULE_10__["MetricOverviewComponent"],
                _shared_metric_checks_overview_metric_checks_overview_component__WEBPACK_IMPORTED_MODULE_11__["MetricChecksOverviewComponent"],
                _shared_quality_header_col_quality_header_col_component__WEBPACK_IMPORTED_MODULE_12__["QualityHeaderColComponent"],
                _shared_span_quality_header_col_span_quality_header_col_component__WEBPACK_IMPORTED_MODULE_13__["SpanQualityHeaderColComponent"],
                _shared_raw_data_scroll_bar_visualization_raw_data_scroll_bar_visualization_component__WEBPACK_IMPORTED_MODULE_14__["RawDataScrollBarVisualizationComponent"],
                _shared_metric_detail_visualization_metric_detail_visualization_component__WEBPACK_IMPORTED_MODULE_15__["MetricDetailVisualizationComponent"],
                _shared_metric_checks_overview_check_input_directive_directive__WEBPACK_IMPORTED_MODULE_16__["CheckInputDirectiveDirective"],
                _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_17__["ProjectListComponent"],
                _create_project_create_project_component__WEBPACK_IMPORTED_MODULE_18__["CreateProjectComponent"],
                _project_list_project_list_pipe__WEBPACK_IMPORTED_MODULE_19__["ProjectListPipe"],
                _project_list_project_list_pipe__WEBPACK_IMPORTED_MODULE_19__["NonMetricsProjectListPipe"],
                _metric_browser_metric_browser_component__WEBPACK_IMPORTED_MODULE_23__["MetricBrowserComponent"],
                _test_metric_preview_metric_preview_component__WEBPACK_IMPORTED_MODULE_24__["MetricPreviewComponent"],
                _open_data_prov_provenance_vis_open_data_provenance_vis_component__WEBPACK_IMPORTED_MODULE_25__["OpenDataProvenanceVisComponent"],
                _refine_provenance_refine_provenance_component__WEBPACK_IMPORTED_MODULE_26__["RefineProvenanceComponent"],
                _refine_provenance_provenance_project_list_pipe__WEBPACK_IMPORTED_MODULE_27__["ProvenanceProjectListPipe"],
                _refine_provenance_provenance_project_list_pipe__WEBPACK_IMPORTED_MODULE_27__["NonProvenanceProjectListPipe"],
                _refine_provenance_explorer_refine_provenance_explorer_component__WEBPACK_IMPORTED_MODULE_28__["RefineProvenanceExplorerComponent"],
                _refine_provenance_explorer_quality_provenance_vis_quality_provenance_vis_component__WEBPACK_IMPORTED_MODULE_29__["QualityProvenanceVisComponent"]
            ],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(appRoutes, { enableTracing: true }),
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__["NgbModule"].forRoot(),
                ng_sidebar__WEBPACK_IMPORTED_MODULE_22__["SidebarModule"].forRoot(),
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["JsonpModule"],
                ngx_contextmenu__WEBPACK_IMPORTED_MODULE_20__["ContextMenuModule"].forRoot({
                    useBootstrap4: true,
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/create-project/create-project.component.sass":
/*!**************************************************************!*\
  !*** ./src/app/create-project/create-project.component.sass ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NyZWF0ZS1wcm9qZWN0L2NyZWF0ZS1wcm9qZWN0LmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/create-project/create-project.component.ts":
/*!************************************************************!*\
  !*** ./src/app/create-project/create-project.component.ts ***!
  \************************************************************/
/*! exports provided: CreateProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProjectComponent", function() { return CreateProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreateProjectComponent = /** @class */ (function () {
    function CreateProjectComponent(route, router, openRefineService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.openRefineService = openRefineService;
        this.objectKeys = Object.keys;
        this.importSuccess = false;
        this.openRefineService.getAllProjectMetadata().subscribe(function (refineProjects) {
            _this.refineProjects = refineProjects.projects;
            // console.log(this.refineProjects.projects);
        }, function (error) { return _this.errorMessage = error; });
    }
    CreateProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectId = this.route.snapshot.paramMap.get('projectId');
        this.refineUrl = "http://127.0.0.1:3333/project?project=" + this.projectId;
        if (this.projectId) {
            this.openRefineService.getProjectMetadata(this.projectId)
                .subscribe(function (projectMetadata) { return _this.projectMetadata = projectMetadata; }, function (error) { return _this.errorMessage = error; });
            this.openRefineService.getRefineProject(this.projectId)
                .subscribe(function (project) { return _this.refineProject = project; }, function (error) { return _this.errorMessage = error; });
            this.openRefineService.getRows(this.projectId, 0, 1)
                .subscribe(function (rowModel) { return _this.rowModel = rowModel; });
            this.openRefineService.recommendMetrics(this.projectId)
                .subscribe(function (metricFunctions) {
                _this.metricFunctions = metricFunctions['recommendedMetrics'];
                _this.metricsDisabled = {};
                for (var _i = 0, _a = Object.keys(_this.metricFunctions); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.metricsDisabled[col] = [];
                    for (var mIdx = 0; mIdx < _this.metricFunctions[col].length; ++mIdx)
                        _this.metricsDisabled[col][mIdx] = false;
                }
            });
        }
        else {
        }
    };
    CreateProjectComponent.prototype.toggleMetric = function (event, column, metricIndex) {
        this.metricsDisabled[column][metricIndex] = !this.metricsDisabled[column][metricIndex];
    };
    CreateProjectComponent.prototype.onTextKey = function (event, column, metricIndex) {
        this.metricFunctions[column].metrics[metricIndex].parameters = event.target.value;
    };
    CreateProjectComponent.prototype.addMetricsOverlay = function () {
        var _this = this;
        for (var i = 0; i < this.metricFunctions.length; ++i) {
            for (var j = 0; j < this.metricFunctions[i].metrics.length; ++j) {
                if (this.metricsDisabled[i][j]) {
                    this.metricFunctions.recommendedMetrics[i][j] = null;
                }
            }
        }
        this.openRefineService.setupProject(this.projectId, this.metricFunctions)
            .subscribe(function (project) {
            _this.refineProject;
            _this.openRefineService.evaluateMetrics(_this.projectId);
            _this.router.navigate(['/metric-project', _this.projectId]);
        }, function (error) {
            _this.errorMessage = error;
            console.log('could not convert to metrics project');
        });
    };
    CreateProjectComponent.prototype.goToRefineProject = function () {
        window.location.href = this.refineUrl;
    };
    CreateProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-project',
            template: __webpack_require__(/*! raw-loader!./create-project.component.html */ "./node_modules/raw-loader/index.js!./src/app/create-project/create-project.component.html"),
            providers: [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_2__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./create-project.component.sass */ "./src/app/create-project/create-project.component.sass")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_2__["OpenRefineService"]])
    ], CreateProjectComponent);
    return CreateProjectComponent;
}());



/***/ }),

/***/ "./src/app/global-nav.service.ts":
/*!***************************************!*\
  !*** ./src/app/global-nav.service.ts ***!
  \***************************************/
/*! exports provided: GlobalNavService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalNavService", function() { return GlobalNavService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GlobalNavService = /** @class */ (function () {
    function GlobalNavService() {
        this.recalc = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.recalc$ = this.recalc.asObservable();
    }
    GlobalNavService.prototype.onRecalculate = function () {
        this.recalc.next('test');
    };
    GlobalNavService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], GlobalNavService);
    return GlobalNavService;
}());



/***/ }),

/***/ "./src/app/metric-browser/metric-browser.component.sass":
/*!**************************************************************!*\
  !*** ./src/app/metric-browser/metric-browser.component.sass ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21ldHJpYy1icm93c2VyL21ldHJpYy1icm93c2VyLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/metric-browser/metric-browser.component.ts":
/*!************************************************************!*\
  !*** ./src/app/metric-browser/metric-browser.component.ts ***!
  \************************************************************/
/*! exports provided: MetricBrowserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricBrowserComponent", function() { return MetricBrowserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MetricBrowserComponent = /** @class */ (function () {
    function MetricBrowserComponent(openRefineService) {
        var _this = this;
        this.openRefineService = openRefineService;
        this.openRefineService.getMetricDocFunctionsOverview().subscribe(function (availableMetrics) {
            _this.availableMetrics = availableMetrics;
        });
    }
    MetricBrowserComponent.prototype.ngOnInit = function () {
    };
    MetricBrowserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-metric-browser',
            template: __webpack_require__(/*! raw-loader!./metric-browser.component.html */ "./node_modules/raw-loader/index.js!./src/app/metric-browser/metric-browser.component.html"),
            providers: [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./metric-browser.component.sass */ "./src/app/metric-browser/metric-browser.component.sass")]
        }),
        __metadata("design:paramtypes", [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]])
    ], MetricBrowserComponent);
    return MetricBrowserComponent;
}());



/***/ }),

/***/ "./src/app/open-data-prov/gitlab.service.ts":
/*!**************************************************!*\
  !*** ./src/app/open-data-prov/gitlab.service.ts ***!
  \**************************************************/
/*! exports provided: GitlabService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitlabService", function() { return GitlabService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GitlabService = /** @class */ (function () {
    function GitlabService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.gitlabUrl = 'http://adequate-project.semantic-web.at:5003/api/v4/projects';
        this.httpOptions = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
                'PRIVATE-TOKEN': 'xbyMmAp4NoMXJS_pPjoP'
            })
        });
    }
    GitlabService.prototype.getProjects = function () {
        return this.http.get(this.gitlabUrl + "?search=mumok", {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    GitlabService.prototype.getCommits = function (projectId) {
        // let params = this.initializeParams(projectId);
        return this.http.get(this.gitlabUrl + '/' + projectId + '/repository/commits?per_page=100', this.httpOptions) //?since=2017-01-01T00:00:00Z
            .map(this.extractData)
            .catch(this.handleError);
    };
    GitlabService.prototype.getCommit = function (projectId, commitId) {
        var id = commitId;
        if (commitId.id)
            id = commitId.id;
        return this.http.get(this.gitlabUrl + '/' + projectId + '/repository/commits/' + id, this.httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //todo extend to fetch file information (csv, etc., meta-information)
    GitlabService.prototype.getRawFileUrl = function (projectId, filename, commit) {
        var searchParams = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
        searchParams.set("ref", commit);
        // replace folder structure elements
        filename = filename.replace("/", "%2F");
        return this.gitlabUrl + '/' + projectId + "/repository/files/" + filename + "/raw?ref=" + commit;
        // return this.http.get(this.gitlabUrl + '/' + projectId + "/repository/files/" + filename + "/raw", { search: searchParams })
        //   .map(response => response.text())
        //   // .map(this.extractData)
        //   .catch(this.handleError);
    };
    GitlabService.prototype.extractData = function (res) {
        // response => <string[]> response.json()[1];
        var body = res.json();
        if (body.availableMetrics
            && body.availableSpanningMetrics
            && body.computeDuplicates
            && body.metricColumnNames
            && body.spanningMetrics) {
            // this.response = body;
        }
        return body || {};
    };
    GitlabService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof _angular_http__WEBPACK_IMPORTED_MODULE_1__["Response"]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errormsg = JSON.parse(body.message);
            errMsg = "" + (errormsg.message || '');
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return rxjs_Rx__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(errMsg);
    };
    GitlabService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_http__WEBPACK_IMPORTED_MODULE_1__["Jsonp"]])
    ], GitlabService);
    return GitlabService;
}());



/***/ }),

/***/ "./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29wZW4tZGF0YS1wcm92L3Byb3ZlbmFuY2UtdmlzL29wZW4tZGF0YS1wcm92ZW5hbmNlLXZpcy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.ts ***!
  \*************************************************************************************/
/*! exports provided: OpenDataProvenanceVisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenDataProvenanceVisComponent", function() { return OpenDataProvenanceVisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var _gitlab_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gitlab.service */ "./src/app/open-data-prov/gitlab.service.ts");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OpenDataProvenanceVisComponent = /** @class */ (function () {
    function OpenDataProvenanceVisComponent(http, route, gitlabService, openRefineService) {
        this.http = http;
        this.route = route;
        this.gitlabService = gitlabService;
        this.openRefineService = openRefineService;
        this.projectsFromCommits = [];
        this.xDistByTime = false;
        this.r = 8;
        this.m = [20, 80, 15, 120]; //top right bottom left
        this.d3Transform = __webpack_require__(/*! d3-transform */ "./node_modules/d3-transform/build/d3-transform.mjs");
        this.d3ScaleChromatic = __webpack_require__(/*! d3-scale-chromatic */ "./node_modules/d3-scale-chromatic/src/index.js");
    }
    OpenDataProvenanceVisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectId = this.route.snapshot.paramMap.get('projectName');
        //initialize projects and commits
        this.gitlabService.getProjects().subscribe(function (projects) {
            _this.gitlabProjects = projects;
            if (_this.projectId) {
                _this.getCommitHistory();
            }
        }, function (error) {
            console.log(error);
        });
        this.w = 1500 - this.m[1] - this.m[3],
            this.h = 350 - this.m[0] - this.m[2];
    };
    OpenDataProvenanceVisComponent.prototype.getCommitHistory = function () {
        var _this = this;
        this.currentProject = this.gitlabProjects.find(function (d) { return d.id == _this.projectId; });
        this.gitlabService.getCommits(this.projectId).subscribe(function (data) {
            _this.commits = data;
            var obs = [];
            for (var _i = 0, _a = _this.commits; _i < _a.length; _i++) {
                var commit = _a[_i];
                obs.push(_this.gitlabService.getCommit(_this.projectId, commit));
                // .subscribe(commitInfoSource => {
                //   commit.stats = commitInfoSource.stats;
                // });
            }
            rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(obs).subscribe(function (commitArray) {
                var _loop_1 = function (commitInfo) {
                    var commitCurrent = _this.commits.find(function (c) { return commitInfo.id == c.id; });
                    commitCurrent.stats = commitInfo.stats;
                };
                for (var _i = 0, commitArray_1 = commitArray; _i < commitArray_1.length; _i++) {
                    var commitInfo = commitArray_1[_i];
                    _loop_1(commitInfo);
                }
                _this.createTimelineVis();
                _this.createOrFetchQualityProjects();
            });
        });
    };
    OpenDataProvenanceVisComponent.prototype.createOrFetchQualityProjects = function () {
        var _this = this;
        if (this.currentProject) {
            var projectObs_1 = [];
            var metricProjects_1 = [];
            var metricProjectsMetadata = [];
            this.openRefineService.getAllProjectMetadata().subscribe(function (projectsOverviewMetadata) {
                // let filterForProject = [];
                for (var projectMetaId in projectsOverviewMetadata.projects) {
                    var currentProjMeta = projectsOverviewMetadata.projects[projectMetaId];
                    if (currentProjMeta.tags.indexOf(_this.projectId) > -1)
                        _this.projectsFromCommits.push({ id: projectMetaId, meta: currentProjMeta });
                }
                var projectsMetadata = [];
                var projectFromCommit;
                var _loop_2 = function (commit) {
                    var currentProjectId = void 0;
                    projectFromCommit = _this.projectsFromCommits.find(function (proj) { return proj.meta.tags.indexOf(commit.short_id) > -1; });
                    if (projectFromCommit) {
                        // we found an already existing dataset
                        metricProjects_1.push(_this.openRefineService.getRefineProject(projectFromCommit.id));
                        projectFromCommit.commit = commit;
                    }
                    else {
                        //TODO: take care of metadata, automatically create metrics project for all resource files
                        //     this.gitlabService.getRawFileUrl(this.projectId, "metadata.json", ).subscribe((data: any) => {
                        // let filenames = [];
                        // for(let file of data.resources) {
                        //   let filename:string = file.name;
                        // Ä, ä     \u00c4, \u00e4
                        // Ö, ö     \u00d6, \u00f6
                        // Ü, ü     \u00dc, \u00fc
                        // ß        \u00df
                        //   filenames.push(filename.replace(" ", "_").replace("\u00fc", ""))
                        // }
                        var dataUrl = _this.gitlabService.getRawFileUrl(_this.projectId, "resources%2FKnstler_der_Sammlung_mumok", commit.short_id);
                        projectObs_1.push(_this.openRefineService.createOpenRefineMetricsProject(_this.currentProject.name, _this.projectId, commit.short_id, "text/line-based/*sv", ",", dataUrl));
                    }
                };
                for (var _i = 0, _a = _this.commits; _i < _a.length; _i++) {
                    var commit = _a[_i];
                    _loop_2(commit);
                }
                if (metricProjects_1.length == _this.commits.length) {
                    rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(metricProjects_1).subscribe(function (projects) {
                        var metricProjects = [];
                        _this.qualityProjects = projects;
                        var _loop_3 = function (i) {
                            var projOfCommit = _this.projectsFromCommits.find(function (data) { return data.meta.tags.indexOf(_this.commits[i].short_id) > -1; });
                            projOfCommit.models = projects[i];
                            metricProjects.push(_this.openRefineService.evaluateMetrics(projOfCommit.id));
                        };
                        for (var i = 0; i < _this.commits.length; ++i) {
                            _loop_3(i);
                        }
                        rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(metricProjects).subscribe(function (qualityProjects) {
                            console.log("success");
                            _this.createQualityStream();
                        });
                        //TODO: on demand evaluate metrics
                        // for(let proj of this.projectsFromCommits) {
                        //   metricProjects.push(this.openRefineService.evaluateMetrics(proj.id));
                        // }
                        // Observable.forkJoin(metricProjects).subscribe((projects: any[]) => {
                        //   for(let i = 0; i < this.commits.length; ++i) {
                        //     let projOfCommit = this.projectsFromCommits.find(data => { return data.meta.tags.indexOf(this.commits[i].short_id) > -1 });
                        //     projOfCommit.models.overlayModels.metricsOverlayModel = projects[i];
                        //   }
                        //   console.log(projects);
                        //   //TODO sort by commit
                        //   this.createQualityStream();
                        // })
                    });
                }
                else {
                    rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(projectObs_1).subscribe(function (projectsIds) {
                        var metricRecommendations = [];
                        for (var _i = 0, projectsIds_1 = projectsIds; _i < projectsIds_1.length; _i++) {
                            var projectId = projectsIds_1[_i];
                            metricRecommendations.push(_this.openRefineService.recommendMetrics(projectId));
                        }
                        rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(metricRecommendations).subscribe(function (recommendations) {
                            var qualityProjects = [];
                            for (var i = 0; i < projectsIds.length; ++i) {
                                qualityProjects.push(_this.openRefineService.setupProject(projectsIds[i], recommendations[i].columns));
                            }
                            rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(qualityProjects).subscribe(function (qualityProjectsResponse) {
                                var metricProjects = [];
                                for (var i = 0; i < qualityProjectsResponse.length; ++i) {
                                    metricProjects.push(_this.openRefineService.getOverlayModel(projectFromCommit));
                                }
                                var _loop_4 = function (commit) {
                                    var projectFromCommit_1 = _this.projectsFromCommits.find(function (data) { return data.tags.indexOf(commit.short_id) > -1; }); //filterForProject.find(proj => { return proj.meta.tags.indexOf(commit.short_id) > -1});
                                    for (var _i = 0, qualityProjectsResponse_1 = qualityProjectsResponse; _i < qualityProjectsResponse_1.length; _i++) {
                                        var response = qualityProjectsResponse_1[_i];
                                        metricProjects.push(_this.openRefineService.evaluateMetrics(response.historyEntry.id));
                                    }
                                    rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(metricProjects).subscribe(function (qualityProjects) {
                                        for (var _i = 0, qualityProjectsResponse_2 = qualityProjectsResponse; _i < qualityProjectsResponse_2.length; _i++) {
                                            var response = qualityProjectsResponse_2[_i];
                                            metricProjects.push(_this.openRefineService.getRefineProject(response.historyEntry.id));
                                        }
                                        rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Observable"].forkJoin(metricProjects).subscribe(function (qualityProjects) {
                                            _this.projectsFromCommits = [];
                                            // for (let commit of this.commits) {
                                            //   let qualityProject
                                            //   this.projectsFromCommits.push()
                                            // }
                                            _this.createQualityStream();
                                        });
                                    });
                                };
                                for (var _i = 0, _a = _this.commits; _i < _a.length; _i++) {
                                    var commit = _a[_i];
                                    _loop_4(commit);
                                }
                            });
                        });
                    });
                }
            });
        }
    };
    OpenDataProvenanceVisComponent.prototype.createQualityStream = function () {
        var svg = d3__WEBPACK_IMPORTED_MODULE_6__["select"]("svg.quality-stream");
        // prepare key pairs, we need to sort by metric instead of column
        var keys = [];
        this.projectsFromCommits.forEach(function (d, i, data) {
            for (var _i = 0, _a = d.models.overlayModels.metricsOverlayModel.metricColumnNames; _i < _a.length; _i++) {
                var col = _a[_i];
                if (col != null && !col.columnName.includes("404 File Not Found")) {
                    var _loop_5 = function (metric) {
                        var keyPair = { col: col.columnName, metric: metric };
                        if (!keys.some(function (k) { return k.col === keyPair.col && k.metric === keyPair.metric; }))
                            keys.push(keyPair);
                    };
                    for (var _b = 0, _c = d.models.overlayModels.metricsOverlayModel.availableMetrics; _b < _c.length; _b++) {
                        var metric = _c[_b];
                        _loop_5(metric);
                    }
                }
            }
            for (var _d = 0, _e = d.models.overlayModels.metricsOverlayModel.metricColumnNames; _d < _e.length; _d++) {
                var col = _e[_d];
                // check if dataset might be missing
                if (col != null && !col.columnName.includes("404 File Not Found")) {
                    var _loop_6 = function (spanMetric) {
                        var keyPair = { col: col.columnName, metric: spanMetric };
                        if (!keys.some(function (k) { return k.col === keyPair.col && k.metric === keyPair.metric; }))
                            keys.push(keyPair);
                    };
                    for (var _f = 0, _g = d.models.overlayModels.metricsOverlayModel.availableSpanningMetrics; _f < _g.length; _f++) {
                        var spanMetric = _g[_f];
                        _loop_6(spanMetric);
                    }
                }
            }
        });
        keys.sort(function (a, b) {
            if (a.metric < b.metric)
                return -1;
            else if (a.metric > b.metric)
                return 1;
            else
                return 0;
        });
        var stack = d3__WEBPACK_IMPORTED_MODULE_6__["stack"]()
            .keys(keys)
            .value(function (d, keyPair, j, data) {
            var metricCols = d.models.overlayModels.metricsOverlayModel.metricColumnNames;
            var mCol = d.models.overlayModels.metricsOverlayModel.metricColumnNames.filter(function (d, i) {
                return d.columnName === keyPair.col;
            })[0];
            if (mCol && mCol.metrics != null && mCol.metrics[keyPair.metric] != null)
                return mCol.metrics[keyPair.metric].measure;
            else if (mCol && mCol.spanningMetrics != null && mCol.spanningMetrics[keyPair.metric] != null)
                return mCol.spanningMetrics[keyPair.metric].measure;
            else
                return 0;
        })(this.projectsFromCommits);
        // max scaling is max number of available metrics
        var y = d3__WEBPACK_IMPORTED_MODULE_6__["scaleLinear"]().rangeRound([this.h, 0]).domain([0, 2.5]).nice();
        // scaling
        var projIds = this.projectsFromCommits.map(function (d) { return d.id; });
        var scaleXByCommit = d3__WEBPACK_IMPORTED_MODULE_6__["scaleBand"]().domain(projIds).range([15, this.w]).padding(0);
        var metricsAvailable = this.projectsFromCommits[0].models.overlayModels.metricsOverlayModel.availableMetrics.concat(this.projectsFromCommits[0].models.overlayModels.metricsOverlayModel.availableSpanningMetrics);
        var setChromatic = [].concat(this.d3ScaleChromatic.schemeSet2);
        var darkChromatic = [].concat(this.d3ScaleChromatic.schemeDark2);
        var colorScale = d3__WEBPACK_IMPORTED_MODULE_6__["scaleOrdinal"](setChromatic).domain(metricsAvailable);
        var colorStroke = d3__WEBPACK_IMPORTED_MODULE_6__["scaleOrdinal"](darkChromatic).domain(metricsAvailable);
        svg.selectAll("g")
            .data(stack)
            .enter().append("g")
            .attr("transform", this.d3Transform.transform().translate(20, 15))
            .attr("fill", function (d) {
            return colorScale(d.key.metric);
        })
            .attr("stroke", function (d) {
            return colorStroke(d.key.metric);
        })
            .attr("class", function (d) { return d.id; })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) {
            return scaleXByCommit(d.data.id);
        })
            .attr("y", function (d) {
            return y(d[1]);
        })
            .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
        })
            .attr("width", scaleXByCommit.bandwidth())
            .on("click", function (d, i) {
            window.open("http://localhost:4200/metric-project/" + d.data.id, "blank");
        });
        svg.selectAll("g").append("title").text(function (d) { return "dirtiness of " + d.key.col + " - " + d.key.metric; });
        // let legend = svg.selectAll("g").append("g")
        //   .attr("class", "legend")
        //   .attr("transform", this.d3Transform.transform().translate(20, 15))
        //   .style("font-size", "12px")
        //   .call(this.d3Legend);
        var legend = svg.append("g")
            .attr("transform", this.d3Transform.transform().translate(this.w + 180, 15));
        legend.selectAll("rect")
            .data(metricsAvailable)
            .enter().append("rect")
            .attr("width", 14)
            .attr("height", 14)
            .attr("rx", 14)
            .attr("ry", 14)
            .attr("fill", function (d) { return colorScale(d); })
            .attr("transform", function (d, i) { return "translate(0, " + i * 16 + ")"; });
        legend.selectAll("text.legend")
            .data(metricsAvailable)
            .enter().append("text")
            .text(function (d) { return d; })
            .style("text-anchor", "end")
            .attr("dy", ".25em")
            .attr("transform", function (d, i) { return "translate(-4, " + i * 16 + ")"; })
            .attr("y", 9);
        // .attr("transform", (d: any, i: number, data: any[]) => {
        //   return this.d3Transform.transform().translate(5, i*15);
        // });
    };
    OpenDataProvenanceVisComponent.prototype.createTimelineVis = function () {
        var _this = this;
        var svg = d3__WEBPACK_IMPORTED_MODULE_6__["select"]("svg.git-graph");
        // prepare commmits, calculate height for commit 
        var parents = [];
        var commitLinks = [];
        var maxCount = 0;
        var _loop_7 = function (comm) {
            var currentCommCount = parents.find(function (d) { return d.id == comm.id; });
            var _loop_8 = function (parentId) {
                if (!currentCommCount) {
                    currentCommCount = { id: comm.id, count: 0 };
                    parents.push(currentCommCount);
                }
                var parentCount = parents.find(function (d) { return d.id == parentId; });
                if (!parentCount) {
                    parents.push({ id: parentId, count: currentCommCount.count + comm.parent_ids.indexOf(parentId) });
                }
                else {
                    currentCommCount.count += comm.parent_ids.indexOf(parentId);
                }
            };
            for (var _i = 0, _a = comm.parent_ids; _i < _a.length; _i++) {
                var parentId = _a[_i];
                _loop_8(parentId);
            }
            comm.yHeight = currentCommCount.count;
            for (var _b = 0, _c = comm.parent_ids; _b < _c.length; _b++) {
                var parent_1 = _c[_b];
                commitLinks.push({ source: comm.id, target: parent_1 });
            }
        };
        for (var _i = 0, _a = this.commits; _i < _a.length; _i++) {
            var comm = _a[_i];
            _loop_7(comm);
        }
        // calculate scaling
        var maxTime = d3__WEBPACK_IMPORTED_MODULE_6__["max"](this.commits, function (commit) { return commit.created_at; });
        var minTime = d3__WEBPACK_IMPORTED_MODULE_6__["min"](this.commits, function (commit) { return commit.created_at; });
        var maxAdditions = d3__WEBPACK_IMPORTED_MODULE_6__["max"](this.commits, function (commit) { return commit.stats.additions; });
        var maxDeletions = d3__WEBPACK_IMPORTED_MODULE_6__["max"](this.commits, function (commit) { return commit.stats.deletions; });
        //offset for small values, otherwise they would not be visible
        var scaleChangeAdditions = d3__WEBPACK_IMPORTED_MODULE_6__["scaleLinear"]().domain([0, maxAdditions]).range([2, 40]);
        var scaleChangeDeletions = d3__WEBPACK_IMPORTED_MODULE_6__["scaleLinear"]().domain([0, maxDeletions]).range([2, 40]);
        var scaleXByTime = d3__WEBPACK_IMPORTED_MODULE_6__["scaleTime"]().domain([Date.parse(minTime), Date.parse(maxTime)]).range([0, this.w - 15]);
        var scaleXByCommit = d3__WEBPACK_IMPORTED_MODULE_6__["scaleLinear"]().domain([0, this.commits.length]).range([this.w - 15, 0]);
        var color = d3__WEBPACK_IMPORTED_MODULE_6__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_6__["schemeCategory10"]);
        var scaleYMax = d3__WEBPACK_IMPORTED_MODULE_6__["max"](parents, function (parentCount) { return parentCount.count; });
        var miniHeight = scaleYMax * 40 + 50, //40 accords to maximum additions and deletions
        mainHeight = this.h - miniHeight - 50;
        var scaleY = d3__WEBPACK_IMPORTED_MODULE_6__["scaleLinear"]().domain([-1, scaleYMax]).range([0, miniHeight]);
        //TODO: forceX either do x axis distribution by date or by commit (evenly distributed)
        //      add dropdown to toggle 
        var forceX;
        if (this.xDistByTime) {
            forceX = d3__WEBPACK_IMPORTED_MODULE_6__["forceX"](function (commit) { return scaleXByTime(Date.parse(commit.created_at)); }).strength(10);
        }
        else {
            forceX = d3__WEBPACK_IMPORTED_MODULE_6__["forceX"](function (commit, i) { return scaleXByCommit(i); }).strength(10);
        }
        this.sim = d3__WEBPACK_IMPORTED_MODULE_6__["forceSimulation"]().force("xAxis", forceX)
            .force("yAxis", d3__WEBPACK_IMPORTED_MODULE_6__["forceY"](function (commit) { return (scaleY(commit.yHeight)); }).strength(10))
            .force("link", d3__WEBPACK_IMPORTED_MODULE_6__["forceLink"]().id(function (commit) { return commit.id; }));
        var visCanvas = svg.append("g")
            .attr("class", "vis")
            .attr("transform", this.d3Transform.transform().translate(20, 15));
        var link = visCanvas.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(commitLinks)
            .enter().append("line")
            .attr("stroke", function (link) {
            var source = _this.commits.find(function (commit) { return commit.id == link.source; });
            var target = _this.commits.find(function (commit) { return commit.id == link.target; });
            return source.yHeight > target.yHeight ? color(source.yHeight) : color(target.yHeight);
        })
            .attr("stroke-width", 3);
        var node = visCanvas.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.commits)
            .enter().append("circle")
            .attr("r", this.r)
            .attr("fill", function (commit) { return color(commit.yHeight); })
            .on("click", function (d, i) {
            console.log(d);
            var shortId = d.short_id;
            var proj = _this.projectsFromCommits.find(function (d, i, a) {
                return d.meta.tags.includes(shortId);
            });
            window.open(_this.currentProject.web_url + "/commit/" + d.id, "blank");
        })
            .call(d3__WEBPACK_IMPORTED_MODULE_6__["drag"]()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended));
        var translateRect = this.d3Transform.transform().translate(function (e) { return [-17, -scaleChangeAdditions(e.stats.additions)]; });
        visCanvas.append("g")
            .attr("class", "additions")
            .selectAll("rect")
            .data(this.commits)
            .enter().append("rect")
            .attr("width", 10)
            .attr("height", function (d) { return scaleChangeAdditions(d.stats.additions); })
            .attr("transform", translateRect)
            .attr("fill", "green");
        visCanvas.append("g")
            .attr("class", "deletions")
            .selectAll("rect")
            .data(this.commits)
            .enter().append("rect")
            .attr("width", 10)
            .attr("height", function (d) { return scaleChangeDeletions(d.stats.deletions); })
            .attr("transform", this.d3Transform.transform().translate(-17, 0))
            .attr("fill", "red");
        if (this.xDistByTime) {
            visCanvas.append("g")
                .attr("class", "x-axis")
                .attr("transform", this.d3Transform.transform().translate(0, mainHeight))
                .call(d3__WEBPACK_IMPORTED_MODULE_6__["axisBottom"](scaleXByTime)
                .tickFormat(d3__WEBPACK_IMPORTED_MODULE_6__["timeFormat"]("%Y-%m-%d"))
                .tickArguments([d3__WEBPACK_IMPORTED_MODULE_6__["timeWeek"].every(1)])
                .ticks(this.commits.length))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", this.d3Transform.transform().rotate(-65));
        }
        else {
            // visCanvas.append("g")
            //   .attr("class", "x-axis")
            //   .attr("transform", this.d3Transform.transform().translate(0, mainHeight))
            //   .call(d3.axisBottom(scaleXByCommit)
            //     .ticks(this.commits.length+2))
            //   .selectAll("text")
            //     .style("text-anchor", "end")
            //     .attr("dx", "-.8em")
            //     .attr("dy", ".15em")
            //     .attr("transform", this.d3Transform.transform().rotate(-65));
        }
        node.append("title").text(function (commit) { return "commit msg: " + commit.title; });
        this.sim.nodes(this.commits)
            .on("tick", ticked);
        this.sim.force("link")
            .links(commitLinks);
        // this.sim.force("yAxis").links(commitLinks);//.nodes(node);
        function ticked() {
            link
                .attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d, i, group) {
                // d3.select(group[i]).select("rect").attr("y", d.target.y = (d.target.y - d.source.y));
                return d.source.y;
            })
                .attr("x2", function (d) {
                return d.target.x;
            })
                .attr("y2", function (d) {
                return d.target.y;
            });
            node
                .attr("cx", function (d, i, group) {
                var change = visCanvas.select("g.additions").select("rect:nth-child(" + (i + 1) + ")");
                // change.attr("x", d.x - 17); //subtract by radius and bar width
                change.attr("x", d.x);
                visCanvas.select("g.deletions")
                    .select("rect:nth-child(" + (i + 1) + ")")
                    // .attr("x", d.x - 17);
                    .attr("x", d.x);
                return d.x;
            })
                .attr("cy", function (d, i, group) {
                var change = visCanvas.select("g.additions")
                    .select("rect:nth-child(" + (i + 1) + ")")
                    // .attr("y", (commit:any) => { return d.y - scaleChangeAdditions(commit.stats.additions) });
                    .attr("y", d.y);
                visCanvas.select("g.deletions")
                    .select("rect:nth-child(" + (i + 1) + ")")
                    .attr("y", d.y);
                return d.y;
            });
        }
    };
    OpenDataProvenanceVisComponent.prototype.dragstarted = function (d) {
        if (!d3__WEBPACK_IMPORTED_MODULE_6__["event"].active)
            this.sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };
    OpenDataProvenanceVisComponent.prototype.dragged = function (d) {
        d.fx = d3__WEBPACK_IMPORTED_MODULE_6__["event"].x;
        d.fy = d3__WEBPACK_IMPORTED_MODULE_6__["event"].y;
    };
    OpenDataProvenanceVisComponent.prototype.dragended = function (d) {
        if (!d3__WEBPACK_IMPORTED_MODULE_6__["event"].active)
            this.sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };
    OpenDataProvenanceVisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-open-data-provenance-vis',
            template: __webpack_require__(/*! raw-loader!./open-data-provenance-vis.component.html */ "./node_modules/raw-loader/index.js!./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.html"),
            providers: [_gitlab_service__WEBPACK_IMPORTED_MODULE_4__["GitlabService"], _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_5__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./open-data-provenance-vis.component.scss */ "./src/app/open-data-prov/provenance-vis/open-data-provenance-vis.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _gitlab_service__WEBPACK_IMPORTED_MODULE_4__["GitlabService"],
            _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_5__["OpenRefineService"]])
    ], OpenDataProvenanceVisComponent);
    return OpenDataProvenanceVisComponent;
}());



/***/ }),

/***/ "./src/app/project-list/project-list.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/project-list/project-list.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "span.fa {\n  margin-right: 6px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvcHJvamVjdC1saXN0L3Byb2plY3QtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdC1saXN0L3Byb2plY3QtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInNwYW4uZmEge1xuICBtYXJnaW4tcmlnaHQ6NnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/project-list/project-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/project-list/project-list.component.ts ***!
  \********************************************************/
/*! exports provided: ProjectListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectListComponent", function() { return ProjectListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(openRefineService) {
        var _this = this;
        this.openRefineService = openRefineService;
        this.openRefineService.getAllProjectMetadata().subscribe(function (refineProjects) {
            _this.refineProjects = refineProjects.projects;
            // console.log(this.refineProjects.projects);
        }, function (error) { return _this.errorMessage = error; });
    }
    ProjectListComponent.prototype.ngOnInit = function () {
    };
    ProjectListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project-list',
            template: __webpack_require__(/*! raw-loader!./project-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/project-list/project-list.component.html"),
            providers: [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./project-list.component.scss */ "./src/app/project-list/project-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]])
    ], ProjectListComponent);
    return ProjectListComponent;
}());



/***/ }),

/***/ "./src/app/project-list/project-list.pipe.ts":
/*!***************************************************!*\
  !*** ./src/app/project-list/project-list.pipe.ts ***!
  \***************************************************/
/*! exports provided: ProjectListPipe, NonMetricsProjectListPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectListPipe", function() { return ProjectListPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonMetricsProjectListPipe", function() { return NonMetricsProjectListPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProjectListPipe = /** @class */ (function () {
    function ProjectListPipe() {
    }
    ProjectListPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            if (value[key].customMetadata["metricsProject"]) {
                keys.push({ key: key, value: value[key] });
            }
        }
        return keys;
    };
    ProjectListPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'metricProjects'
        })
    ], ProjectListPipe);
    return ProjectListPipe;
}());

var NonMetricsProjectListPipe = /** @class */ (function () {
    function NonMetricsProjectListPipe() {
    }
    NonMetricsProjectListPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            if (!value[key].customMetadata["metricsProject"]) {
                keys.push({ key: key, value: value[key] });
            }
        }
        return keys;
    };
    NonMetricsProjectListPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'nonMetricProjects'
        })
    ], NonMetricsProjectListPipe);
    return NonMetricsProjectListPipe;
}());



/***/ }),

/***/ "./src/app/refine-provenance-explorer/d3-sankey.js":
/*!*********************************************************!*\
  !*** ./src/app/refine-provenance-explorer/d3-sankey.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/d3/d3-sankey Version 0.7.1. Copyright 2017 Mike Bostock.
(function (global, factory) {
	 true ? factory(exports, __webpack_require__(/*! d3-array */ "./node_modules/d3-array/index.js"), __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/index.js"), __webpack_require__(/*! d3-shape */ "./node_modules/d3-shape/index.js")) :
	undefined;
}(this, (function (exports,d3Array,d3Collection,d3Shape) { 'use strict';

function targetDepth(d) {
  return d.target.depth;
}

function left(node) {
  return node.depth;
}

function right(node, n) {
  return n - 1 - node.height;
}

function justify(node, n) {
  return node.sourceLinks.length ? node.depth : n - 1;
}

function center(node) {
  return node.targetLinks.length ? node.depth
      : node.sourceLinks.length ? d3Array.min(node.sourceLinks, targetDepth) - 1
      : 0;
}

function constant(x) {
  return function() {
    return x;
  };
}

function ascendingSourceBreadth(a, b) {
  return ascendingBreadth(a.source, b.source) || a.index - b.index;
}

function ascendingTargetBreadth(a, b) {
  return ascendingBreadth(a.target, b.target) || a.index - b.index;
}

function ascendingBreadth(a, b) {
  return a.y0 - b.y0;
}

function value(d) {
  return d.value;
}

function nodeCenter(node) {
  return (node.y0 + node.y1) / 2;
}

function weightedSource(link) {
  return nodeCenter(link.source) * link.value;
}

function weightedTarget(link) {
  return nodeCenter(link.target) * link.value;
}

function defaultId(d) {
  return d.index;
}

function defaultNodes(graph) {
  return graph.nodes;
}

function defaultLinks(graph) {
  return graph.links;
}

function find(nodeById, id) {
  var node = nodeById.get(id);
  if (!node) throw new Error("missing: " + id);
  return node;
}

var sankey = function() {
  var x0 = 0, y0 = 0, x1 = 1, y1 = 1, // extent
      dx = 24, // nodeWidth
      py = 8, // nodePadding
      id = defaultId,
      align = justify,
      nodes = defaultNodes,
      links = defaultLinks,
      iterations = 32;

  function sankey() {
    var graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
    computeNodeLinks(graph);
    computeNodeValues(graph);
    computeNodeDepths(graph);
    computeNodeBreadths(graph, iterations);
    computeLinkBreadths(graph);
    return graph;
  }

  sankey.update = function(graph) {
    computeLinkBreadths(graph);
    return graph;
  };

  sankey.nodeId = function(_) {
    return arguments.length ? (id = typeof _ === "function" ? _ : constant(_), sankey) : id;
  };

  sankey.nodeAlign = function(_) {
    return arguments.length ? (align = typeof _ === "function" ? _ : constant(_), sankey) : align;
  };

  sankey.nodeWidth = function(_) {
    return arguments.length ? (dx = +_, sankey) : dx;
  };

  sankey.nodePadding = function(_) {
    return arguments.length ? (py = +_, sankey) : py;
  };

  sankey.nodes = function(_) {
    return arguments.length ? (nodes = typeof _ === "function" ? _ : constant(_), sankey) : nodes;
  };

  sankey.links = function(_) {
    return arguments.length ? (links = typeof _ === "function" ? _ : constant(_), sankey) : links;
  };

  sankey.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankey) : [x1 - x0, y1 - y0];
  };

  sankey.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankey) : [[x0, y0], [x1, y1]];
  };

  sankey.iterations = function(_) {
    return arguments.length ? (iterations = +_, sankey) : iterations;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks(graph) {
    graph.nodes.forEach(function(node, i) {
      node.index = i;
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    var nodeById = d3Collection.map(graph.nodes, id);
    graph.links.forEach(function(link, i) {
      link.index = i;
      var source = link.source, target = link.target;
      if (typeof source !== "object") source = link.source = find(nodeById, source);
      if (typeof target !== "object") target = link.target = find(nodeById, target);
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues(graph) {
    // graph.nodes.forEach(function(node) {
      // node.value = Math.max(
      //   d3Array.sum(node.sourceLinks, value),
      //   d3Array.sum(node.targetLinks, value)
      // );
    // });
  }

  // Iteratively assign the depth (x-position) for each node.
  // Nodes are assigned the maximum depth of incoming neighbors plus one;
  // nodes with no incoming links are assigned depth zero, while
  // nodes with no outgoing links are assigned the maximum depth.
  function computeNodeDepths(graph) {
    var nodes, next, x;

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function(node) {
        node.depth = x;
        node.sourceLinks.forEach(function(link) {
          if (next.indexOf(link.target) < 0) {
            next.push(link.target);
          }
        });
      });
    }

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function(node) {
        node.height = x;
        node.targetLinks.forEach(function(link) {
          if (next.indexOf(link.source) < 0) {
            next.push(link.source);
          }
        });
      });
    }

    var kx = (x1 - x0 - dx) / (x - 1);
    graph.nodes.forEach(function(node) {
      node.x1 = (node.x0 = x0 + Math.max(0, Math.min(x - 1, Math.floor(align.call(null, node, x)))) * kx) + dx;
    });
  }

  function computeNodeBreadths(graph) {
    var columns = d3Collection.nest()
        .key(function(d) { return d.x0; })
        .sortKeys(d3Array.ascending)
        .entries(graph.nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeBreadth();
    resolveCollisions();
    for (var alpha = 1, n = iterations; n > 0; --n) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeBreadth() {
      var ky = d3Array.min(columns, function(nodes) {
        return (y1 - y0 - (nodes.length - 1) * py) / d3Array.sum(nodes, value);
      });

      columns.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y1 = (node.y0 = i) + node.value * ky;
        });
      });

      graph.links.forEach(function(link) {
        link.width = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      columns.forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var dy = (d3Array.sum(node.targetLinks, weightedSource) / d3Array.sum(node.targetLinks, value) - nodeCenter(node)) * alpha;
            node.y0 += dy, node.y1 += dy;
          }
        });
      });
    }

    function relaxRightToLeft(alpha) {
      columns.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var dy = (d3Array.sum(node.sourceLinks, weightedTarget) / d3Array.sum(node.sourceLinks, value) - nodeCenter(node)) * alpha;
            node.y0 += dy, node.y1 += dy;
          }
        });
      });
    }

    function resolveCollisions() {
      columns.forEach(function(nodes) {
        var node,
            dy,
            y = y0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingBreadth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y - node.y0;
          if (dy > 0) node.y0 += dy, node.y1 += dy;
          y = node.y1 + py;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y - py - y1;
        if (dy > 0) {
          y = (node.y0 -= dy), node.y1 -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y1 + py - y;
            if (dy > 0) node.y0 -= dy, node.y1 -= dy;
            y = node.y0;
          }
        }
      });
    }
  }

  function computeLinkBreadths(graph) {
    graph.nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetBreadth);
      node.targetLinks.sort(ascendingSourceBreadth);
    });
    graph.nodes.forEach(function(node) {
      var y0 = node.y0, y1 = y0;
      node.sourceLinks.forEach(function(link) {
        link.y0 = y0 + link.width / 2, y0 += link.width;
      });
      node.targetLinks.forEach(function(link) {
        link.y1 = y1 + link.width / 2, y1 += link.width;
      });
    });
  }

  return sankey;
};

function horizontalSource(d) {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d) {
  return [d.target.x0, d.y1];
}

var sankeyLinkHorizontal = function() {
  return d3Shape.linkHorizontal()
      .source(horizontalSource)
      .target(horizontalTarget);
};

exports.sankey = sankey;
exports.sankeyCenter = center;
exports.sankeyLeft = left;
exports.sankeyRight = right;
exports.sankeyJustify = justify;
exports.sankeyLinkHorizontal = sankeyLinkHorizontal;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ "./src/app/refine-provenance-explorer/icon-codes.json":
/*!************************************************************!*\
  !*** ./src/app/refine-provenance-explorer/icon-codes.json ***!
  \************************************************************/
/*! exports provided: Create Project, TextTransformChange, MassEditChange, MassCellChange, MultiValuedCellJoinChange, MultiValuedCellSplitChange, FillDownChange, BlankDownChange, TransposeColumnsIntoRowsChange, TransposeRowsIntoColumnsChange, KeyValueColumnizeChange, ColumnAdditionChange, ColumnRemovalChange, ColumnRenameChange, ColumnMoveChange, ColumnSplitChange, ColumnAdditionByFetchingURLsChange, ColumnReorderChange, RowRemovalChange, RowStarChange, RowFlagChange, RowReorderChange, ReconChange, ReconMarkNewTopicsChange, ReconMatchBestCandidatesChange, ReconDiscardJudgmentsChange, ReconMatchSpecificTopicChange, ReconJudgeSimilarCellsChange, ReconClearSimilarCellsChange, ReconCopyAcrossColumnsChange, ExtendDataChange, MetricsExtensionChange, CellChange, TextTransformOperation, MassEditOperation, MultiValuedCellJoinOperation, MultiValuedCellSplitOperation, FillDownOperation, BlankDownOperation, TransposeColumnsIntoRowsOperation, TransposeRowsIntoColumnsOperation, KeyValueColumnizeOperation, ColumnAdditionOperation, ColumnRemovalOperation, ColumnRenameOperation, ColumnMoveOperation, ColumnSplitOperation, ColumnAdditionByFetchingURLsOperation, ColumnReorderOperation, RowRemovalOperation, RowStarOperation, RowFlagOperation, default */
/***/ (function(module) {

module.exports = {"Create Project":"fa-file-import","TextTransformChange":"fa-file-code","MassEditChange":"fa-file-code","MassCellChange":"fa-file-code","MultiValuedCellJoinChange":"fa-columns","MultiValuedCellSplitChange":"fa-columns","FillDownChange":"fa-edit","BlankDownChange":"fa-edit","TransposeColumnsIntoRowsChange":"fa-angle-double-right","TransposeRowsIntoColumnsChange":"fa-angle-double-down","KeyValueColumnizeChange":"fa-key","ColumnAdditionChange":"fa-plus-square","ColumnRemovalChange":"fa-columns","ColumnRenameChange":"fa-folder","ColumnMoveChange":"fa-sign-in-alt","ColumnSplitChange":"fa-columns","ColumnAdditionByFetchingURLsChange":"fa-plus-square","ColumnReorderChange":"fa-columns","RowRemovalChange":"fa-minus-square","RowStarChange":"fa-star","RowFlagChange":"fa-flag","RowReorderChange":"fa-sort","ReconChange":"fa-broadcast-tower","ReconMarkNewTopicsChange":"fa-thumbtack","ReconMatchBestCandidatesChange":"fa-clone","ReconDiscardJudgmentsChange":"fa-bolt","ReconMatchSpecificTopicChange":"fa-broadcast-tower","ReconJudgeSimilarCellsChange":"fa-broadcast-tower","ReconClearSimilarCellsChange":"fa-broadcast-tower","ReconCopyAcrossColumnsChange":"fa-broadcast-tower","ExtendDataChange":"fa-external-link-alt","MetricsExtensionChange":"fa-external-link-alt","CellChange":"fa-edit","TextTransformOperation":"fa-file-code","MassEditOperation":"fa-file-code","MultiValuedCellJoinOperation":"fa-columns","MultiValuedCellSplitOperation":"fa-columns","FillDownOperation":"fa-edit","BlankDownOperation":"fa-edit","TransposeColumnsIntoRowsOperation":"fa-angle-double-right","TransposeRowsIntoColumnsOperation":"fa-angle-double-down","KeyValueColumnizeOperation":"fa-key","ColumnAdditionOperation":"fa-plus-square","ColumnRemovalOperation":"fa-columns","ColumnRenameOperation":"fa-folder","ColumnMoveOperation":"fa-sign-in-alt","ColumnSplitOperation":"fa-columns","ColumnAdditionByFetchingURLsOperation":"fa-plus-square","ColumnReorderOperation":"fa-columns","RowRemovalOperation":"fa-minus-square","RowStarOperation":"fa-star","RowFlagOperation":"fa-flag"};

/***/ }),

/***/ "./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.scss":
/*!*********************************************************************************************************!*\
  !*** ./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*div.d3tooltip {\n    position: absolute;\n    text-align: center;\n    padding: 4px;\n    font: 13px sans-serif;\n    background: lightsteelblue;\n    border: 0px;\n    border-radius: 8px;\n    pointer-events: none;\n    overflow:visible;\n}*/\ndiv.d3tooltip span {\n  overflow: hidden; }\npath.metric-link {\n  stroke-width: 1;\n  stroke-opacity: 1;\n  stroke-width: 0.5;\n  fill-opacity: 1; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvcmVmaW5lLXByb3ZlbmFuY2UtZXhwbG9yZXIvcXVhbGl0eS1wcm92ZW5hbmNlLXZpcy9xdWFsaXR5LXByb3ZlbmFuY2UtdmlzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9yZWZpbmUtcHJvdmVuYW5jZS1leHBsb3Jlci9xdWFsaXR5LXByb3ZlbmFuY2UtdmlzL3F1YWxpdHktcHJvdmVuYW5jZS12aXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7RUNVRTtBREVGO0VBQ0ksZ0JBQWdCLEVBQUE7QUFHcEI7RUFDSSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9yZWZpbmUtcHJvdmVuYW5jZS1leHBsb3Jlci9xdWFsaXR5LXByb3ZlbmFuY2UtdmlzL3F1YWxpdHktcHJvdmVuYW5jZS12aXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKmRpdi5kM3Rvb2x0aXAge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogNHB4O1xuICAgIGZvbnQ6IDEzcHggc2Fucy1zZXJpZjtcbiAgICBiYWNrZ3JvdW5kOiBsaWdodHN0ZWVsYmx1ZTtcbiAgICBib3JkZXI6IDBweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgb3ZlcmZsb3c6dmlzaWJsZTtcbn0qL1xuXG5kaXYuZDN0b29sdGlwIHNwYW4ge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbnBhdGgubWV0cmljLWxpbmsge1xuICAgIHN0cm9rZS13aWR0aDogMTtcbiAgICBzdHJva2Utb3BhY2l0eTogMTtcbiAgICBzdHJva2Utd2lkdGg6IDAuNTtcbiAgICBmaWxsLW9wYWNpdHk6IDE7XG59IiwiLypkaXYuZDN0b29sdGlwIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDRweDtcbiAgICBmb250OiAxM3B4IHNhbnMtc2VyaWY7XG4gICAgYmFja2dyb3VuZDogbGlnaHRzdGVlbGJsdWU7XG4gICAgYm9yZGVyOiAwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG92ZXJmbG93OnZpc2libGU7XG59Ki9cbmRpdi5kM3Rvb2x0aXAgc3BhbiB7XG4gIG92ZXJmbG93OiBoaWRkZW47IH1cblxucGF0aC5tZXRyaWMtbGluayB7XG4gIHN0cm9rZS13aWR0aDogMTtcbiAgc3Ryb2tlLW9wYWNpdHk6IDE7XG4gIHN0cm9rZS13aWR0aDogMC41O1xuICBmaWxsLW9wYWNpdHk6IDE7IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: QualityProvenanceVisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualityProvenanceVisComponent", function() { return QualityProvenanceVisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _icon_codes_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icon-codes.json */ "./src/app/refine-provenance-explorer/icon-codes.json");
var _icon_codes_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../icon-codes.json */ "./src/app/refine-provenance-explorer/icon-codes.json", 1);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QualityProvenanceVisComponent = /** @class */ (function () {
    function QualityProvenanceVisComponent() {
        this.qualityCompareViewWidth = 0;
        this.elementPadding = 35;
        this.innerPadding = .8;
        this.iconWidth = 16;
        this.uniqueMetrics = [];
    }
    Object.defineProperty(QualityProvenanceVisComponent.prototype, "content", {
        set: function (content) {
            this.detailIssueView = content;
            if (this.detailIssueView && this.provenanceOverlayModel) {
                // this.issueViewOffset = this.elementPadding + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
                this.scaleComparison();
                this.renderIssueSelectionView();
            }
        },
        enumerable: true,
        configurable: true
    });
    QualityProvenanceVisComponent.prototype.ngOnInit = function () {
        this.getRefineProject();
        this.transition = d3__WEBPACK_IMPORTED_MODULE_2__["transition"]()
            .duration(500)
            .ease(d3__WEBPACK_IMPORTED_MODULE_2__["easeLinear"]);
    };
    QualityProvenanceVisComponent.prototype.ngOnChanges = function (changes) {
        // && changes.histId && 
        // if (this.provenanceOverlayModel && (changes.nodeHistory || changes.shiftNodeHistory)) {
        //   if (this.loadFinished) {
        //     // this.scaleByHistory = d3.scaleBand().domain(historyArray).range([20, parseFloat(this.svgQualityView.nativeElement.scrollWidth) - 15]);//.padding(0.05);
        //     this.renderIssueSelectionView();
        //     if(this.nodeHistory && this.nodeHistory.length > 0) {
        //       this.scaleComparison()
        //       // this.renderQualityView(this.nodeHistory, this.scaleByHistory, d3.select('svg.barchart'), true);
        //     }
        //   }
        // }
        //changes.nodeHistory.currentValue != null
        if ((changes.nodeHistory || changes.shiftNodeHistory) && this.provenanceOverlayModel && this.nodeWidth && this.sankeyDiag && this.metricsColorScale) {
            if (changes.nodeHistory)
                this.nodeHistory = changes.nodeHistory.currentValue;
            if (changes.shiftNodeHistory)
                this.shiftNodeHistory = changes.shiftNodeHistory.currentValue;
            this.scaleComparison();
        }
        if (changes.histId) {
            this.histId = changes.histId.currentValue;
            if (this.provenanceOverlayModel && this.detailIssueView && this.metricsColorScale)
                this.renderIssueSelectionView();
        }
        if ((changes.detailViewWidth || changes.showDetail || changes.detailIssueView) && this.provenanceOverlayModel) {
            this.scaleComparison();
            this.renderIssueSelectionView();
        }
    };
    QualityProvenanceVisComponent.prototype.getRefineProject = function () {
        var _this = this;
        this.openRefineService.getRefineProject(this.projectId)
            .subscribe(function (openRefineProject) {
            _this.columnModel = openRefineProject.columnModel;
            _this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];
            _this.openRefineService.getHistory(_this.projectId)
                .subscribe(function (history) {
                _this.nodeHistory = [];
                _this.nodeHistory.push({ id: 0, value: _this.provenanceOverlayModel.provenance.entity["history_entry:0"] });
                for (var _i = 0, _a = history.past; _i < _a.length; _i++) {
                    var historyEntry = _a[_i];
                    _this.nodeHistory.push({ id: historyEntry.id, value: _this.provenanceOverlayModel.provenance.entity["history_entry:" + historyEntry.id] });
                    d3__WEBPACK_IMPORTED_MODULE_2__["select"]("svg.provGraph").select("rect#activity" + historyEntry.id)
                        .classed("selected", true);
                    d3__WEBPACK_IMPORTED_MODULE_2__["select"]("svg.provGraph").select("path#activity" + historyEntry.id)
                        .classed("selected", true);
                }
                if (_this.nodeHistory && _this.nodeHistory.length > 0 && _this.nodeWidth && _this.sankeyDiag) {
                    _this.scaleComparison();
                    _this.renderIssueSelectionView();
                }
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    QualityProvenanceVisComponent.prototype.renderQualityView = function (nodeHistory, scale, rootElement, inverted) {
        var _this = this;
        var historyFlow = [];
        var shiftHistoryFlow = [];
        var metricColPair = [];
        this.div = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("body").append("div")
            .attr("class", "d3tooltip")
            .style("opacity", 0);
        for (var _i = 0, nodeHistory_1 = nodeHistory; _i < nodeHistory_1.length; _i++) {
            var historyEntry = nodeHistory_1[_i];
            var quality = [];
            historyEntry.id = historyEntry.id;
            for (var ent in this.provenanceOverlayModel.provenance.entity) {
                // let histId = entity[0].replace("history_entry:", "");
                if (this.provenanceOverlayModel.provenance.entity[ent]["quality:" + historyEntry.id])
                    quality.push({ col: ent, metrics: this.provenanceOverlayModel.provenance.entity[ent]["quality:" + historyEntry.id] });
            }
            ;
            var metrics = [];
            var _loop_1 = function (pair) {
                var _loop_4 = function (m) {
                    if (!metricColPair.some(function (obj) { return obj.metric === m.type && obj.column === pair.col; }))
                        metricColPair.push({ metric: m.type, column: pair.col });
                    var found = metrics.find(function (metric, idx, array) {
                        return metric.name == m.type;
                    });
                    if (found != null)
                        found.values.push({ value: m.$, column: pair.col });
                    else
                        metrics.push({ name: m.type, values: [{ value: m.$, column: pair.col }] });
                };
                for (var _i = 0, _a = pair.metrics; _i < _a.length; _i++) {
                    var m = _a[_i];
                    _loop_4(m);
                }
            };
            for (var _a = 0, _b = Object.values(quality); _a < _b.length; _a++) {
                var pair = _b[_a];
                _loop_1(pair);
            }
            if (metrics.length > 0)
                historyFlow.push({ historyEntry: historyEntry, metrics: metrics });
        }
        if (this.shiftNodeHistory && this.shiftNodeHistory.length > 0) {
            for (var _c = 0, _d = this.shiftNodeHistory; _c < _d.length; _c++) {
                var historyEntry = _d[_c];
                var quality = [];
                historyEntry.id = historyEntry.id;
                for (var ent in this.provenanceOverlayModel.provenance.entity) {
                    // let histId = entity[0].replace("history_entry:", "");
                    if (this.provenanceOverlayModel.provenance.entity[ent]["quality:" + historyEntry.id])
                        quality.push({ col: ent, metrics: this.provenanceOverlayModel.provenance.entity[ent]["quality:" + historyEntry.id] });
                }
                ;
                var metrics = [];
                var _loop_2 = function (pair) {
                    var _loop_5 = function (m) {
                        if (!metricColPair.some(function (obj) { return obj.metric === m.type && obj.column === pair.col; }))
                            metricColPair.push({ metric: m.type, column: pair.col });
                        var found = metrics.find(function (metric, idx, array) {
                            return metric.name == m.type;
                        });
                        if (found != null)
                            found.values.push({ value: m.$, column: pair.col });
                        else
                            metrics.push({ name: m.type, values: [{ value: m.$, column: pair.col }] });
                    };
                    for (var _i = 0, _a = pair.metrics; _i < _a.length; _i++) {
                        var m = _a[_i];
                        _loop_5(m);
                    }
                };
                for (var _e = 0, _f = Object.values(quality); _e < _f.length; _e++) {
                    var pair = _f[_e];
                    _loop_2(pair);
                }
                if (metrics.length > 0)
                    shiftHistoryFlow.push({ historyEntry: historyEntry, metrics: metrics });
            }
            for (var _g = 0, _h = this.nodeHistory; _g < _h.length; _g++) {
                var historyEntry = _h[_g];
                var quality = [];
                historyEntry.id = historyEntry.id;
                for (var ent in this.provenanceOverlayModel.provenance.entity) {
                    // let histId = entity[0].replace("history_entry:", "");
                    if (this.provenanceOverlayModel.provenance.entity[ent]["quality:" + historyEntry.id])
                        quality.push({ col: ent, metrics: this.provenanceOverlayModel.provenance.entity[ent]["quality:" + historyEntry.id] });
                }
                ;
                var metrics = [];
                var _loop_3 = function (pair) {
                    var _loop_6 = function (m) {
                        if (!metricColPair.some(function (obj) { return obj.metric === m.type && obj.column === pair.col; }))
                            metricColPair.push({ metric: m.type, column: pair.col });
                        var found = metrics.find(function (metric, idx, array) {
                            return metric.name == m.type;
                        });
                        if (found != null)
                            found.values.push({ value: m.$, column: pair.col });
                        else
                            metrics.push({ name: m.type, values: [{ value: m.$, column: pair.col }] });
                    };
                    for (var _i = 0, _a = pair.metrics; _i < _a.length; _i++) {
                        var m = _a[_i];
                        _loop_6(m);
                    }
                };
                for (var _j = 0, _k = Object.values(quality); _j < _k.length; _j++) {
                    var pair = _k[_j];
                    _loop_3(pair);
                }
                if (metrics.length > 0)
                    shiftHistoryFlow.push({ historyEntry: historyEntry, metrics: metrics });
            }
        }
        metricColPair.sort(function (a, b) {
            var fullColA = _this.provenanceOverlayModel.columnIds.find(function (d) { return d.localPart === a.column.replace("column:", ""); });
            var fullColB = _this.provenanceOverlayModel.columnIds.find(function (d) { return d.localPart === b.column.replace("column:", ""); });
            fullColA = _this.columnModel.columns.find(function (d) { return d.name === fullColA.columnName; });
            if (!fullColA)
                return -1;
            fullColB = _this.columnModel.columns.find(function (d) { return d.name === fullColB.columnName; });
            if (!fullColB)
                return 1;
            return fullColA.cellIndex - fullColB.cellIndex;
        });
        metricColPair.sort(function (a, b) {
            if (a.metric < b.metric) {
                return -1;
            }
            if (a.metric > b.metric) {
                return 1;
            }
            return 0;
        });
        var stack = d3__WEBPACK_IMPORTED_MODULE_2__["stack"]()
            .keys(metricColPair)
            .value(function (d, key, j, data) {
            var metricStack = d.metrics.find(function (d) { return d.name === key.metric; });
            var metric = metricStack.values.find((function (obj) { return obj.column === key.column; }));
            if (metric)
                return parseFloat(metric.value);
            else
                return 0;
        })(historyFlow);
        var arr = Array.prototype.concat.apply([], stack[stack.length - 1]);
        // get heights of shift stack
        if (shiftHistoryFlow.length > 0) {
            var shiftStack = d3__WEBPACK_IMPORTED_MODULE_2__["stack"]()
                .keys(metricColPair)
                .value(function (d, key, j, data) {
                var metricStack = d.metrics.find(function (d) { return d.name === key.metric; });
                var metric = metricStack.values.find((function (obj) { return obj.column === key.column; }));
                if (metric)
                    return parseFloat(metric.value);
                else
                    return 0;
            })(shiftHistoryFlow);
            arr = arr.concat(Array.prototype.concat.apply([], shiftStack[shiftStack.length - 1]));
        }
        var maxVal = Math.max.apply(Math, arr);
        // max scale needs to be determined // we also leave space for multiple selection guiding icons
        var y = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]().rangeRound([this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding, this.elementPadding]).domain([0, maxVal]).nice();
        // let metricColorScale = d3.scaleSequential(d3.interpolateViridis);
        if (this.uniqueMetrics.length == 0) {
            metricColPair.forEach(function (val) {
                if (!_this.uniqueMetrics.includes(val.metric.replace("quality:", "")))
                    _this.uniqueMetrics.push(val.metric.replace("quality:", ""));
            });
            this.uniqueMetrics.sort();
            // this.metricsColorScale = d3.interpolatePuOr(this.uniqueMetrics.length);
            this.initializeColorScale();
        }
        rootElement.selectAll("g").remove();
        rootElement.selectAll("g")
            .data(stack).enter()
            .append("g")
            .attr("class", function (stack) { return stack.key.column.replace("column:", "") + " " + stack.key.metric.replace("quality:", ""); })
            // .attr("transform", d3Transform.transform().translate(20,15))
            .attr("fill", function (d) { return _this.determineColor(d.key.metric.replace("quality:", "")); }) //d3.schemePastel2[this.uniqueMetrics.indexOf(d.key.metric.replace("quality:", ""))])
            .attr("stroke", function (d) { return _this.determineStrokeColor(d.key.metric.replace("quality:", "")); }) //d3.schemeDark2[this.uniqueMetrics.indexOf(d.key.metric.replace("quality:", ""))])
            .attr("stroke-width", .85)
            .attr("stroke-opacity", .6)
            .selectAll("rect")
            .data(function (stack) {
            for (var _i = 0, stack_1 = stack; _i < stack_1.length; _i++) {
                var entry = stack_1[_i];
                var metricForColumns = entry.data.metrics.find(function (obj) { return obj.name === stack.key.metric; });
                var metric = metricForColumns.values.find((function (obj) { return obj.column === stack.key.column; }));
                var metricValue = void 0;
                if (metric)
                    metricValue = metric.value;
                else
                    metricValue = 0;
                entry.data = { metric: stack.key.metric,
                    historyEntry: entry.data.historyEntry,
                    column: stack.key.column,
                    value: metricValue };
            }
            return stack;
        }).enter()
            .append("rect")
            .each(function (d, i, arr) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"](arr[i]).classed("hist" + d.data.historyEntry.id, true);
        })
            .attr("x", function (d) {
            // we don't use the regular bandwidth, so we need to do some calculations
            // if (nodeHistory.indexOf(d.data.historyEntry) == 0)
            //   return scale(d.data.historyEntry.id)
            // else if (nodeHistory.indexOf(d.data.historyEntry) == nodeHistory.length-1)
            //   return scale(d.data.historyEntry.id) + scale.bandwidth() - this.nodeWidth; 
            // else
            //   return scale(d.data.historyEntry.id) + (scale.bandwidth()/2);
            return scale(d.data.historyEntry.depth);
        })
            .attr("y", function (d) {
            return y(d[1]);
        })
            .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
        })
            .attr("width", scale.bandwidth())
            .on("mouseover", function (quality, i, el) {
            if (quality.data.historyEntry.id != _this.issueViewHistId) {
                var rows = parseInt(_this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + quality.data.historyEntry.id].$);
                var shiftRows = 0;
                if (_this.shiftHistId)
                    shiftRows = parseInt(_this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + _this.shiftHistId].$);
                // this.renderIssueViewForHistId(quality.data.historyEntry.id, d3.select("#issueView"), this.issueViewOffset, rows > shiftRows ? rows : shiftRows, this.detailViewWidth - 25);
            }
            d3__WEBPACK_IMPORTED_MODULE_2__["select"](el[i])
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 1);
            _this.div.transition()
                .duration(100)
                .style("opacity", .9);
            _this.div.html(quality.data.column + " " + quality.data.metric + "<br>measure: " + quality.data.value)
                .style("left", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageX) + "px")
                .style("top", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageY - 28) + "px");
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 1)
                .attr("fill", _this.determineStrokeColor(quality.data.metric.replace("quality:", "")));
            var gr = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", "") + " rect")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1);
            gr.selectAll("path")
                .classed("metric-link", true)
                .attr("fill", _this.determineStrokeColor(quality.data.metric.replace("quality:", "")));
            if (parseInt(quality.data.historyEntry.id) === parseInt(_this.histId) ||
                parseInt(quality.data.historyEntry.id) === parseInt(_this.shiftHistId)) {
                d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView")
                    // .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
                    // .select("g." + quality.data.metric.replace("quality:",""))
                    .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
                    .select("g." + quality.data.metric.replace("quality:", ""))
                    .selectAll("rect")
                    .attr("stroke-width", "2px")
                    .raise();
                // .attr("fill", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(quality.data.metric.replace("quality:", ""))])
            }
        })
            .on("mousemove", function (data) {
            _this.div
                .style("left", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageX) + "px")
                .style("top", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageY - 28) + "px");
        })
            .on("mouseout", function (quality, i, el) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
                .attr("stroke-width", null)
                .attr("stroke-opacity", null)
                .attr("fill", _this.determineColor(quality.data.metric.replace("quality:", "")));
            // d3.select(el[i])
            //   .attr("stroke-width", null)
            //   .attr("stroke-opacity", null);
            _this.div.transition()
                .duration(100)
                .style("opacity", 0);
            // d3.select("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            //   .attr("stroke-width", .85)
            //   .attr("stroke-opacity", .6)
            //   .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));
            // let gr = d3.select("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", "") + " rect")
            //   .attr("stroke-opacity", 0);
            // gr.selectAll("path")
            //   .classed("metric-link", (quality:any) => quality.from.data.value != quality.to.data.value)
            //   .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));
            if (parseInt(quality.data.historyEntry.id) === parseInt(_this.histId) ||
                parseInt(quality.data.historyEntry.id) === parseInt(_this.shiftHistId)) {
                d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView")
                    .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
                    .select("g." + quality.data.metric.replace("quality:", ""))
                    .selectAll("rect")
                    .attr("stroke-width", "0px");
                // .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(quality.data.metric.replace("quality:", ""))])
            }
        });
        var qualityYAxis = d3__WEBPACK_IMPORTED_MODULE_2__["axisLeft"](y);
        rootElement.append("g")
            .classed("y-axis", true)
            .attr("transform", "translate(" + this.elementPadding + ",0)")
            .call(function (g) {
            g.call(qualityYAxis);
        });
        rootElement.append("text")
            .attr("text-anchor", "left")
            .attr("transform", "translate(0,15)")
            .text("Quality Issues Rate");
        // //** this is the right hand side axis for the quality flow
        // let qualityYAxisRight = d3.axisRight(y);
        // rootElement.append("g")
        //   .classed("y-axis", true)
        //   .attr("transform", "translate(" + (scale.range()[1]) + ",0)")
        //   .call((g:any) => {
        //     g.call(qualityYAxisRight);
        //   });
        // g.selectAll(".tick line").attr("transform", "translate(-" + (scaleXColumn.bandwidth()/2) + ",0)");
        //   g.selectAll(".tick text")
        //     .text((d:any) => {
        //       return d.replace("column:","");
        //     })
        //     .attr("text-anchor", "start")
        //     .attr("transform", "translate(-"+ scaleXColumn.bandwidth()/2 +",0)rotate(-90)");
        var link = rootElement.append("g")
            .classed("issueLinks", true)
            .attr("fill", "none")
            .attr("stroke-opacity", 0.25);
        var paths = link.selectAll("g")
            .data(stack)
            .enter().append("g")
            .attr("class", function (stack) { return stack.key.column.replace("column:", "") + " " + stack.key.metric.replace("quality:", ""); })
            .attr("fill", function (stack) { return _this.determineColor(stack.key.metric.replace("quality:", "")); })
            .attr("stroke", function (stack) { return _this.determineStrokeColor(stack.key.metric.replace("quality:", "")); })
            .attr("stroke-opacity", .4)
            .attr("stroke-width", .85)
            .attr("fill-opacity", 0.4)
            .selectAll("path")
            .data(function (d) {
            // build connections
            var links = [];
            for (var i = 1; i < d.length; i++) {
                links.push({ from: d[i - 1], to: d[i], key: d.key, index: d.index });
            }
            return links;
        })
            .enter().append("path")
            .classed("metric-link", function (quality) { return quality.from.data.value != quality.to.data.value; })
            .attr("d", function (d) {
            var x0;
            var x1;
            if (!inverted) {
                x0 = scale(d.from.data.historyEntry.depth) + scale.bandwidth(),
                    x1 = scale(d.to.data.historyEntry.depth);
            }
            else {
                x0 = scale(d.from.data.historyEntry.depth);
                x1 = scale(d.to.data.historyEntry.depth) + scale.bandwidth();
            }
            // x0 = scale(d.from.data.historyEntry.depth) + scale.bandwidth(),
            // x1 = scale(d.to.data.historyEntry.depth);
            return _this.linkSkewed(d, y, x0, x1);
        })
            .on("mouseover", function (quality, i, el) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", ""))
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 1)
                .attr("fill", _this.determineStrokeColor(quality.key.metric.replace("quality:", "")));
            var gr = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", "") + " rect")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1);
            gr.selectAll("path")
                .classed("metric-link", true)
                .attr("fill", _this.determineStrokeColor(quality.key.metric.replace("quality:", "")));
            // d3.select(el[i]).classed("metric-link", true)
            //   .attr("stroke-width", 1);
            // .attr("stroke-opacity", 1);
            _this.div.transition()
                .duration(100)
                .style("opacity", .9);
            _this.div.html(quality.key.column +
                " " + quality.key.metric +
                " <br><b>Change</b> from " + quality.from.data.value +
                " to " + quality.to.data.value)
                .style("left", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageX) + "px")
                .style("top", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageY - 28) + "px");
        })
            .on("mousemove", function (data) {
            _this.div.style("left", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageX) + "px")
                .style("top", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageY - 28) + "px");
        })
            .on("mouseout", function (quality, i, el) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", ""))
                .attr("stroke-width", .85)
                .attr("stroke-opacity", .6)
                .attr("fill", _this.determineColor(quality.key.metric.replace("quality:", "")));
            var gr = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", "") + " rect")
                .attr("stroke-opacity", 0);
            gr.selectAll("path")
                .classed("metric-link", function (quality) { return quality.from.data.value != quality.to.data.value; })
                .attr("fill", _this.determineColor(quality.key.metric.replace("quality:", "")));
            // d3.select(el[i]).classed("metric-link",  (quality:any) => quality.from.data.value != quality.to.data.value)
            //   .attr("stroke-width", null);
            _this.div.transition()
                .duration(100)
                .style("opacity", 0);
        });
    };
    QualityProvenanceVisComponent.prototype.renderIssueViewForHistId = function (histId, selectElement, translate, rows, elementWidth) {
        var _this = this;
        var issues = [];
        var issuesB = [];
        for (var ent in this.provenanceOverlayModel.provenance.entity) {
            // let histId = entity[0].replace("history_entry:", "");
            var errorIndices = [];
            if (this.provenanceOverlayModel.provenance.entity[ent]["error:" + histId]) {
                for (var _i = 0, _a = this.provenanceOverlayModel.provenance.entity[ent]["error:" + histId]; _i < _a.length; _i++) {
                    var errorArray = _a[_i];
                    errorIndices.push({ metric: errorArray.type, indices: JSON.parse(errorArray.$) });
                    if (!this.uniqueMetrics.includes(errorArray.type.replace("error:", ""))) {
                        this.uniqueMetrics.push(errorArray.type.replace("error:", ""));
                    }
                }
                issues.push({ col: ent, issues: errorIndices });
            }
            var errorIndicesB = [];
            if (this.shiftHistId && this.provenanceOverlayModel.provenance.entity[ent]["error:" + this.shiftHistId]) {
                for (var _b = 0, _c = this.provenanceOverlayModel.provenance.entity[ent]["error:" + this.shiftHistId]; _b < _c.length; _b++) {
                    var errorArray = _c[_b];
                    errorIndicesB.push({ metric: errorArray.type, indices: JSON.parse(errorArray.$) });
                    if (!this.uniqueMetrics.includes(errorArray.type.replace("error:", ""))) {
                        this.uniqueMetrics.push(errorArray.type.replace("error:", ""));
                    }
                }
                issuesB.push({ col: ent, issues: errorIndicesB });
            }
        }
        ;
        if (issuesB.length > 0) {
            var issuesLarger_1, issuesSmaller = void 0;
            if (issues.length > issuesB.length) {
                issuesLarger_1 = [].concat(issues);
                issuesSmaller = [].concat(issuesB);
            }
            else {
                issuesLarger_1 = [].concat(issuesB);
                issuesSmaller = [].concat(issues);
            }
            var _loop_7 = function (arrIdx) {
                var issueSmArr = issuesSmaller.find(function (d) { return issuesLarger_1[arrIdx].col === d.col; });
                if (issueSmArr) {
                    var _loop_8 = function (m) {
                        var smMetric = issueSmArr.issues.find(function (mVal) { return issuesLarger_1[arrIdx].issues[m].metric === mVal.metric; });
                        if (smMetric) {
                            for (var i = 0; i < issuesLarger_1[arrIdx].issues[m].indices.length;) {
                                var smMetricIndex = smMetric.indices.indexOf(issuesLarger_1[arrIdx].issues[m].indices[i]);
                                if (smMetricIndex >= 0) {
                                    issuesLarger_1[arrIdx].issues[m].indices.splice(i, 1);
                                    smMetric.indices.splice(smMetricIndex, 1);
                                }
                                else
                                    ++i;
                            }
                            for (var i = 0; i < smMetric.indices.length; i++) {
                                if (!issuesLarger_1[arrIdx].issues[m].indices.includes(smMetric.indices[i])) {
                                    issuesLarger_1[arrIdx].issues[m].indices.push(smMetric.indices[i]);
                                }
                            }
                            issuesLarger_1[arrIdx].issues[m].indices.sort(this_1.numericSort);
                        }
                    };
                    for (var m = 0; m < issuesLarger_1[arrIdx].issues.length; ++m) {
                        _loop_8(m);
                    }
                }
            };
            var this_1 = this;
            for (var arrIdx = 0; arrIdx < issuesLarger_1.length; arrIdx++) {
                _loop_7(arrIdx);
            }
            issues = issuesLarger_1;
        }
        this.uniqueMetrics.sort();
        this.initializeColorScale();
        issues.sort(function (colA, colB) {
            var fullColA = _this.provenanceOverlayModel.columnIds.find(function (d) { return d.localPart === colA.col.replace("column:", ""); });
            var fullColB = _this.provenanceOverlayModel.columnIds.find(function (d) { return d.localPart === colB.col.replace("column:", ""); });
            fullColA = _this.columnModel.columns.find(function (d) { return d.name === fullColA.columnName; });
            if (!fullColA)
                return -1;
            fullColB = _this.columnModel.columns.find(function (d) { return d.name === fullColB.columnName; });
            if (!fullColB)
                return 1;
            return fullColA.cellIndex - fullColB.cellIndex;
        });
        var scaleXColumn = d3__WEBPACK_IMPORTED_MODULE_2__["scaleBand"]()
            .domain(issues.map(function (issuesEntry) { return issuesEntry.col; }))
            .range([translate, translate + elementWidth - 35]);
        var xAxis = d3__WEBPACK_IMPORTED_MODULE_2__["axisBottom"](scaleXColumn);
        d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("#issueView g.axis g").remove();
        selectElement.select("g.axis").append("g")
            .classed("x-axis", true)
            // .attr("transform", "translate(0, 35)")
            .call(function (g) {
            g.call(xAxis);
            // g.select(".domain").remove();
            g.selectAll(".tick line").attr("transform", "translate(-" + (scaleXColumn.bandwidth() / 2) + ",0)");
            g.selectAll(".tick text")
                .text(function (d) {
                return d.replace("column:", "");
            })
                .attr("text-anchor", "start")
                .attr("transform", "translate(-" + scaleXColumn.bandwidth() / 2 + ",0)rotate(-90)");
        });
        var axisOffset;
        selectElement.select("g.axis g.x-axis")
            .attr("transform", function (g) {
            var nodeEl = selectElement.select("g.axis g.x-axis").node();
            axisOffset = nodeEl.getBBox().height;
            return "translate(0, " + nodeEl.getBBox().height + ")";
        });
        var scaleYRows = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]()
            .domain([0, rows])
            .range([axisOffset, this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding]);
        var yAxis = d3__WEBPACK_IMPORTED_MODULE_2__["axisLeft"](scaleYRows);
        d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView g.axis").append("g")
            .classed("y-axis", true)
            .attr("transform", "translate(" + this.issueViewOffset + ",0)")
            .call(yAxis);
        var xAxisNode = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView g.axis g.x-axis").node();
        var yAxisNode = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView g.axis g.y-axis").node();
        if (xAxisNode && yAxisNode) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#issueView g.axis').append("text")
                .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
                // this.compareView.nativeElement.scrollHeight
                .attr("transform", "translate(" + (this.issueViewOffset - yAxisNode.getBBox().width) + "," + (axisOffset - 5) + ")") // (yAxisNode.getBBox().height/2 + axisOffset)
                .text("Rows");
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#issueView g.axis').append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + (this.issueViewOffset + xAxisNode.getBBox().width / 2 - this.elementPadding) + "," + 20 + ")")
                .text("Columns");
        }
        // // EXIT old elements not present in new data.
        // issueView.exit()
        //   // .attr("class", "exit")
        //   .transition(this.transition)
        //     .style("fill-opacity", 1e-6)
        //     .remove();
        // // UPDATE old elements present in new data.
        // issueView//.attr("class", "update")
        //     .style("fill-opacity", 1)
        //   .transition(this.transition);
        // ENTER new elements present in new data.
        var gCols = selectElement.selectAll("g.column")
            .data(issues);
        // EXIT old elements not present in new data.
        gCols.exit()
            .transition(this.transition)
            .remove();
        // UPDATE old elements present in new data.
        gCols.transition(this.transition)
            .attr("transform", function (d) { return "translate(" + scaleXColumn(d.col) + ",0)"; });
        // ENTER new elements present in new data.
        gCols.enter().append("g")
            .attr("class", function (d) { return "column " + d.col.replace("column:", "").replace(/[^a-zA-Z ]/g, ""); })
            .attr("stroke-width", 0)
            // .transition(this.transition)
            .attr("transform", function (d) { return "translate(" + scaleXColumn(d.col) + ",0)"; })
            .on("mouseover", function (data, i, el) {
            d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + _this.histId)
                .classed("metric-link", true)
                .attr("fill", function (data) {
                return _this.determineStrokeColor(data.data.metric.replace("quality:", ""));
            });
            d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + _this.shiftHistId)
                .classed("metric-link", true)
                .attr("fill", function (data) {
                return _this.determineStrokeColor(data.data.metric.replace("quality:", ""));
            });
        })
            .on("mouseout", function (data, i, el) {
            d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + _this.histId)
                .classed("metric-link", false)
                .attr("fill", function (data) { return _this.determineColor(data.data.metric.replace("quality:", "")); });
            d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + _this.shiftHistId)
                .classed("metric-link", false)
                .attr("fill", function (data) { return _this.determineColor(data.data.metric.replace("quality:", "")); });
        });
        var gIssues = selectElement.selectAll("g.column").selectAll("g").data(function (d) { return d.issues; });
        // EXIT old elements not present in new data.
        gIssues.exit()
            // .transition(this.transition)
            .attr("fill", "none")
            .remove();
        // UPDATE old elements present in new data.
        // ENTER new elements present in new data.
        gIssues.enter().append("g")
            .attr("class", function (d) { return d.metric.replace("error:", ""); })
            .attr("fill", function (d) { return _this.determineColor(d.metric.replace("error:", "")); })
            .attr("stroke", function (d) { return _this.determineStrokeColor(d.metric.replace("error:", "")); });
        var rectIssues = selectElement.selectAll("g.column").selectAll("g").selectAll("rect")
            .data(function (d) { return d.indices; });
        // UPDATE old elements present in new data.
        rectIssues
            // .transition(this.transition)
            .attr("width", scaleXColumn.bandwidth())
            .attr("height", function (d) { return scaleYRows(d) - scaleYRows(d - 1); })
            .attr("y", function (d) { return scaleYRows(d); });
        // .attr("transform", (d:any) => "translate(0, "+scaleYRows(d) + ")");
        rectIssues.enter()
            .append("rect")
            .on("mouseover", function (data, i, el) {
            var col = d3__WEBPACK_IMPORTED_MODULE_2__["select"](el[i].parentNode.parentNode).node();
            var gs = d3__WEBPACK_IMPORTED_MODULE_2__["select"](el[i].parentNode.parentNode).selectAll("g rect")
                .attr("stroke-width", "2px");
            // .attr("fill", (d:any) => {
            //   if(d.metric)
            //     return d3.schemeDark2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))];
            //   return null;
            //   });
            _this.div.transition()
                .duration(100)
                .style("opacity", 1);
            if (col.__data__.col) {
                var text = "<b>Detected Issue </b><br><span>Column: " + col.__data__.col.replace("column:", "") + "</span> <span>Row: " + data + "</span>";
                for (var _i = 0, _a = col.__data__.issues; _i < _a.length; _i++) {
                    var issue = _a[_i];
                    if (issue.indices.includes(data))
                        text += "<br><span>Metric: " + issue.metric.replace("error:", "") + "</span>";
                }
                _this.div.html(text)
                    .style("left", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageX) + "px")
                    .style("top", (d3__WEBPACK_IMPORTED_MODULE_2__["event"].pageY - 28) + "px");
            }
        })
            .on("mouseout", function (data, i, el) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"](el[i].parentNode.parentNode).selectAll("g rect")
                .attr("stroke-width", "0px");
            // .attr("stroke", "none")
            // .attr("fill", (d:any) => {
            //   if(d.metric)
            //     return d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))];
            //   return null;
            //   });
            // d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))]);
            _this.div.transition()
                .duration(100)
                .style("opacity", 0);
        })
            // .transition(this.transition)
            .attr("height", function (d) { return scaleYRows(d) - scaleYRows(d - 1); })
            .attr("y", function (d) { return scaleYRows(d); })
            .attr("width", scaleXColumn.bandwidth());
        rectIssues.exit()
            // .transition(this.transition)
            .attr("y", scaleYRows(rows))
            .remove();
        // let colGroups = issueView;
        // colGroups.exit()
        //   .transition(this.transition)
        //     .style("fill-opacity", 1e-6)
        //   .remove();
        this.issueViewHistId = histId;
    };
    QualityProvenanceVisComponent.prototype.renderIssueSelectionView = function () {
        // let translX = 25 + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
        var detailViewSvg = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#qualityComparison svg");
        d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView g.axis").remove();
        d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView").append("g").classed("axis", true);
        var rows = parseInt(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + this.histId].$);
        var shiftRows = 0;
        if (this.shiftHistId)
            shiftRows = parseInt(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + this.shiftHistId].$);
        this.renderIssueViewForHistId(this.histId, d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#issueView"), this.issueViewOffset, rows > shiftRows ? rows : shiftRows, this.detailViewWidth - 25);
        // d3.select("#issueView").attr("transform", "translate(" + this.issueViewOffset + ",35)");
        // let scaleYRows = d3.scaleLinear()
        //   .domain([0, rows > shiftRows ? rows : shiftRows])
        //   .range([35, this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding]);
        // d3.select('#issueView g.axis text')  // select all the text elements for the xaxis
        //       .attr('transform', function(d) {
        //          return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
        //      });
    };
    QualityProvenanceVisComponent.prototype.renderHistoryLinks = function (element, history, scale, classed, inverted) {
        var _this = this;
        element.selectAll('rect')
            .data(history).enter()
            .append('rect')
            .attr('x', function (d) { return scale(d.depth); })
            .attr('y', function (d) { return _this.compareView.nativeElement.scrollHeight - 20 - (_this.elementPadding - _this.iconWidth); })
            .attr('width', scale.bandwidth())
            .attr('height', this.elementPadding)
            .classed(classed, true)
            .classed('jointSelected', function (d) {
            if (_this.shiftNodeHistory && _this.shiftNodeHistory.length > 0)
                return _this.shiftNodeHistory.map(function (node) { return node.id; }).includes(d.id) &&
                    _this.nodeHistory.map(function (node) { return node.id; }).includes(d.id);
            else
                return _this.nodeHistory.map(function (node) { return node.id; }).includes(d.id);
        });
        //TODO: links with mouseover
        // this.sankeyDiag().links.forEach((link: any) => {
        // })
        if (scale.step() > this.iconWidth) {
            element.selectAll("foreignObject")
                .data(history).enter()
                .append("svg:foreignObject")
                .attr('x', function (d) {
                if (d.depth > 0) {
                    if (inverted)
                        return d3__WEBPACK_IMPORTED_MODULE_2__["interpolate"](scale(d.depth), scale(d.depth) + scale.step())(.5);
                    return d3__WEBPACK_IMPORTED_MODULE_2__["interpolate"](scale(d.depth), scale(d.depth) - scale.step())(.5);
                }
                if (inverted)
                    return scale(0) + _this.iconWidth / 4 + scale.bandwidth();
            })
                .attr('y', function (d) { return _this.compareView.nativeElement.scrollHeight - 20 - _this.elementPadding / 2; })
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
                .attr('font-family', 'Font Awesome 5 Free')
                .attr('fill', 'black')
                .attr('font-weight', 900)
                .attr('overflow', 'visible')
                .attr('height', this.iconWidth)
                .attr('width', this.iconWidth)
                .style('padding-left', '0px')
                .html(function (data) {
                if (data.value)
                    return '<i class="fa fa-1x ' + _icon_codes_json__WEBPACK_IMPORTED_MODULE_3__[data.value["prov:label"]] + '"></i>';
                return '<i class="fa fa-1x fa-chart-bar"></i>';
            });
        }
    };
    QualityProvenanceVisComponent.prototype.linkShiftViews = function () {
        var _this = this;
        var linkGroup = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView")
            .append("g").classed("selectionLinks", true);
        d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("#comparisonView")
            .selectAll("g.compareA rect.hist" + this.histId)
            .each(function (d, i, arr) {
            // d3.select(arr[i]).classed();
            var rect0 = d3__WEBPACK_IMPORTED_MODULE_2__["select"](arr[i]);
            var rect1 = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView g.compareB g." +
                d.data.metric.replace("quality:", "") + "." +
                d.data.column.replace("column:", "") +
                " rect.hist" + _this.shiftHistId);
            var x0 = parseInt(rect0.attr("x")) + parseInt(rect0.attr("width"));
            var x1 = parseInt(rect1.attr("x"));
            var y0 = parseInt(rect0.attr("y"));
            var y1 = parseInt(rect1.attr("y"));
            var h0 = parseInt(rect0.attr("height"));
            var h1 = parseInt(rect1.attr("height"));
            linkGroup.append("g")
                .classed(d.data.metric.replace("quality:", ""), true)
                .classed(d.data.column.replace("column:", ""), true)
                .attr("fill", _this.determineColor(d.data.metric.replace("quality:", "")))
                .attr("stroke", _this.determineStrokeColor(d.data.metric.replace("quality:", "")))
                .attr("fill-opacity", .4)
                .classed("metric-link", true)
                .append("path")
                .attr("d", _this.linkRect(x0, x1, y0, y1, h0, h1))
                .attr("stroke-width", "2px");
        });
        d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("#comparisonView")
            .selectAll("g.compareA rect.hist" + this.histId)
            .on("mouseover", function (d) {
        });
    };
    QualityProvenanceVisComponent.prototype.scaleComparison = function () {
        var _this = this;
        var histories = this.nodeHistory.map(function (hist) { return hist.depth; });
        var rate = 1;
        d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("g").remove();
        this.sankeyDiag().nodes.forEach(function (node) {
            var hist = _this.nodeHistory.find(function (hist) { return hist.id === parseInt(node.key.replace("history_entry:", "")); });
            if (hist)
                hist.depth = node.depth;
            if (_this.shiftNodeHistory && _this.shiftNodeHistory.length > 0) {
                hist = _this.shiftNodeHistory.find(function (hist) { return hist.id === parseInt(node.key.replace("history_entry:", "")); });
                if (hist)
                    hist.depth = node.depth;
            }
        });
        // let ratioScale = d3.scaleLinear().domain([0, 1]).range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()]);
        if (this.shiftNodeHistory && this.shiftNodeHistory.length > 0) {
            var shiftNodeHistoryReversed = [];
            shiftNodeHistoryReversed = shiftNodeHistoryReversed.concat(this.shiftNodeHistory);
            shiftNodeHistoryReversed.reverse();
            var shiftHistories = shiftNodeHistoryReversed.map(function (hist) { return hist.depth; });
            // this scale determines how much space is available for both quality views
            rate = histories.length / (histories.length + shiftHistories.length);
            // d3.scaleLinear().domain(historyArray).range([35, parseFloat(this.compareView.nativeElement.scrollWidth) - this.nodeWidth - 15]);
            var compareWidth = this.compareView.nativeElement.scrollWidth;
            var detailWidth = 0;
            if (this.showDetail)
                detailWidth = this.detailViewWidth / 2;
            var compareA = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("g").classed("compareA", true);
            var scaleA = d3__WEBPACK_IMPORTED_MODULE_2__["scaleBand"]().domain(histories)
                .range([this.elementPadding, compareWidth / 2 - detailWidth])
                .paddingInner(this.innerPadding);
            this.renderQualityView(this.nodeHistory, scaleA, compareA, false);
            var inverted = true;
            var compareB = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("g").classed("compareB", true);
            // let compareShiftHistoryScale = d3.scaleBand().domain(shiftHistories)
            // .range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()])
            // .paddingInner(this.innerPadding)
            var scaleB = d3__WEBPACK_IMPORTED_MODULE_2__["scaleBand"]().domain(shiftHistories)
                .range([this.elementPadding + compareWidth / 2 + detailWidth, compareWidth - this.elementPadding])
                .paddingInner(this.innerPadding);
            this.renderQualityView(this.shiftNodeHistory, scaleB, compareB, inverted);
            this.issueViewOffset = this.elementPadding + compareWidth / 2 - detailWidth;
            this.renderIssueSelectionView();
            this.renderHistoryLinks(d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("g").classed("iconsA", true).classed("icons", true), this.nodeHistory, scaleA, 'selected', false);
            this.renderHistoryLinks(d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("g").classed("iconsB", true).classed("icons", true), shiftNodeHistoryReversed, scaleB, 'shiftSelected', inverted);
            if (!this.showDetail) {
                this.linkShiftViews();
                var lineGenerator = d3__WEBPACK_IMPORTED_MODULE_2__["line"]();
                var path = lineGenerator([[this.elementPadding / 2 + compareWidth / 2 + detailWidth, 0], [this.elementPadding / 2 + compareWidth / 2 + detailWidth, this.compareView.nativeElement.scrollHeight]]);
                // lineGenerator.context(d3.select("#comparisonView"));
                d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("path")
                    .classed("separator", true)
                    .attr("d", path)
                    .attr("stroke", "gray")
                    .attr("stroke-width", "2px");
            }
            else {
                d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView g.selectionLinks").remove();
                d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("path.separator").remove();
            }
        }
        else {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").selectAll("path").remove();
            var compareA = d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("g").classed("compareA", true);
            // let compareHistoryScale = d3.scaleBand().domain(histories)
            //   .range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()])
            //   .paddingInner(this.innerPadding);
            this.renderQualityView(this.nodeHistory, this.scaleHistory, compareA, false);
            this.renderHistoryLinks(d3__WEBPACK_IMPORTED_MODULE_2__["select"]("#comparisonView").append("g").classed("icons", true), this.nodeHistory, this.scaleHistory, 'selected', false);
            this.issueViewOffset = this.elementPadding + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
            this.renderIssueSelectionView();
        }
    };
    QualityProvenanceVisComponent.prototype.linkIssues = function (historyNodes) {
        if (historyNodes.length > 1) {
            for (var i = 1; i < historyNodes.length; ++i) {
                var hist0 = historyNodes[i - 1];
                var hist1 = historyNodes[i];
            }
        }
        else {
            return [];
        }
    };
    QualityProvenanceVisComponent.prototype.linkRect = function (x0, x1, y0, y1, height0, height1) {
        var curvature = .6;
        var xi = d3__WEBPACK_IMPORTED_MODULE_2__["interpolateNumber"](x0, x1), x2 = xi(curvature), x3 = xi(1 - curvature);
        // y0 = yFunction(d.from[0]),
        // y1 = yFunction(d.to[0]);
        return "M" + x0 + "," + y0
            // + "C" + x2 + "," + y0
            // + " " + x3 + "," + y1
            + " " + x1 + "," + y1
            + "L" + x1 + "," + (y1 + height1)
            // + "C" + x3 + "," + (y1+ height1)
            // + " " + x2 + "," + (y0+ height0)
            + " " + x0 + "," + (y0 + height0)
            + "L" + x0 + "," + y0;
        // }
        // return null;
    };
    QualityProvenanceVisComponent.prototype.linkSkewed = function (d, yFunction, x0, x1) {
        var curvature = .6;
        var xi = d3__WEBPACK_IMPORTED_MODULE_2__["interpolateNumber"](x0, x1), x2 = xi(curvature), x3 = xi(1 - curvature), y0 = yFunction(d.from[0]), y1 = yFunction(d.to[0]);
        return "M" + x0 + "," + y0
            + "C" + x2 + "," + y0
            + " " + x3 + "," + y1
            + " " + x1 + "," + y1
            + "L" + x1 + "," + (y1 + yFunction(d.to[1]) - yFunction(d.to[0]))
            + "C" + x3 + "," + (y1 + yFunction(d.to[1]) - yFunction(d.to[0]))
            + " " + x2 + "," + (y0 + yFunction(d.from[1]) - yFunction(d.from[0]))
            + " " + x0 + "," + (y0 + yFunction(d.from[1]) - yFunction(d.from[0]))
            + "L" + x0 + "," + y0;
        // }
        // return null;
    };
    QualityProvenanceVisComponent.prototype.initializeColorScale = function () {
        this.metricsColorScale = d3__WEBPACK_IMPORTED_MODULE_2__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_2__["interpolateViridis"]).domain([-1, this.uniqueMetrics.length + 1]);
        this.greyMetricsColorScale = d3__WEBPACK_IMPORTED_MODULE_2__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_2__["interpolateGreys"]).domain([-1, this.uniqueMetrics.length + 1]);
    };
    QualityProvenanceVisComponent.prototype.determineColor = function (metric) {
        return d3__WEBPACK_IMPORTED_MODULE_2__["color"](this.metricsColorScale(this.uniqueMetrics.indexOf(metric))); //d.key.metric.replace("quality:", "")
    };
    QualityProvenanceVisComponent.prototype.determineGreyColor = function (metric) {
        return d3__WEBPACK_IMPORTED_MODULE_2__["color"](this.greyMetricsColorScale(this.uniqueMetrics.indexOf(metric))); //d.key.metric.replace("quality:", "")
    };
    QualityProvenanceVisComponent.prototype.determineStrokeColor = function (metric) {
        return d3__WEBPACK_IMPORTED_MODULE_2__["color"](this.metricsColorScale(this.uniqueMetrics.indexOf(metric))).brighter(.75); //d.key.metric.replace("quality:", "")
    };
    QualityProvenanceVisComponent.prototype.numericSort = function (a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "pageWidth", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "componentHeight", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"])
    ], QualityProvenanceVisComponent.prototype, "openRefineService", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "projectId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], QualityProvenanceVisComponent.prototype, "histId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], QualityProvenanceVisComponent.prototype, "shiftHistId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], QualityProvenanceVisComponent.prototype, "nodeHistory", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], QualityProvenanceVisComponent.prototype, "shiftNodeHistory", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityProvenanceVisComponent.prototype, "scaleHistory", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "nodeWidth", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityProvenanceVisComponent.prototype, "sankeyDiag", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "qualityViewWidth", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "detailViewWidth", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], QualityProvenanceVisComponent.prototype, "showDetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], QualityProvenanceVisComponent.prototype, "loadFinished", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('qualityComparison', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QualityProvenanceVisComponent.prototype, "compareView", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('issueView', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], QualityProvenanceVisComponent.prototype, "content", null);
    QualityProvenanceVisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-quality-provenance-vis',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! raw-loader!./quality-provenance-vis.component.html */ "./node_modules/raw-loader/index.js!./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.html"),
            styles: [__webpack_require__(/*! ../refine-provenance-explorer.component.scss */ "./src/app/refine-provenance-explorer/refine-provenance-explorer.component.scss"), __webpack_require__(/*! ./quality-provenance-vis.component.scss */ "./src/app/refine-provenance-explorer/quality-provenance-vis/quality-provenance-vis.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], QualityProvenanceVisComponent);
    return QualityProvenanceVisComponent;
}());



/***/ }),

/***/ "./src/app/refine-provenance-explorer/refine-provenance-explorer.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/refine-provenance-explorer/refine-provenance-explorer.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.d3tooltip {\n  position: absolute;\n  text-align: center;\n  width: 160px;\n  padding: 4px;\n  font: 13px sans-serif;\n  background: lightsteelblue;\n  border: 2px;\n  border-color: gray;\n  border-radius: 8px;\n  pointer-events: none;\n  overflow: visible; }\n\nrect.selected {\n  stroke: gray;\n  fill: #ffffbf;\n  stroke-width: 2px; }\n\nrect.selectedPath {\n  stroke: gray;\n  fill: #fc8d59;\n  stroke-width: 2px; }\n\nrect.shiftSelectedPath {\n  stroke: gray;\n  fill: #91bfdb;\n  stroke-width: 2px; }\n\nrect.selectedPath.shiftSelectedPath {\n  stroke: gray;\n  fill: #ffffbf;\n  stroke-width: 2px; }\n\nrect.selectedNode {\n  stroke: gray;\n  stroke-width: 4px; }\n\nrect.shiftSelectedNode {\n  stroke: gray;\n  stroke-width: 4px; }\n\ng.icons rect.selected {\n  fill: #fc8d59;\n  stroke: gray;\n  stroke-width: 2px; }\n\ng.icons rect.shiftSelected {\n  fill: #91bfdb;\n  stroke: gray;\n  stroke-width: 2px; }\n\ng.icons rect.jointSelected {\n  fill: #ffffbf;\n  stroke: gray;\n  stroke-width: 2px; }\n\ng.links foreignObject {\n  text-anchor: middle;\n  dominant-baseline: central;\n  font-family: Font Awesome 5 Free;\n  stroke: 2px;\n  fill: none;\n  white-space: nowrap;\n  font-weight: 900;\n  font-size: 1em;\n  overflow: visible; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvcmVmaW5lLXByb3ZlbmFuY2UtZXhwbG9yZXIvcmVmaW5lLXByb3ZlbmFuY2UtZXhwbG9yZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7RUFDSSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLDBCQUEwQjtFQUMxQixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsaUJBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksWUFBWTtFQUNaLGFBbEJ5QjtFQW1CekIsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksWUFBWTtFQUNaLGFBMUJvQjtFQTJCcEIsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksWUFBWTtFQUNaLGFBL0IwQjtFQWdDMUIsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksWUFBWTtFQUNaLGFBcEN5QjtFQXFDekIsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksWUFBWTtFQUNaLGlCQUFpQixFQUFBOztBQUdyQjtFQUNJLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxhQXJEb0I7RUFzRHBCLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxhQTFEMEI7RUEyRDFCLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxhQS9EeUI7RUFnRXpCLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLGdDQUFnQztFQUNoQyxXQUFXO0VBQ1gsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGlCQUFpQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcmVmaW5lLXByb3ZlbmFuY2UtZXhwbG9yZXIvcmVmaW5lLXByb3ZlbmFuY2UtZXhwbG9yZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkc2VsZWN0ZWQtY29sb3I6ICNmYzhkNTk7XG4kc2hpZnQtc2VsZWN0ZWQtY29sb3I6ICM5MWJmZGI7XG4kYm90aC1zZWxlY3RlZC1jb2xvcjogI2ZmZmZiZjtcblxuZGl2LmQzdG9vbHRpcCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTYwcHg7XG4gICAgcGFkZGluZzogNHB4O1xuICAgIGZvbnQ6IDEzcHggc2Fucy1zZXJpZjtcbiAgICBiYWNrZ3JvdW5kOiBsaWdodHN0ZWVsYmx1ZTtcbiAgICBib3JkZXI6IDJweDtcbiAgICBib3JkZXItY29sb3I6IGdyYXk7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG92ZXJmbG93OnZpc2libGU7XG59XG5cbnJlY3Quc2VsZWN0ZWQge1xuICAgIHN0cm9rZTogZ3JheTtcbiAgICBmaWxsOiAkYm90aC1zZWxlY3RlZC1jb2xvcjtcbiAgICBzdHJva2Utd2lkdGg6IDJweDtcbn1cblxucmVjdC5zZWxlY3RlZFBhdGgge1xuICAgIHN0cm9rZTogZ3JheTtcbiAgICBmaWxsOiAkc2VsZWN0ZWQtY29sb3I7XG4gICAgc3Ryb2tlLXdpZHRoOiAycHg7XG59XG5cbnJlY3Quc2hpZnRTZWxlY3RlZFBhdGgge1xuICAgIHN0cm9rZTogZ3JheTtcbiAgICBmaWxsOiAkc2hpZnQtc2VsZWN0ZWQtY29sb3I7XG4gICAgc3Ryb2tlLXdpZHRoOiAycHg7XG59XG5cbnJlY3Quc2VsZWN0ZWRQYXRoLnNoaWZ0U2VsZWN0ZWRQYXRoIHtcbiAgICBzdHJva2U6IGdyYXk7XG4gICAgZmlsbDogJGJvdGgtc2VsZWN0ZWQtY29sb3I7XG4gICAgc3Ryb2tlLXdpZHRoOiAycHg7XG59XG5cbnJlY3Quc2VsZWN0ZWROb2RlIHtcbiAgICBzdHJva2U6IGdyYXk7XG4gICAgc3Ryb2tlLXdpZHRoOiA0cHg7XG59XG5cbnJlY3Quc2hpZnRTZWxlY3RlZE5vZGUge1xuICAgIHN0cm9rZTogZ3JheTtcbiAgICBzdHJva2Utd2lkdGg6IDRweDtcbn1cblxuZy5pY29ucyByZWN0LnNlbGVjdGVkIHtcbiAgICBmaWxsOiAkc2VsZWN0ZWQtY29sb3I7XG4gICAgc3Ryb2tlOiBncmF5O1xuICAgIHN0cm9rZS13aWR0aDogMnB4O1xufVxuXG5nLmljb25zIHJlY3Quc2hpZnRTZWxlY3RlZCB7XG4gICAgZmlsbDogJHNoaWZ0LXNlbGVjdGVkLWNvbG9yO1xuICAgIHN0cm9rZTogZ3JheTtcbiAgICBzdHJva2Utd2lkdGg6IDJweDtcbn1cblxuZy5pY29ucyByZWN0LmpvaW50U2VsZWN0ZWQge1xuICAgIGZpbGw6ICRib3RoLXNlbGVjdGVkLWNvbG9yO1xuICAgIHN0cm9rZTogZ3JheTtcbiAgICBzdHJva2Utd2lkdGg6IDJweDtcbn1cblxuZy5saW5rcyBmb3JlaWduT2JqZWN0IHtcbiAgICB0ZXh0LWFuY2hvcjogbWlkZGxlO1xuICAgIGRvbWluYW50LWJhc2VsaW5lOiBjZW50cmFsO1xuICAgIGZvbnQtZmFtaWx5OiBGb250IEF3ZXNvbWUgNSBGcmVlO1xuICAgIHN0cm9rZTogMnB4O1xuICAgIGZpbGw6IG5vbmU7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBmb250LXdlaWdodDogOTAwO1xuICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/refine-provenance-explorer/refine-provenance-explorer.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/refine-provenance-explorer/refine-provenance-explorer.component.ts ***!
  \************************************************************************************/
/*! exports provided: RefineProvenanceExplorerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefineProvenanceExplorerComponent", function() { return RefineProvenanceExplorerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var ngx_contextmenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-contextmenu */ "./node_modules/ngx-contextmenu/fesm5/ngx-contextmenu.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _d3_sankey_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./d3-sankey.js */ "./src/app/refine-provenance-explorer/d3-sankey.js");
/* harmony import */ var _d3_sankey_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_d3_sankey_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _icon_codes_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icon-codes.json */ "./src/app/refine-provenance-explorer/icon-codes.json");
var _icon_codes_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./icon-codes.json */ "./src/app/refine-provenance-explorer/icon-codes.json", 1);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RefineProvenanceExplorerComponent = /** @class */ (function () {
    function RefineProvenanceExplorerComponent(route, router, openRefineService, contextMenuService, domSanitizer) {
        this.route = route;
        this.router = router;
        this.openRefineService = openRefineService;
        this.contextMenuService = contextMenuService;
        this.domSanitizer = domSanitizer;
        this.loadFinished = false;
        // percentage widths
        this.pageWidth = 100;
        this.provWidth = 100;
        this.detailWidth = 25;
        this.detailHeight = 45;
        this.sankeyHeight = 55;
        this.refineHeight = 35;
        // absolute widths
        this.qualityViewWidth = 0;
        this.detailViewWidth = 0;
        this.nodeWidth = 36;
        this.iconWidth = 16;
        this.elementPadding = 35;
        this.innerPadding = .8;
        this.showDetail = true;
        this.metricColorScale = ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'];
    }
    RefineProvenanceExplorerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transition = d3__WEBPACK_IMPORTED_MODULE_5__["transition"]()
            .duration(1000)
            .ease(d3__WEBPACK_IMPORTED_MODULE_5__["easeLinear"]);
        this.projectId = this.route.snapshot.paramMap.get('projectId');
        this.getOpenRefineProject();
        this.refineProjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:3333/project?project=" + this.projectId);
        this.openRefineService.getProjectMetadata(this.projectId)
            .subscribe(function (projectMetadata) { return _this.projectMetadata = projectMetadata; }, function (error) { return _this.errorMessage = error; });
    };
    RefineProvenanceExplorerComponent.prototype.getOpenRefineProject = function () {
        var _this = this;
        var iconPadding = 8;
        var nodePadding = iconPadding * 2 + this.iconWidth;
        this.openRefineService.getRefineProject(this.projectId)
            .subscribe(function (openRefineProject) {
            _this.openRefineProject = openRefineProject;
            _this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];
            if (_this.provenanceOverlayModel && _this.provGraph) {
                var graph_1 = _this.buildGraph(_this.provenanceOverlayModel);
                _this.histId = _this.provenanceOverlayModel.currentHistoryEntry.localPart;
                _this.openRefineService.getHistory(_this.projectId)
                    .subscribe(function (history) {
                    _this.nodeHistory = [];
                    _this.nodeHistory.push({ id: 0, value: _this.provenanceOverlayModel.provenance.entity["history_entry:0"] });
                    for (var _i = 0, _a = history.past; _i < _a.length; _i++) {
                        var pastEntry = _a[_i];
                        _this.nodeHistory.push({ id: pastEntry.id, value: _this.provenanceOverlayModel.provenance.entity["history_entry:" + pastEntry.id] });
                    }
                    _this.highlightProvGraph(_this.nodeHistory, "selectedPath");
                    // this.scaleHistory = d3.scaleBand().domain(this.nodeHistory).range([35, parseFloat(this.provGraph.nativeElement.scrollWidth) - 15]).padding(0.8);        
                    var ops = [];
                    Object.entries(_this.provenanceOverlayModel.provenance.activity).forEach(function (act) {
                        if (act[0].includes("change:") && !ops.includes(act[1]["prov:label"]))
                            ops.push(act[1]["prov:label"]);
                    });
                    // first lets create the sankey
                    _this.sankeyDiag = _d3_sankey_js__WEBPACK_IMPORTED_MODULE_6__["sankey"]()
                        // .nodeWidth(this.nodeWidth)
                        .nodePadding(nodePadding)
                        .extent([[0, 5], [_this.provGraph.nativeElement.scrollWidth - 5, _this.provGraph.nativeElement.scrollHeight - (_this.iconWidth + nodePadding)]])
                        .nodeAlign(_d3_sankey_js__WEBPACK_IMPORTED_MODULE_6__["sankeyLeft"]);
                    _this.sankeyDiag.nodes(graph_1.nodes)
                        .links(graph_1.links)
                        .nodeId(function (node) { return node.key; });
                    _this.setSankeyScale();
                    _this.sankeyLinks = d3__WEBPACK_IMPORTED_MODULE_5__["select"]("svg.provGraph").append("g")
                        // .attr("fill", "none")
                        .attr("stroke-opacity", 0.25)
                        .classed("links", true)
                        .selectAll("g")
                        .data(_this.sankeyDiag().links)
                        .enter().append("g");
                    // Define the div for the tooltip
                    var div = d3__WEBPACK_IMPORTED_MODULE_5__["select"]("body").append("div")
                        .attr("class", "d3tooltip")
                        .style("opacity", 0);
                    var divChange = d3__WEBPACK_IMPORTED_MODULE_5__["select"]("body").append("div")
                        .classed("d3tooltip", true)
                        .style("opacity", 0);
                    _this.sankeyLinks.append("path")
                        .attr("d", function (d) { return _this.linkSkewed(d); })
                        .attr("class", function (d) {
                        return "activity" + d.target.key.replace("history_entry:", "");
                    })
                        .attr("fill", "lightgray")
                        // .attr("stroke", d => "grey")
                        // .attr("fill", d => {
                        //   if (d.wdf) {
                        //     let change = this.provenanceOverlayModel.provenance.activity[d.wdf["prov:activity"]];
                        //     return d3.schemeSet2[ops.indexOf(change["prov:label"])];//this.sankeyColorScale(ops.indexOf(col));
                        //   } 
                        //   return d3.schemePastel2[0];
                        // })
                        .attr("fill-opacity", function (d) {
                        // if(this.scaleHistory(d.source.depth))
                        return 0.35;
                        // return 0.2;
                    })
                        .attr("stroke", function (d) {
                        if (_this.nodeHistory.map(function (node) { return node.id; }).includes(parseInt(d.target.key.replace("history_entry:", ""))) ||
                            (_this.shiftNodeHistory && _this.shiftNodeHistory.map(function (node) { return node.id; }).includes(parseInt(d.target.key.replace("history_entry:", "")))))
                            return "gray";
                        else
                            return null;
                    })
                        .attr("stroke-width", 2);
                    _this.sankeyLinks.append("svg:foreignObject")
                        .classed("change", true)
                        .html(function (d) {
                        var change = _this.provenanceOverlayModel.provenance.activity[d.wdf["prov:activity"]];
                        var htmlText = "<span>";
                        // if (d.source.sourceLinks && d.source.sourceLinks.length === 1) {
                        htmlText += '<i class="fa fa-1x ' + _icon_codes_json__WEBPACK_IMPORTED_MODULE_7__[change["prov:label"]] + '"></i></span>'; //iconCodes.default[d.entity["prov:label"]]
                        return htmlText;
                        // } else {
                        //   // remove all other 
                        //   return '<i class="fa fa-1x fa-ellipsis-v"></i>';
                        // }
                    })
                        .attr('x', function (d) {
                        if (_this.scaleHistory(d.source.depth) && _this.scaleHistory(d.target.depth))
                            return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleHistory(d.target.depth))(.85) - _this.nodeWidth / 4;
                        else if (_this.scaleHistory(d.source.depth) && _this.scaleFuture(d.target.depth))
                            return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleFuture(d.target.depth))(.85) - _this.nodeWidth / 4;
                        else if (_this.scaleFuture(d.source.depth))
                            return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleFuture(d.source.depth) + _this.scaleFuture.bandwidth(), _this.scaleFuture(d.target.depth))(.85) - _this.nodeWidth / 4;
                    })
                        .attr('y', function (d) {
                        // if (d3.interpolate(d.target.y1, d.target.y0)(.5) > d.target.y1)
                        return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](d.target.y1, d.target.y0)(.5) - _this.nodeWidth / 4;
                        // return 0;
                    })
                        .on("mouseover", function (data) {
                        var ent = _this.provenanceOverlayModel.provenance.entity[data.wdf["prov:generatedEntity"]];
                        var text = "<span><b>Operation:</b> " + ent["prov:value"].$ + "</span>";
                        divChange.html(text)
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                        divChange.transition()
                            .duration(100)
                            .style("opacity", .9);
                        div.style("opacity", 0);
                    })
                        .on("mousemove", function (data) {
                        divChange
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                    })
                        .on("mouseout", function (data) {
                        divChange.transition()
                            .duration(100)
                            .style("opacity", 0);
                        div.style("opacity", 0);
                    });
                    // these are the facets
                    _this.sankeyLinks.filter(function (link) { return _this.provenanceOverlayModel.provenance.activity["facet:" + link.target.key.replace("history_entry:", "")]; }).append("svg:foreignObject")
                        .classed("facet", true)
                        .attr('x', function (d) {
                        if (_this.scaleHistory(d.source.depth) && _this.scaleHistory(d.target.depth))
                            return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleHistory(d.target.depth))(.5) - _this.nodeWidth / 4;
                        else if (_this.scaleHistory(d.source.depth) && _this.scaleFuture(d.target.depth))
                            return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleFuture(d.target.depth))(.5) - _this.nodeWidth / 4;
                        else if (_this.scaleFuture(d.source.depth))
                            return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleFuture(d.source.depth) + _this.scaleFuture.bandwidth(), _this.scaleFuture(d.target.depth))(.5) - _this.nodeWidth / 4;
                    })
                        .attr('y', function (d) {
                        return d.source.y1;
                    })
                        .html(function (d) { return '<i class="fa fa-1x fa-filter"></i> '; })
                        .on("mouseover", function (data) {
                        var id = data.target.key.replace("history_entry:", "");
                        var facet = [].concat(_this.provenanceOverlayModel.provenance.activity["facet:" + id]);
                        if (facet) { }
                        var text = [];
                        var htmlText = "";
                        for (var _i = 0, facet_1 = facet; _i < facet_1.length; _i++) {
                            var f = facet_1[_i];
                            text = text.concat(Object.entries(f)
                                .map(function (d) {
                                if (d[0].includes("facet:_")) {
                                    if (d[1].$ == "true") {
                                        return d[0].replace("facet:_", "");
                                    }
                                    else if (d[1].$ == "false") {
                                        // do nothing
                                    }
                                    else {
                                        return d[0].replace("facet:_", "") + ": " + d[1].$;
                                    }
                                }
                                if (d[0].includes("facet:")) {
                                    if (d[1].$ == "true") {
                                        return d[0].replace("facet:", "");
                                    }
                                    else if (d[1].$ == "false") {
                                        // do nothing
                                    }
                                    else {
                                        return d[0].replace("facet:", "") + ": " + d[1].$;
                                    }
                                    // return d[0].replace("facet:", "") + ": " + d[1].$
                                }
                            }).filter(function (d) { return d != null; }));
                            div.transition()
                                .duration(100)
                                .style("opacity", .9);
                            htmlText += "<span><b>Filter " + f["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>";
                        }
                        // if(facet["other:" + id]) {
                        div.html(htmlText) //"<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                        // }
                        divChange.style("opacity", 0);
                        return text;
                    })
                        .on("mousemove", function (data) {
                        div
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                    })
                        .on("mouseout", function (d, i, el) {
                        div.transition()
                            // .duration(100)
                            .style("opacity", 0);
                    });
                    _this.sankeyLinks.selectAll("path").on("mouseover", function (data, i, el) {
                        var id = data.target.key.replace("history_entry:", "");
                        d3__WEBPACK_IMPORTED_MODULE_5__["select"](el[i].parentNode).raise();
                        var change = _this.provenanceOverlayModel.provenance.entity[data.wdf["prov:generatedEntity"]];
                        var text = "<span><b>Operation:</b> " + change["prov:value"].$ + "</span>";
                        divChange.html(text)
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px")
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px");
                        divChange.transition()
                            .duration(100)
                            .style("opacity", .9);
                        if (_this.provenanceOverlayModel.provenance.activity["facet:" + id]) {
                            // let facet = this.provenanceOverlayModel.provenance.activity["facet:" + id];
                            var htmlText = "";
                            var textFacet = [];
                            var facet = [].concat(_this.provenanceOverlayModel.provenance.activity["facet:" + id]);
                            for (var _i = 0, facet_2 = facet; _i < facet_2.length; _i++) {
                                var f = facet_2[_i];
                                textFacet = textFacet.concat(Object.entries(f)
                                    .map(function (d) {
                                    if (d[0].includes("facet:_")) {
                                        if (d[1].$ == "true") {
                                            return d[0].replace("facet:_", "");
                                        }
                                        else if (d[1].$ == "false") {
                                            // do nothing
                                        }
                                        else {
                                            return d[0].replace("facet:_", "") + ": " + d[1].$;
                                        }
                                    }
                                    if (d[0].includes("facet:")) {
                                        if (d[1].$ == "true") {
                                            return d[0].replace("facet:", "");
                                        }
                                        else if (d[1].$ == "false") {
                                            // do nothing
                                        }
                                        else {
                                            return d[0].replace("facet:", "") + ": " + d[1].$;
                                        }
                                        // return d[0].replace("facet:", "") + ": " + d[1].$
                                    }
                                }).filter(function (d) { return d != null; }));
                                div.transition()
                                    .duration(100)
                                    .style("opacity", .9);
                                htmlText += "<span><b>Filter " + f["other:" + id].$ + " rows</b></span><br><span>" + textFacet.join("<br>") + "</span>";
                            }
                            div.html(htmlText) //"<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                                .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                                .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                            // let text = Object.entries(facet)
                            //   .map((d:any) => { 
                            //     if (d[0].includes("facet:_"))
                            //       return d[0].replace("facet:_", "") + ": <i>" + d[1].$.split(",").join("<br>") + "</i>";
                            //     if (d[0].includes("facet:"))
                            //       return d[0].replace("facet:", "") + ": " + d[1].$.split(",").join("<br>") + "</i>";
                            //   }).filter(d => d != null);
                            // // "test test test".split(",").join()
                            // if(facet["other:" + id]) {
                            //   div.html("<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                            //     .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                            //     .style("top", (d3.event.pageY - 28 - div.node().scrollHeight) + "px");
                            // }
                            div.transition()
                                .duration(100)
                                .style("opacity", .9);
                            return text;
                        }
                    })
                        .on("mousemove", function (data) {
                        div
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28 - div.node().scrollHeight) + "px");
                        divChange
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX - div.node().scrollWidth) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                    })
                        .on("mouseout", function (d, i, el) {
                        div.transition()
                            // .duration(100)
                            .style("opacity", 0);
                        divChange.transition()
                            // .duration(100)
                            .style("opacity", 0);
                    });
                    // -1 prevents drawing of color white
                    _this.sankeyColorScale = d3__WEBPACK_IMPORTED_MODULE_5__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_5__["interpolateBlues"]).domain([-1, ops.length]);
                    // let scale = d3.scaleOrdinal(d3.schemeCategory10).domain(ops);
                    var cols = {};
                    for (var _b = 0, _c = Object.keys(_this.provenanceOverlayModel.provenance.entity); _b < _c.length; _b++) {
                        var k = _c[_b];
                        if (k.includes("column:"))
                            cols[k] = _this.provenanceOverlayModel.provenance.entity[k];
                    }
                    _this.sankeyNodes = d3__WEBPACK_IMPORTED_MODULE_5__["select"]("svg.provGraph").append("g")
                        .classed("nodes", true)
                        // .attr("stroke", "#000")
                        .selectAll(".history_nodes")
                        .data(_this.sankeyDiag().nodes)
                        .enter().append("g")
                        .attr("class", "history_nodes");
                    _this.sankeyNodes.append("rect")
                        .attr("id", function (data) {
                        return data.key.replace(":", "");
                    })
                        .attr("x", function (d) {
                        if (_this.scaleHistory(d.depth))
                            return _this.scaleHistory(d.depth);
                        else
                            return _this.scaleFuture(d.depth);
                    })
                        .attr("y", function (data) { return data.y0; })
                        .attr("height", function (data) {
                        return data.y1 - data.y0;
                    })
                        .attr("width", function (d) {
                        if (_this.scaleHistory(d.depth)) {
                            if (d.activity)
                                return _this.scaleHistory.bandwidth() / 2;
                            return _this.scaleHistory.bandwidth();
                        }
                        return _this.scaleFuture.bandwidth();
                    })
                        .attr("stroke", "none")
                        .attr("fill", function (d) {
                        return "lightgray";
                    });
                    _this.sankeyNodes.on("mouseover", function (data) {
                        div.transition()
                            .duration(100)
                            .style("opacity", .9);
                        // let id = data.key.replace("history_entry:","")
                        var datasetRows = _this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + data.key.replace("history_entry:", "")];
                        // if (data.entity) {
                        div.html("<span>Rows: " + datasetRows.$ + "</span>")
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                    })
                        .on("mousemove", function (data) {
                        div
                            .style("left", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageX) + "px")
                            .style("top", (d3__WEBPACK_IMPORTED_MODULE_5__["event"].pageY - 28) + "px");
                    })
                        .on("mouseout", function (d) {
                        div.transition()
                            .duration(100)
                            .style("opacity", 0);
                    })
                        .on("click", function (data, index, entries) {
                        if (data.entity) {
                            var histIdClicked = data.key.replace("history_entry:", "");
                            if (d3__WEBPACK_IMPORTED_MODULE_5__["event"].shiftKey) {
                                _this.shiftHistId = histIdClicked;
                                // we need to remove the previously shift selected path
                                _this.clearProvGraphHighlights();
                                _this.shiftNodeHistory = _this.determineNodeHistory(histIdClicked);
                                _this.setSankeyScale();
                                _this.highlightProvGraph(_this.nodeHistory, "selectedPath");
                                _this.highlightProvGraph(_this.shiftNodeHistory, "shiftSelectedPath");
                                d3__WEBPACK_IMPORTED_MODULE_5__["select"]("svg.provGraph g.nodes").select("rect#history_entry" + histIdClicked)
                                    .classed("shiftSelectedNode", true);
                            }
                            else {
                                _this.shiftHistId = null;
                                _this.histId = histIdClicked;
                                _this.clearProvGraphHighlights();
                                _this.shiftNodeHistory = [];
                                _this.nodeHistory = _this.determineNodeHistory(histIdClicked);
                                _this.setSankeyScale();
                                _this.highlightProvGraph(_this.nodeHistory, "selected");
                                d3__WEBPACK_IMPORTED_MODULE_5__["select"]("svg.provGraph g.nodes").select("rect#history_entry" + histIdClicked)
                                    .classed("selectedNode", true);
                            }
                        }
                    });
                    _this.highlightProvGraph(_this.nodeHistory, "selected");
                    _this.loadFinished = true;
                });
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    RefineProvenanceExplorerComponent.prototype.buildGraph = function (provenanceOverlayModel) {
        var links = [];
        // nodes are the history entries, stored as entities
        var nodeEntries = Object.entries(provenanceOverlayModel.provenance.entity).filter(function (entity) { return entity[0].includes('history_entry'); });
        var _loop_1 = function (wdf) {
            var value = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter(function (wdf_filter) { return wdf_filter["prov:usedEntity"] === wdf["prov:usedEntity"]; }).length;
            var endValue = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter(function (wdf_filter) { return wdf_filter["prov:usedEntity"] === wdf["prov:generatedEntity"]; }).length;
            if (endValue == 0)
                value = 1;
            if (wdf["prov:usedEntity"] && !wdf["prov:generatedEntity"].includes("quality")) {
                links.push({
                    source: wdf["prov:usedEntity"],
                    target: wdf["prov:generatedEntity"],
                    // generated: provenanceOverlayModel.provenance.entity[wdf["prov:generatedEntity"]],
                    out: null,
                    in: null,
                    value: 1,
                    // depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
                    wdf: wdf
                });
            }
        };
        for (var _i = 0, _a = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom); _i < _a.length; _i++) {
            var wdf = _a[_i];
            _loop_1(wdf);
        }
        var cols = {};
        for (var _b = 0, _c = Object.keys(this.provenanceOverlayModel.provenance.entity); _b < _c.length; _b++) {
            var k = _c[_b];
            if (k.includes("column:"))
                cols[k] = this.provenanceOverlayModel.provenance.entity[k];
        }
        var nodes = [];
        var _loop_2 = function (entry) {
            var activityId = entry[0].replace("history_entry:", "");
            var colMetrics = {};
            var colNames = [];
            var mNames = [];
            Object.keys(cols).forEach(function (k) {
                var qEntry = cols[k]["quality:" + activityId];
                if (qEntry) {
                    colMetrics[k] = qEntry;
                    for (var _i = 0, qEntry_1 = qEntry; _i < qEntry_1.length; _i++) {
                        var m = qEntry_1[_i];
                        colNames.push({ col: k, metric: m.type });
                        if (!mNames.includes(m.type))
                            mNames.push(m.type);
                    }
                }
            });
            var rowSize = 0;
            var histInfo = this_1.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + entry[0].replace("history_entry:", "")];
            if (histInfo)
                rowSize = parseInt(histInfo.$);
            nodes.push({ key: entry[0], value: rowSize, entity: entry[1], depth: 2 });
        };
        var this_1 = this;
        for (var _d = 0, nodeEntries_1 = nodeEntries; _d < nodeEntries_1.length; _d++) {
            var entry = nodeEntries_1[_d];
            _loop_2(entry);
        }
        // for (let activity of Object.entries(this.provenanceOverlayModel.provenance.activity).filter((a: any) => a[0].includes("facet:"))) {
        //   let id = activity[0].replace("facet:", "");
        //   let rowSize = 0;
        //   if (activity[1]["other:"+id])
        //     rowSize = parseInt(activity[1]["other:"+id].$);
        //   nodes.push({
        //     key: activity[0],
        //     value: rowSize,
        //     activity: activity[1]
        //   })
        // }
        var graph = {
            nodes: nodes,
            links: links
        };
        return graph;
    };
    RefineProvenanceExplorerComponent.prototype.linkSkewed = function (d) {
        var curvature = .6;
        var id = parseInt(d.target.key.replace("history_entry:", ""));
        var facet = [].concat(this.provenanceOverlayModel.provenance.activity["facet:" + id]);
        // var x0 = d.source.x1,
        //     x1 = d.target.x0;
        var x0 = this.scaleHistory(d.source.depth) + this.scaleHistory.bandwidth(), x1 = this.scaleHistory(d.target.depth);
        if (this.scaleHistory(d.source.depth) && d.source.activity) {
            x0 -= (this.scaleHistory.bandwidth() / 2);
        }
        else if (this.scaleFuture(d.source.depth) && d.source.activity) {
            x0 -= (this.scaleFuture.bandwidth() / 2);
        }
        if (!x0)
            x0 = this.scaleFuture(d.source.depth) + this.scaleFuture.bandwidth();
        if (!x1)
            x1 = this.scaleFuture(d.target.depth);
        var xi = d3__WEBPACK_IMPORTED_MODULE_5__["interpolateNumber"](x0, x1), x2 = xi(curvature), x3 = xi(1 - curvature), y0 = d.source.y0, y1 = d.target.y0;
        var path = "M" + x0 + "," + y0;
        if (facet[0] && facet[0]["other:" + id]) {
            var heightRatio = parseInt(facet[0]["other:" + id].$) / d.source.value;
            path += "C" + xi(.2) + "," + y0
                + " " + xi(.3) + "," + (y0 + (d.source.y1 - d.source.y0) * (1 - heightRatio))
                + " " + xi(.5) + "," + (y0 + (d.source.y1 - d.source.y0) * (1 - heightRatio))
                + "L" + xi(.5) + "," + (y0 + (d.source.y1 - d.source.y0) * (1 - heightRatio))
                + "C" + xi(.7) + "," + (y0 + (d.source.y1 - d.source.y0) * (1 - heightRatio))
                + " " + xi(.8) + "," + y1
                + " " + x1 + "," + y1
                + "L" + x1 + "," + (y1 + (d.target.y1 - d.target.y0))
                + "C" + xi(.8) + "," + (y1 + (d.target.y1 - d.target.y0))
                + " " + xi(.7) + "," + (y0 + (d.source.y1 - d.source.y0))
                + " " + xi(.5) + "," + (y0 + (d.source.y1 - d.source.y0))
                + "L" + xi(.5) + "," + (y0 + (d.source.y1 - d.source.y0));
        }
        // if (facet) {
        //   // facet calculations
        //   let xMiddle = xi(.5);
        //   x2 = xi(curvature*.5),
        //   x3 = xi(1 - curvature*.5),
        //   // console.log((y1-y0)*(parseInt(facet["other:"+id].$)/d.source.value));
        //   // console.log((y1+(y1-y0)*(parseInt(facet["other:"+id].$)/d.source.value)));
        //   path += "C" + x2 + "," + y0
        //     + " " + xMiddle + "," + (y0+(d.source.y1-d.source.y0)*(parseInt(facet["other:"+id].$)/d.source.value)) //(x2 + this.scaleHistory.bandwidth()/2)
        //     + " " + x1 + "," + y1;
        // } else {
        else {
            path += "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1
                + "L" + x1 + "," + (y1 + (d.target.y1 - d.target.y0))
                + "C" + x3 + "," + (y1 + (d.target.y1 - d.target.y0))
                + " " + x2 + "," + (y0 + (d.source.y1 - d.source.y0))
                + " " + x0 + "," + (y0 + (d.source.y1 - d.source.y0))
                + "L" + x0 + "," + y0;
        }
        // }
        return path
            + " " + x0 + "," + (y0 + (d.source.y1 - d.source.y0))
            + "L" + x0 + "," + y0;
        // return "M" + x0 + "," + y0
        //      + "C" + x2 + "," + y0
        //      + " " + x3 + "," + y1
        //      + " " + x1 + "," + y1
        //      + "L" + x1 + "," + (y1+ (d.target.y1 - d.target.y0))
        //      + "C" + x3 + "," + (y1+ (d.target.y1 - d.target.y0))
        //      + " " + x2 + "," + (y0+ (d.source.y1 - d.source.y0))
        //      + " " + x0 + "," + (y0+ (d.source.y1 - d.source.y0))
        //      + "L" + x0 + "," + y0;
    };
    RefineProvenanceExplorerComponent.prototype.determineNodeHistory = function (historyId) {
        var _this = this;
        // let histories = Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => { if (entity[0].includes("history_entry:")) return entity; });
        var nodeHistory = [];
        var parent = "history_entry:" + historyId;
        while (parent) {
            nodeHistory.splice(0, 0, { id: parseInt(parent.replace("history_entry:", "")), value: this.provenanceOverlayModel.provenance.entity[parent] });
            var wdfParent = Object.values(this.provenanceOverlayModel.provenance.wasDerivedFrom).find(function (wdf) {
                return wdf["prov:generatedEntity"] == parent;
            });
            if (!wdfParent["prov:usedEntity"])
                parent = null;
            parent = wdfParent["prov:usedEntity"];
            // nodeHistory.push(this.provenanceOverlayModel.provenance.entity[parent["prov:generatedEntity"]]);
        }
        var depths = this.sankeyDiag().nodes.filter(function (node) {
            var mapNode = _this.nodeHistory.find(function (mapNode) {
                return mapNode.id === parseInt(node.key.replace("history_entry:", ""));
            });
            if (mapNode) {
                mapNode.depth = node.depth;
                return true;
            }
            // return .includes(parseInt(node.key.replace("history_entry:","")));
        });
        return nodeHistory;
    };
    RefineProvenanceExplorerComponent.prototype.setSankeyScale = function () {
        var _this = this;
        // create scales based on node depths
        var maxDepth = 0;
        this.sankeyDiag().nodes.forEach(function (node) {
            if (node.depth > maxDepth)
                maxDepth = node.depth;
        });
        var depths = this.sankeyDiag().nodes.filter(function (node, i, nodesArray) {
            var mapNode = _this.nodeHistory.find(function (mapNode) {
                return mapNode.id === parseInt(node.key.replace("history_entry:", "")) || mapNode.id === parseInt(node.key.replace("facet:", ""));
            });
            if (mapNode) {
                mapNode.depth = node.depth;
                return true;
            }
            // return .includes(parseInt(node.key.replace("history_entry:","")));
        })
            .map(function (node) { return node.depth; }).sort(this.numericSort);
        if (depths[depths.length - 1] < maxDepth)
            depths.push(-1);
        if (this.showDetail)
            this.scaleHistory = d3__WEBPACK_IMPORTED_MODULE_5__["scaleBand"]().domain(depths).range([this.elementPadding, parseFloat(this.provGraph.nativeElement.scrollWidth) * ((this.provWidth - this.detailWidth) / 100) - this.elementPadding]).paddingInner(this.innerPadding);
        else
            this.scaleHistory = d3__WEBPACK_IMPORTED_MODULE_5__["scaleBand"]().domain(depths).range([this.elementPadding, parseFloat(this.provGraph.nativeElement.scrollWidth) * .8 - this.elementPadding]).paddingInner(this.innerPadding);
        var depthsFuture = [];
        depthsFuture.push(-1);
        this.sankeyDiag().nodes.forEach(function (node) {
            if (!depths.includes(node.depth) && !depthsFuture.includes(node.depth))
                depthsFuture.push(node.depth);
        });
        depthsFuture.sort(this.numericSort);
        var futureWidth;
        if (this.showDetail && depthsFuture.length < depths.length - 1)
            futureWidth = this.scaleHistory(depths[depths.length - 2]) + this.scaleHistory.step() * (depthsFuture.length - 1); //this.provGraph.nativeElement.scrollWidth - (this.scaleHistory(depths[depths.length-2]) + this.scaleHistory(depths[depths.length-(depthsFuture.length)]) - this.scaleHistory(depths[depths.length-(depthsFuture.length+1)]) - this.elementPadding);
        else
            futureWidth = this.provGraph.nativeElement.scrollWidth;
        this.scaleFuture = d3__WEBPACK_IMPORTED_MODULE_5__["scaleBand"]().domain(depthsFuture).range([this.scaleHistory(depths[depths.length - 2]) + this.scaleHistory.bandwidth(), futureWidth]).paddingInner(this.innerPadding);
        // let nodes = d3.select("svg.provGraph").selectAll("g.nodes").selectAll("g.history_nodes");
        if (depths[depths.length - 1] === -1) {
            this.qualityViewWidth = this.scaleHistory(depths[depths.length - 2]) + this.scaleHistory.bandwidth();
            this.detailViewWidth = parseFloat(this.provGraph.nativeElement.scrollWidth) - this.scaleHistory(depths[depths.length - 2]) - 2 * this.scaleHistory.bandwidth();
        }
        else {
            this.qualityViewWidth = this.scaleHistory(depths[depths.length - 1]) + this.scaleHistory.bandwidth();
            this.detailViewWidth = parseFloat(this.provGraph.nativeElement.scrollWidth) * (this.detailWidth / 100) - this.scaleHistory.bandwidth();
        }
        // we don't want the detail view to be to wide
        // if (this.detailViewWidth > this.provGraph.nativeElement.scrollWidth * 0.35) {
        //   this.detailViewWidth = this.provGraph.nativeElement.scrollWidth * 0.35;
        // }
        if (this.sankeyNodes) {
            this.sankeyNodes.selectAll("rect")
                .attr("x", function (d) {
                if (_this.scaleHistory(d.depth))
                    return _this.scaleHistory(d.depth);
                else
                    return _this.scaleFuture(d.depth);
            })
                .attr("width", function (d) {
                if (_this.scaleHistory(d.depth)) {
                    if (d.activity)
                        return _this.scaleHistory.bandwidth() / 2;
                    return _this.scaleHistory.bandwidth();
                }
                return _this.scaleFuture.bandwidth();
            })
                .transition(this.transition);
            this.sankeyNodes.selectAll("foreignObject")
                .attr("x", function (d) {
                if (_this.scaleHistory(d.depth))
                    return _this.scaleHistory(d.depth);
                else
                    return _this.scaleFuture(d.depth);
            })
                .style('padding-left', function (d) {
                var w;
                if (_this.scaleHistory(d.depth))
                    w = _this.scaleHistory.bandwidth();
                else
                    w = _this.scaleFuture.bandwidth();
                if (w > _this.iconWidth)
                    return (w - _this.iconWidth) / 2 + 'px';
                return '0px';
            });
        }
        if (this.sankeyLinks) {
            this.sankeyLinks.selectAll("path")
                .attr("d", function (d) { return _this.linkSkewed(d); })
                // .attr("class", (d:any) => { 
                //   return "activity" + d.activity.replace("change:","");
                // })
                .attr("stroke", function (d) {
                if (_this.nodeHistory.map(function (node) { return node.id; }).includes(parseInt(d.target.key.replace("history_entry:", ""))) ||
                    (_this.shiftNodeHistory && _this.shiftNodeHistory.map(function (node) { return node.id; }).includes(parseInt(d.target.key.replace("history_entry:", "")))))
                    return "gray";
                else
                    return null;
            })
                .transition(this.transition);
            this.sankeyLinks.selectAll("foreignObject.change")
                .attr('x', function (d) {
                if (_this.scaleHistory(d.source.depth) && _this.scaleHistory(d.target.depth))
                    return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleHistory(d.target.depth))(.85) - _this.nodeWidth / 4;
                else if (_this.scaleHistory(d.source.depth) && _this.scaleFuture(d.target.depth))
                    return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleFuture(d.target.depth))(.85) - _this.nodeWidth / 4;
                else if (_this.scaleFuture(d.source.depth))
                    return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleFuture(d.source.depth) + _this.scaleFuture.bandwidth(), _this.scaleFuture(d.target.depth))(.85) - _this.nodeWidth / 4;
            });
            this.sankeyLinks.selectAll("foreignObject.facet")
                .attr('x', function (d) {
                if (_this.scaleHistory(d.source.depth) && _this.scaleHistory(d.target.depth))
                    return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleHistory(d.target.depth))(.5) - _this.nodeWidth / 4;
                else if (_this.scaleHistory(d.source.depth) && _this.scaleFuture(d.target.depth))
                    return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleHistory(d.source.depth) + _this.scaleHistory.bandwidth(), _this.scaleFuture(d.target.depth))(.5) - _this.nodeWidth / 4;
                else if (_this.scaleFuture(d.source.depth))
                    return d3__WEBPACK_IMPORTED_MODULE_5__["interpolate"](_this.scaleFuture(d.source.depth) + _this.scaleFuture.bandwidth(), _this.scaleFuture(d.target.depth))(.5) - _this.nodeWidth / 4;
            });
        }
    };
    RefineProvenanceExplorerComponent.prototype.clearProvGraphHighlights = function () {
        // d3.select("svg.provGraph").selectAll("nodes").classed("selected", false).classed("shiftSelected", false);
        // .classed("selected", false)
        // .classed("shiftSelected", false);
        d3__WEBPACK_IMPORTED_MODULE_5__["selectAll"]("svg.provGraph g.nodes g.history_nodes rect")
            .classed("selected", false)
            .classed("shiftSelected", false)
            .classed("selectedNode", false)
            .classed("shiftSelectedNode", false)
            .classed("selectedPath", false)
            .classed("shiftSelectedPath", false);
        // .classed("selected", false)
        // .classed("shiftSelected", false);
    };
    RefineProvenanceExplorerComponent.prototype.highlightProvGraph = function (hist, classString) {
        for (var _i = 0, hist_1 = hist; _i < hist_1.length; _i++) {
            var node = hist_1[_i];
            var idString = node.id;
            d3__WEBPACK_IMPORTED_MODULE_5__["select"]("svg.provGraph g.nodes").select("rect#history_entry" + idString)
                .classed(classString, true);
            // .attr('stroke', 'gray')
            // .attr('stroke-width', '2px');
            // let path = d3.selectAll("path.activity" + idString)
            // if(!path.empty())// && !path.classed("selected"))
            //   path.classed(classString, true);
            // .attr("fill", "#a2b9bc")
            // .attr('stroke', 'gray')
            // .attr("fill-opacity", 0.85)
            // .attr('stroke-width', '2px');
        }
        d3__WEBPACK_IMPORTED_MODULE_5__["select"]("svg.provGraph g.nodes").select("rect#history_entry" + this.histId)
            .classed("selectedNode", true);
    };
    RefineProvenanceExplorerComponent.prototype.onContextMenu = function ($event, item, metric) {
        var metricContext = item.metrics[metric];
        if (metricContext) {
            this.contextMenuService.show.next({
                // Optional - if unspecified, all context menu components will open
                contextMenu: this.metricMenu,
                event: $event,
                item: metricContext
            });
        }
        else {
            this.contextMenuService.show.next({
                contextMenu: this.issueMenu,
                event: $event,
                item: metric
            });
        }
        $event.preventDefault();
        $event.stopPropagation();
        // this.contextMenuService.show.next({
        //   actions: this.menuOptions,
        //   event: $event,
        //   item: item
        // });
    };
    Object.defineProperty(RefineProvenanceExplorerComponent.prototype, "content", {
        set: function (content) {
            this.provGraph = content;
            console.log("set graph");
            if (this.provGraph && this.provenanceOverlayModel) {
                this.setSankeyScale();
            }
        },
        enumerable: true,
        configurable: true
    });
    RefineProvenanceExplorerComponent.prototype.toggleShowDetail = function () {
        this.showDetail = !this.showDetail;
        // if (this.showDetail)
        //   this.provWidth = this.pageWidth - this.detailWidth;
        // else 
        //   this.provWidth = this.pageWidth;
        // this.nodeHistory = this.determineNodeHistory(this.histId);
        this.setSankeyScale();
    };
    RefineProvenanceExplorerComponent.prototype.numericSort = function (a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('qualityMetric', { static: false }),
        __metadata("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_4__["ContextMenuComponent"])
    ], RefineProvenanceExplorerComponent.prototype, "metricMenu", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('issue', { static: false }),
        __metadata("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_4__["ContextMenuComponent"])
    ], RefineProvenanceExplorerComponent.prototype, "issueMenu", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('provGraph', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], RefineProvenanceExplorerComponent.prototype, "content", null);
    RefineProvenanceExplorerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-refine-provenance-explorer',
            template: __webpack_require__(/*! raw-loader!./refine-provenance-explorer.component.html */ "./node_modules/raw-loader/index.js!./src/app/refine-provenance-explorer/refine-provenance-explorer.component.html"),
            providers: [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_3__["OpenRefineService"]],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./refine-provenance-explorer.component.scss */ "./src/app/refine-provenance-explorer/refine-provenance-explorer.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_3__["OpenRefineService"],
            ngx_contextmenu__WEBPACK_IMPORTED_MODULE_4__["ContextMenuService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], RefineProvenanceExplorerComponent);
    return RefineProvenanceExplorerComponent;
}());



/***/ }),

/***/ "./src/app/refine-provenance/provenance-project-list.pipe.ts":
/*!*******************************************************************!*\
  !*** ./src/app/refine-provenance/provenance-project-list.pipe.ts ***!
  \*******************************************************************/
/*! exports provided: ProvenanceProjectListPipe, NonProvenanceProjectListPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceProjectListPipe", function() { return ProvenanceProjectListPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonProvenanceProjectListPipe", function() { return NonProvenanceProjectListPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProvenanceProjectListPipe = /** @class */ (function () {
    function ProvenanceProjectListPipe() {
    }
    ProvenanceProjectListPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            if (value[key].customMetadata["hasProvenance"] && value[key].customMetadata["hasProvenance"] === true) {
                keys.push({ key: key, value: value[key] });
            }
        }
        return keys;
    };
    ProvenanceProjectListPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'provenanceProjectList'
        })
    ], ProvenanceProjectListPipe);
    return ProvenanceProjectListPipe;
}());

var NonProvenanceProjectListPipe = /** @class */ (function () {
    function NonProvenanceProjectListPipe() {
    }
    NonProvenanceProjectListPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            if (!value[key].customMetadata["hasProvenance"] || value[key].customMetadata["hasProvenance"] === false) {
                keys.push({ key: key, value: value[key] });
            }
        }
        return keys;
    };
    NonProvenanceProjectListPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'nonProvenanceProjectList'
        })
    ], NonProvenanceProjectListPipe);
    return NonProvenanceProjectListPipe;
}());



/***/ }),

/***/ "./src/app/refine-provenance/refine-provenance.component.sass":
/*!********************************************************************!*\
  !*** ./src/app/refine-provenance/refine-provenance.component.sass ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZmluZS1wcm92ZW5hbmNlL3JlZmluZS1wcm92ZW5hbmNlLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/refine-provenance/refine-provenance.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/refine-provenance/refine-provenance.component.ts ***!
  \******************************************************************/
/*! exports provided: RefineProvenanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefineProvenanceComponent", function() { return RefineProvenanceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RefineProvenanceComponent = /** @class */ (function () {
    function RefineProvenanceComponent(openRefineService) {
        var _this = this;
        this.openRefineService = openRefineService;
        this.openRefineService.getAllProjectMetadata().subscribe(function (refineProjects) {
            _this.refineProjects = refineProjects.projects;
            // console.log(this.refineProjects.projects);
        }, function (error) { return _this.errorMessage = error; });
    }
    RefineProvenanceComponent.prototype.ngOnInit = function () {
    };
    RefineProvenanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-provenance',
            template: __webpack_require__(/*! raw-loader!./refine-provenance.component.html */ "./node_modules/raw-loader/index.js!./src/app/refine-provenance/refine-provenance.component.html"),
            providers: [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./refine-provenance.component.sass */ "./src/app/refine-provenance/refine-provenance.component.sass")]
        }),
        __metadata("design:paramtypes", [_shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]])
    ], RefineProvenanceComponent);
    return RefineProvenanceComponent;
}());



/***/ }),

/***/ "./src/app/shared/barchart/barchart.component.css":
/*!********************************************************!*\
  !*** ./src/app/shared/barchart/barchart.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".d3-chart {\n  width: 100%;\n  height: 400px;\n}\n \n.d3-chart .axis path,\n.d3-chart .axis line {\n  stroke: #999;\n}\n \n.d3-chart .axis text {\n  fill: #999;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2JhcmNoYXJ0L2JhcmNoYXJ0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmOztBQUVBOztFQUVFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFVBQVU7QUFDWiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9iYXJjaGFydC9iYXJjaGFydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmQzLWNoYXJ0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDAwcHg7XG59XG4gXG4uZDMtY2hhcnQgLmF4aXMgcGF0aCxcbi5kMy1jaGFydCAuYXhpcyBsaW5lIHtcbiAgc3Ryb2tlOiAjOTk5O1xufVxuIFxuLmQzLWNoYXJ0IC5heGlzIHRleHQge1xuICBmaWxsOiAjOTk5O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shared/barchart/barchart.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/barchart/barchart.component.ts ***!
  \*******************************************************/
/*! exports provided: BarchartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarchartComponent", function() { return BarchartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BarchartComponent = /** @class */ (function () {
    function BarchartComponent() {
        this.margin = { top: 20, bottom: 20, left: 20, right: 20 };
    }
    BarchartComponent.prototype.ngOnInit = function () {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    };
    BarchartComponent.prototype.ngOnChanges = function () {
        if (this.chart) {
            this.updateChart();
        }
    };
    BarchartComponent.prototype.createChart = function () {
        var element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")");
        // define X & Y domains
        var xDomain = this.data.map(function (d) { return d[0]; });
        var yDomain = [0, d3__WEBPACK_IMPORTED_MODULE_1__["max"](this.data, function (d) { return d[1]; })];
        // create scales
        this.xScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleBand"]().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]().domain(yDomain).range([this.height, 0]);
        // bar colors
        this.colors = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]().domain([0, this.data.length]).range(['red', 'blue']);
        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")")
            .call(d3__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](this.xScale));
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .call(d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](this.yScale));
    };
    BarchartComponent.prototype.updateChart = function () {
        var _this = this;
        // update scales & axis
        this.xScale.domain(this.data.map(function (d) { return d[0]; }));
        this.yScale.domain([0, d3__WEBPACK_IMPORTED_MODULE_1__["max"](this.data, function (d) { return d[1]; })]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](this.xScale));
        this.yAxis.transition().call(d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](this.yScale));
        var update = this.chart.selectAll('.bar')
            .data(this.data);
        // remove exiting bars
        update.exit().remove();
        // update existing bars
        this.chart.selectAll('.bar').transition()
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('width', function (d) { return _this.xScale.bandwidth(); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); })
            .style('fill', function (d, i) { return _this.colors(i); });
        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(0); })
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', function (d, i) { return _this.colors(i); })
            .transition()
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chart', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], BarchartComponent.prototype, "chartContainer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], BarchartComponent.prototype, "data", void 0);
    BarchartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-barchart',
            template: __webpack_require__(/*! raw-loader!./barchart.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/barchart/barchart.component.html"),
            styles: [__webpack_require__(/*! ./barchart.component.css */ "./src/app/shared/barchart/barchart.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BarchartComponent);
    return BarchartComponent;
}());



/***/ }),

/***/ "./src/app/shared/metric-checks-overview/check-input-directive.directive.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/metric-checks-overview/check-input-directive.directive.ts ***!
  \**********************************************************************************/
/*! exports provided: CheckInputDirectiveDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckInputDirectiveDirective", function() { return CheckInputDirectiveDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CheckInputDirectiveDirective = /** @class */ (function () {
    function CheckInputDirectiveDirective() {
    }
    CheckInputDirectiveDirective_1 = CheckInputDirectiveDirective;
    var CheckInputDirectiveDirective_1;
    CheckInputDirectiveDirective = CheckInputDirectiveDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appCheckInputDirective]',
            providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"], useExisting: CheckInputDirectiveDirective_1, multi: true }]
        }),
        __metadata("design:paramtypes", [])
    ], CheckInputDirectiveDirective);
    return CheckInputDirectiveDirective;
}());



/***/ }),

/***/ "./src/app/shared/metric-checks-overview/metric-checks-overview.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/shared/metric-checks-overview/metric-checks-overview.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ngb-accordion.metric-info-panel {\n  width: 35%; }\n\nngb-accordion.checks-panel {\n  width: 65%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvc2hhcmVkL21ldHJpYy1jaGVja3Mtb3ZlcnZpZXcvbWV0cmljLWNoZWNrcy1vdmVydmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVUsRUFBQTs7QUFHWjtFQUNFLFVBQVUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9tZXRyaWMtY2hlY2tzLW92ZXJ2aWV3L21ldHJpYy1jaGVja3Mtb3ZlcnZpZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJuZ2ItYWNjb3JkaW9uLm1ldHJpYy1pbmZvLXBhbmVsIHtcbiAgd2lkdGg6IDM1JTtcbn1cblxubmdiLWFjY29yZGlvbi5jaGVja3MtcGFuZWwge1xuICB3aWR0aDogNjUlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shared/metric-checks-overview/metric-checks-overview.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/shared/metric-checks-overview/metric-checks-overview.component.ts ***!
  \***********************************************************************************/
/*! exports provided: MetricChecksOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricChecksOverviewComponent", function() { return MetricChecksOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var _open_refine_model_open_refine_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../open-refine/model/open-refine-project */ "./src/app/shared/open-refine/model/open-refine-project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MetricChecksOverviewComponent = /** @class */ (function () {
    function MetricChecksOverviewComponent(openRefineService) {
        this.openRefineService = openRefineService;
        this.onSelectionUpdated = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.status = {
            isFirstOpen: false,
            isFirstDisabled: false
        };
    }
    MetricChecksOverviewComponent.prototype.ngOnInit = function () {
    };
    MetricChecksOverviewComponent.prototype.beforeChange = function ($event) {
    };
    ;
    MetricChecksOverviewComponent.prototype.onSelectionChange = function (entry) {
        this.metricSelection[0].datatype = entry;
        this.selectionInvalid = false;
        this.checkFeedback = null;
    };
    MetricChecksOverviewComponent.prototype.clickConcat = function (event, concat) {
        this.metricSelection[0].concat = concat;
        event.stopPropagation();
    };
    MetricChecksOverviewComponent.prototype.addCheck = function () {
        this.metricSelection[0].evalTuples.push({ column: "",
            comment: "",
            disabled: false,
            evaluable: ""
        });
    };
    MetricChecksOverviewComponent.prototype.removeEvaluableSelection = function () {
        var idx = this.metricSelection[0].evalTuples.indexOf(this.selectedEvaluable, 0);
        if (idx > -1) {
            this.metricSelection[0].evalTuples.splice(idx, 1);
        }
        else {
            if (this.metricSelection[0].spanningEvaluable === this.selectedEvaluable) {
                this.metricSelection[0].spanningEvaluable = null;
            }
        }
    };
    MetricChecksOverviewComponent.prototype.disableEvaluableSelection = function () {
        this.selectedEvaluable.disabled = !this.selectedEvaluable.disabled;
    };
    MetricChecksOverviewComponent.prototype.onSelectEvaluable = function (evaluable) {
        this.selectedEvaluable = evaluable;
    };
    MetricChecksOverviewComponent.prototype.checkValidity = function (event) {
        var _this = this;
        if (event.key === "Enter") {
            //TODO: save evaluable to metric
            this.metricSelection[0].dirtyIndices = [];
            this.openRefineService.updateMetric(this.projectId, this.metricSelection[0], this.columnSelection[0])
                .subscribe(function (response) {
                // console.log("success");
                _this.metricSelection[0] = response;
                _this.openRefineService.evaluateSelection(_this.projectId, _this.metricSelection, _this.columnSelection)
                    .subscribe(function (response) {
                    _this.metricSelection = response.metricList;
                    _this.onSelectionUpdated.emit({ metrics: _this.metricSelection, columns: _this.columnSelection });
                });
            });
        }
        var col = this.project.columnModel.columns.find(function (value, idx, col) {
            var colName = _this.columnSelection[0];
            if (typeof colName != "string" && _this.columnSelection[0].length > 1) {
                colName = _this.columnSelection[0][0];
            }
            return value.name == colName;
        });
        this.openRefineService.previewExpression(this.projectId, this.selectedEvaluable.evaluable, col.cellIndex)
            .subscribe(function (response) {
            _this.checkFeedback = response.message;
            if (response.code === "error") {
                _this.selectionInvalid = true;
                _this.alertType = "danger";
            }
            else {
                _this.selectionInvalid = false;
                _this.alertType = "info";
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricChecksOverviewComponent.prototype, "metricSelection", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricChecksOverviewComponent.prototype, "columnSelection", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricChecksOverviewComponent.prototype, "selectedEvaluable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _open_refine_model_open_refine_project__WEBPACK_IMPORTED_MODULE_2__["OpenRefineProject"])
    ], MetricChecksOverviewComponent.prototype, "project", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MetricChecksOverviewComponent.prototype, "projectId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], MetricChecksOverviewComponent.prototype, "onSelectionUpdated", void 0);
    MetricChecksOverviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'metric-accordion',
            template: __webpack_require__(/*! raw-loader!./metric-checks-overview.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/metric-checks-overview/metric-checks-overview.component.html"),
            providers: [_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./metric-checks-overview.component.scss */ "./src/app/shared/metric-checks-overview/metric-checks-overview.component.scss")]
        }),
        __metadata("design:paramtypes", [_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]])
    ], MetricChecksOverviewComponent);
    return MetricChecksOverviewComponent;
}());



/***/ }),

/***/ "./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.scss":
/*!***********************************************************************************************!*\
  !*** ./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "svg.heatmap {\n  width: 100%;\n  height: 540px; }\n  svg.heatmap rect {\n    width: 100%;\n    height: 400px; }\n  rect.pos-overlay {\n  fill: lightgrey;\n  opacity: 30%;\n  pointer-events: none; }\n  svg.legend {\n  margin-right: 8px;\n  height: 12px;\n  width: 16px; }\n  svg.legend rect {\n    height: 12px;\n    width: 12px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvc2hhcmVkL21ldHJpYy1kZXRhaWwtdmlzdWFsaXphdGlvbi9tZXRyaWMtZGV0YWlsLXZpc3VhbGl6YXRpb24uY29tcG9uZW50LnNjc3MiLCIvVXNlcnMvY2hyaXN0aWFuYm9ycy9Qcm9qZWN0cy9tZXRyaWNkb2NfYW5ndWxhci9zcmMvYXBwL3NoYXJlZC9fZ2xvYmFscy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWtDLEVBQUE7RUFGcEM7SUFLSSxXQUFXO0lBQ1gsYUNSbUIsRUFBQTtFRFl2QjtFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osb0JBQW9CLEVBQUE7RUFHdEI7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFdBQVcsRUFBQTtFQUhiO0lBTUksWUFBWTtJQUNaLFdBQVcsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9tZXRyaWMtZGV0YWlsLXZpc3VhbGl6YXRpb24vbWV0cmljLWRldGFpbC12aXN1YWxpemF0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uL2dsb2JhbHNcIjtcblxuc3ZnLmhlYXRtYXAge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAkcmF3LWRhdGEtaGVpZ2h0ICsgNTAgKyA5MDtcblxuICByZWN0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6ICRyYXctZGF0YS1oZWlnaHQ7XG4gIH1cbn1cblxucmVjdC5wb3Mtb3ZlcmxheSB7XG4gIGZpbGw6IGxpZ2h0Z3JleTtcbiAgb3BhY2l0eTogMzAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuc3ZnLmxlZ2VuZCB7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xuICBoZWlnaHQ6IDEycHg7XG4gIHdpZHRoOiAxNnB4O1xuXG4gIHJlY3Qge1xuICAgIGhlaWdodDogMTJweDtcbiAgICB3aWR0aDogMTJweDtcbiAgfVxufSIsIiRyYXctZGF0YS1oZWlnaHQ6IDQwMHB4OyJdfQ== */"

/***/ }),

/***/ "./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: MetricDetailVisualizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricDetailVisualizationComponent", function() { return MetricDetailVisualizationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MetricDetailVisualizationComponent = /** @class */ (function () {
    function MetricDetailVisualizationComponent(element) {
        this.element = element;
        this.onDataRowsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.visOffset = 50;
        this.axisOffset = 90;
        this.columnOffset = 40;
        this.htmlElement = this.element.nativeElement;
    }
    MetricDetailVisualizationComponent.prototype.ngOnInit = function () {
        var boundingRect = this.svg.nativeElement.getBoundingClientRect();
        this.detailViewHeight = boundingRect.height;
        this.detailViewWidth = boundingRect.width - this.columnOffset;
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.svg.nativeElement).select('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('class', 'rect-disabled')
            .attr('fill', 'transparent');
        this.drawDetailView();
        var div = d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").append("div")
            .attr("class", "d3tooltip")
            .style("opacity", 0);
    };
    MetricDetailVisualizationComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var boundingRect = this.svg.nativeElement.getBoundingClientRect();
        this.detailViewHeight = boundingRect.height;
        this.detailViewWidth = boundingRect.width - this.columnOffset;
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.svg.nativeElement).select('rect')
            .attr('x', 0)
            .attr('y', this.visOffset)
            // .attr('class', 'rect-disabled')
            .attr('fill', 'transparent');
        if ('metricsOverlayModel' in changes) {
            this.redrawDetailView();
        }
        else if ('rowModel' in changes || 'metricSelection' in changes) {
            this.updateDirtyArray();
            this.drawDetailView();
        }
        if ('viewOffsetTop' in changes && this.rowModel) {
            this.detailViewY = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
                .domain([this.rowModel.filtered, 0])
                .rangeRound([this.detailViewHeight - this.axisOffset, this.visOffset]);
        }
        if ('rowsFrom' in changes && this.x) {
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]('rect.pos-overlay')
                .attr('y', function (d, i) {
                var y = _this.detailViewY(_this.rowsFrom);
                return _this.detailViewY(_this.rowsFrom);
            });
        }
    };
    MetricDetailVisualizationComponent.prototype.redrawDetailView = function () {
        this.updateDirtyArray();
    };
    MetricDetailVisualizationComponent.prototype.updateDirtyArray = function () {
        this.maxErrorCount = [];
        this.dirtyArray = [];
        if (this.rowModel && this.metricSelection) {
            this.activeEvalTuples = [];
            this.evalTupleColors = [];
            for (var _i = 0, _a = this.metricSelection; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.spanningEvaluable && !m.spanningEvaluable.disabled) {
                    this.evalTupleColors.push(this.getColor(m));
                    this.activeEvalTuples.push(m.spanningEvaluable);
                }
                for (var _b = 0, _c = m.evalTuples; _b < _c.length; _b++) {
                    var et = _c[_b];
                    this.evalTupleColors.push(this.getColor(m));
                    if (!et.disabled)
                        this.activeEvalTuples.push(et);
                }
            }
            var ordinalScale = [];
            for (var i = 0; i <= this.activeEvalTuples.length; ++i)
                ordinalScale.push(i);
            var tupleAxis = [];
            for (var _d = 0, _e = this.activeEvalTuples; _d < _e.length; _d++) {
                var tuple = _e[_d];
                tupleAxis.push(tuple.evaluable);
            }
            var detailWidths = [];
            for (var i in this.activeEvalTuples) {
                detailWidths.push(this.detailViewWidth / this.activeEvalTuples.length);
            }
            this.axisWidths = [40];
            for (var i = 1; i <= this.activeEvalTuples.length; ++i) {
                this.axisWidths.push(detailWidths[i - 1] + this.axisWidths[i - 1]);
            }
            this.detailViewY = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
                .domain([this.rowModel.filtered, 0])
                .rangeRound([this.detailViewHeight - this.axisOffset, this.visOffset]);
            this.x = d3__WEBPACK_IMPORTED_MODULE_1__["scaleOrdinal"]()
                .domain(ordinalScale)
                .range(this.axisWidths);
            this.xAxis = d3__WEBPACK_IMPORTED_MODULE_1__["scaleOrdinal"]()
                .domain(tupleAxis)
                .range(this.axisWidths);
            var _loop_1 = function (dirtyIdx) {
                var dirtyEntry = { index: dirtyIdx, dirty: [] };
                for (var metricIdx = 0; metricIdx < this_1.metricSelection.length; metricIdx++) {
                    var dirtyEvals = [];
                    if (this_1.metricSelection[metricIdx] && this_1.metricSelection[metricIdx].dirtyIndices) {
                        var dirtyRow = this_1.metricSelection[metricIdx].dirtyIndices.filter(function (d) {
                            return d.index == dirtyIdx;
                        })[0];
                        if (dirtyRow) {
                            dirtyEntry.dirty = dirtyEntry.dirty.concat(dirtyRow.dirty);
                        }
                        else {
                            var cleanEval = [];
                            if (this_1.metricSelection[metricIdx].spanningEvaluable)
                                dirtyEntry.dirty.push(true);
                            for (var bool in this_1.metricSelection[metricIdx].evalTuples)
                                dirtyEntry.dirty.push(true);
                        }
                    }
                }
                if (dirtyEntry.dirty.length > 0 && dirtyEntry.dirty.indexOf(false) != -1) {
                    var viewY = this_1.detailViewY(dirtyIdx);
                    if (this_1.dirtyArray[viewY] == null) {
                        this_1.dirtyArray[viewY] = {};
                        this_1.dirtyArray[viewY].dirty = [];
                        this_1.dirtyArray[viewY].index = [];
                    }
                    this_1.dirtyArray[viewY].index.push(dirtyEntry.index);
                    for (var i = 0; i < dirtyEntry.dirty.length; ++i) {
                        if (!this_1.maxErrorCount[i])
                            this_1.maxErrorCount[i] = 0;
                        if (this_1.dirtyArray[viewY].dirty[i] == null) {
                            this_1.dirtyArray[viewY].dirty[i] = [];
                        }
                        this_1.dirtyArray[viewY].dirty[i].push(dirtyEntry.dirty[i]);
                        if (this_1.dirtyArray[viewY].dirty[i].length >= this_1.maxErrorCount[i]) {
                            var errorCount = this_1.dirtyArray[viewY].dirty[i].reduce(function (total, x) { return !x ? total + 1 : total; }, 0);
                            if (errorCount > this_1.maxErrorCount[i])
                                this_1.maxErrorCount[i] = errorCount;
                        }
                    }
                }
            };
            var this_1 = this;
            for (var dirtyIdx = 0; dirtyIdx < this.rowModel.filtered; dirtyIdx++) {
                _loop_1(dirtyIdx);
            }
        }
    };
    MetricDetailVisualizationComponent.prototype.drawDetailView = function () {
        var _this = this;
        var container = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.svg.nativeElement);
        container.selectAll('g.metric-detail-row')
            .remove();
        container.select('g.x.axis').remove();
        container.select('g.y.axis').remove();
        if (this.dirtyArray.length > 0) {
            var rows = container.selectAll('g.metric-detail-row')
                .data(this.dirtyArray)
                .enter().append('g')
                .attr('class', 'metric-detail-row')
                .attr('transform', function (d, i) {
                if (d)
                    return 'translate(0,' + i + ')';
            })
                .style('fill', 'white')
                .on('click', function (d, i, el) {
                _this.onDataRowsSelected.emit(d.index);
            })
                .on('mouseover', function (d, i, el) {
                var rec = d3__WEBPACK_IMPORTED_MODULE_1__["select"](el[i]).append('rect')
                    .attr('class', 'mouseover')
                    .style('fill', 'steelblue')
                    .style('width', function (d, i, el) {
                    var parent = el[i].parentElement;
                    var parentSelection = d3__WEBPACK_IMPORTED_MODULE_1__["select"](parent).node();
                    var bb = parentSelection.getBoundingClientRect();
                    return bb.width;
                })
                    .attr('x', _this.x(0))
                    .style('height', '1');
                var htmlText;
                if (d.index.length > 1) {
                    htmlText = '<span style="color:steelblue">Rows: </span><span>' + (d.index[0] + 1) + ' - ' + (d.index[d.index.length - 1] + 1) + ' </span>';
                }
                else {
                    htmlText = '<span style="color:steelblue">Row: </span><span>' + (d.index[0] + 1) + ' </span>';
                }
                var tooltipNode = d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").node();
                d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").html(htmlText) //"<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                    .style("left", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX - tooltipNode.scrollWidth) + "px")
                    .style("top", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY) + "px")
                    .style("opacity", .9);
            })
                .on("mousemove", function (data) {
                var tooltipNode = d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").node();
                d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip")
                    .style("left", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX - tooltipNode.scrollWidth) + "px")
                    .style("top", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY) + "px");
            })
                .on('mouseleave', function (d, i, el) {
                d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip")
                    .style("opacity", 0);
                // this.tooltip.hide();
                d3__WEBPACK_IMPORTED_MODULE_1__["select"](el[i]).selectAll('rect.mouseover').remove();
            });
            var bins = rows.selectAll('.bin')
                .data(function (d) {
                if (d != null) {
                    return d.dirty;
                }
                else {
                    return [];
                }
            })
                .enter().append('rect')
                .attr('class', 'bin')
                .attr('x', function (d, i) {
                return _this.x(i);
            }).attr('width', function (d, i) {
                return _this.x(i + 1) - _this.x(i);
            }).style('fill', function (d, i) {
                if (d.indexOf(false) == -1) {
                    return 'white';
                }
                else {
                    return _this.evalTupleColors[i];
                }
            }).style('opacity', function (d, i) {
                var count = d.reduce(function (n, val) {
                    return n + (val === false);
                }, 0);
                return count / _this.maxErrorCount[i];
            })
                .attr('height', 1);
            container.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + (this.detailViewHeight - this.axisOffset) + ')')
                .attr('x', this.detailViewHeight - this.axisOffset)
                .attr('y', 0)
                .call(d3__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](this.x))
                .style('font-size', 12)
                .style('text-anchor', 'start')
                .selectAll('.tick text')
                .each(function (d, i, g) {
                if (_this.activeEvalTuples[d]) {
                    d3__WEBPACK_IMPORTED_MODULE_1__["select"](g[i]).text(_this.activeEvalTuples[d].evaluable);
                }
                else {
                    d3__WEBPACK_IMPORTED_MODULE_1__["select"](g[i]).text('');
                }
            })
                .attr('x', -8)
                .attr('y', function (d, i, g) {
                return 6 + 12 * (i % 2);
            });
            container.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + this.columnOffset + ',' + 0 + ')')
                .call(d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](this.detailViewY));
            // position overlay
            container.selectAll('rect.pos-overlay').remove();
            container.insert('rect', 'g')
                .attr('class', 'pos-overlay')
                .attr('x', this.x(0))
                .attr('y', this.detailViewY(this.rowsFrom))
                .attr('height', function (d, i) {
                var h = _this.detailViewY(_this.rowsTo - _this.rowsFrom);
                return h - _this.visOffset;
            })
                .attr('width', function (d, i) {
                return _this.x(_this.metricSelection.length) - _this.x(0);
            })
                .attr('fill', 'lightgrey')
                .attr('opacity', 0.7);
        }
    };
    MetricDetailVisualizationComponent.prototype.getColor = function (metric) {
        if (metric.spanningColumns) {
            if (this.spanMetricColors[metric.name])
                return this.spanMetricColors[metric.name];
        }
        else {
            if (this.columnMetricColors[metric.name])
                return this.columnMetricColors[metric.name];
        }
        return "#ce6dbd";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "viewOffsetTop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "metricsOverlayModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "rowModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "metricSelection", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "selectedColumns", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "columnMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "spanMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "rowsFrom", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "rowsTo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('visParent', { static: true }),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "svg", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], MetricDetailVisualizationComponent.prototype, "onDataRowsSelected", void 0);
    MetricDetailVisualizationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'metric-detail-view',
            template: __webpack_require__(/*! raw-loader!./metric-detail-visualization.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.html"),
            styles: [__webpack_require__(/*! ./metric-detail-visualization.component.scss */ "./src/app/shared/metric-detail-visualization/metric-detail-visualization.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], MetricDetailVisualizationComponent);
    return MetricDetailVisualizationComponent;
}());



/***/ }),

/***/ "./src/app/shared/metric-overview/metric-overview.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/shared/metric-overview/metric-overview.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9tZXRyaWMtb3ZlcnZpZXcvbWV0cmljLW92ZXJ2aWV3LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/shared/metric-overview/metric-overview.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/shared/metric-overview/metric-overview.component.ts ***!
  \*********************************************************************/
/*! exports provided: MetricOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricOverviewComponent", function() { return MetricOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MetricOverviewComponent = /** @class */ (function () {
    function MetricOverviewComponent() {
        this.status = {
            isFirstOpen: false,
            isFirstDisabled: false
        };
    }
    MetricOverviewComponent.prototype.ngOnInit = function () {
    };
    MetricOverviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-metric-overview',
            template: __webpack_require__(/*! raw-loader!./metric-overview.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/metric-overview/metric-overview.component.html"),
            styles: [__webpack_require__(/*! ./metric-overview.component.css */ "./src/app/shared/metric-overview/metric-overview.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MetricOverviewComponent);
    return MetricOverviewComponent;
}());



/***/ }),

/***/ "./src/app/shared/open-refine/model/open-refine-project.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/open-refine/model/open-refine-project.ts ***!
  \*****************************************************************/
/*! exports provided: OpenRefineProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenRefineProject", function() { return OpenRefineProject; });
var OpenRefineProject = /** @class */ (function () {
    function OpenRefineProject(id, rows, columnModel, recordModel, overlayModels) {
        this.id = id;
        this.rows = rows;
        this.columnModel = columnModel;
        this.recordModel = recordModel;
        this.overlayModels = overlayModels;
    }
    return OpenRefineProject;
}());



/***/ }),

/***/ "./src/app/shared/open-refine/open-refine.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/shared/open-refine/open-refine.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "footer.footer {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: #f5f5f5; }\n\nmetric-accordion {\n  width: 95%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvc2hhcmVkL29wZW4tcmVmaW5lL29wZW4tcmVmaW5lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLFNBQVM7RUFDVCxXQUFXO0VBQ1gseUJBQXlCLEVBQUE7O0FBRzNCO0VBQ0ksVUFBVSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL29wZW4tcmVmaW5lL29wZW4tcmVmaW5lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZm9vdGVyLmZvb3RlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbn1cblxubWV0cmljLWFjY29yZGlvbiB7XG4gICAgd2lkdGg6IDk1JTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/open-refine/open-refine.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/open-refine/open-refine.component.ts ***!
  \*************************************************************/
/*! exports provided: OpenRefineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenRefineComponent", function() { return OpenRefineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _open_refine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var _raw_data_table_raw_data_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../raw-data-table/raw-data-table.component */ "./src/app/shared/raw-data-table/raw-data-table.component.ts");
/* harmony import */ var _global_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global-nav.service */ "./src/app/global-nav.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Observable Version
 // trigger, state, transition, style, animate, keyframes




var OpenRefineComponent = /** @class */ (function () {
    function OpenRefineComponent(route, router, openRefineService, globalNavService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.openRefineService = openRefineService;
        this.globalNavService = globalNavService;
        this.mode = 'Observable';
        this.state = 'inactive';
        this.expanded = false;
        this.sortBy = "none";
        globalNavService.recalc$.subscribe(function (recalc) {
            _this.openRefineService.evaluateMetrics(_this.projectId)
                .subscribe(function (metricsOverlayModel) {
                _this.openRefineProject.overlayModels['metricsOverlayModel'] = metricsOverlayModel;
                _this.updateProjectData(_this.openRefineProject);
            }, function (error) { return _this.errorMessage = error; });
        });
        // this.subscription = routineHelperService.sidebarShown$.subscribe(
        //   sidebarShown => {
        //     this.sidebarShown = sidebarShown;
        // });
    }
    OpenRefineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectId = this.route.snapshot.paramMap.get('projectId');
        this.getOpenRefineProject();
        this.getProjectMetadata();
        this.openRefineService.getRows(this.projectId, 0, 1).subscribe(function (rowModel) { return _this.rowModel = rowModel; });
    };
    OpenRefineComponent.prototype.ngOnChanges = function (changes) {
        console.log('change in comp');
        if ('metricsOverlayModel' in changes) {
            // this.openRefineService.evaluateMetrics(this.projectId)
            //   .subscribe(
            //     openRefineProject => updateProjectData(openRefineProject),
            //     error => this.errorMessage = <any>error
            //   );
            console.log('metrics overlay model changed');
        }
    };
    OpenRefineComponent.prototype.getOpenRefineProject = function () {
        var _this = this;
        this.openRefineService.getRefineProject(this.projectId)
            .subscribe(function (openRefineProject) {
            _this.openRefineProject = openRefineProject;
            _this.updateProjectData(openRefineProject);
        }, function (error) { return _this.errorMessage = error; });
    };
    OpenRefineComponent.prototype.getProjectMetadata = function () {
        var _this = this;
        this.openRefineService.getProjectMetadata(this.projectId)
            .subscribe(function (projectMetadata) { return _this.projectMetadata = projectMetadata; }, function (error) { return _this.errorMessage = error; });
    };
    OpenRefineComponent.prototype.sortMetricColumns = function () {
        var currentMetricColumns = this.openRefineProject.overlayModels.metricsOverlayModel.metricColumnNames;
        var sortedMetricColumns = [];
        var sortedColumns = [];
        var _loop_1 = function (col) {
            var metricColumn = this_1.openRefineProject.overlayModels.metricsOverlayModel.metricColumnNames.filter(function (mCol) {
                return col.name == mCol.columnName;
            });
            if (metricColumn[0]) {
                sortedMetricColumns.push(metricColumn[0]);
            }
            else {
                sortedMetricColumns.push({ columnName: col.name, metrics: {} });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.openRefineProject.columnModel.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            _loop_1(col);
        }
        if (this.sortBy == "sortByDirtiness") {
            sortedColumns = [];
            sortedMetricColumns = sortedMetricColumns.sort(function (a, b) {
                var valA = Object.keys(a.metrics).map(function (d) { return parseFloat(a.metrics[d].measure); }).reduce(function (pv, cv) { return pv + cv; }, 0);
                ;
                var valB = Object.keys(b.metrics).map(function (d) { return parseFloat(b.metrics[d].measure); }).reduce(function (pv, cv) { return pv + cv; }, 0);
                ;
                // if(a.value < b.value)
                //   return -1;
                // if (a.value > b.value)
                //   return 1;
                // return 0;
                return valB - valA;
            });
            var _loop_2 = function (metricCol) {
                var col = this_2.openRefineProject.columnModel.columns.find(function (value, idx, col) { return metricCol.columnName === value.name; });
                if (col)
                    sortedColumns.push(col);
            };
            var this_2 = this;
            for (var _b = 0, sortedMetricColumns_1 = sortedMetricColumns; _b < sortedMetricColumns_1.length; _b++) {
                var metricCol = sortedMetricColumns_1[_b];
                _loop_2(metricCol);
            }
            var _loop_3 = function (col) {
                var modelCol = sortedColumns.find(function (value, idx) {
                    return col.name === value.name;
                });
                if (!modelCol)
                    sortedColumns.push(modelCol);
            };
            for (var _c = 0, _d = this.openRefineProject.columnModel.columns; _c < _d.length; _c++) {
                var col = _d[_c];
                _loop_3(col);
            }
        }
        else if (this.sortBy == "sortByName") {
            //TODO
        }
        else {
            sortedColumns = [];
            sortedColumns.push.apply(sortedColumns, this.openRefineProject.columnModel.columns);
            sortedColumns = sortedColumns.sort(function (a, b) {
                return a.cellIndex - b.cellIndex;
            });
            sortedMetricColumns = [];
            var _loop_4 = function (col) {
                var metricCol = this_3.openRefineProject.overlayModels.metricsOverlayModel.metricColumnNames.filter(function (mCol) { return col.name == mCol.columnName; });
                if (metricCol[0])
                    sortedMetricColumns.push(metricCol[0]);
            };
            var this_3 = this;
            for (var _e = 0, sortedColumns_1 = sortedColumns; _e < sortedColumns_1.length; _e++) {
                var col = sortedColumns_1[_e];
                _loop_4(col);
            }
        }
        this.openRefineProject.columnModel.columns = sortedColumns;
        this.openRefineProject.overlayModels.metricsOverlayModel.metricColumnNames = sortedMetricColumns;
    };
    OpenRefineComponent.prototype.handleTableHeightUpdated = function (newOffsetTop) {
        this.detailViewOffsetTop = newOffsetTop;
    };
    OpenRefineComponent.prototype.handleSelectionUpdated = function (selection) {
        var _this = this;
        this.selectedMetrics = selection.metrics;
        this.selectedColumns = selection.columns;
        var _loop_5 = function (i) {
            if (Array.isArray(this_4.selectedColumns[i])) {
                for (var spanIdx = 0; spanIdx < this_4.openRefineProject.overlayModels.metricsOverlayModel.spanningMetrics.length; spanIdx++) {
                    if (this_4.openRefineProject.overlayModels.metricsOverlayModel.spanningMetrics[spanIdx].name == this_4.selectedMetrics[i].name) {
                        this_4.openRefineProject.overlayModels.metricsOverlayModel.spanningMetrics[spanIdx] = this_4.selectedMetrics[i];
                        break;
                    }
                }
            }
            else {
                var metricColumn = this_4.openRefineProject.overlayModels.metricsOverlayModel.metricColumnNames.filter(function (mCol) {
                    return _this.selectedColumns[i] == mCol.columnName;
                });
                metricColumn[0].metrics[this_4.selectedMetrics[i].name] = this_4.selectedMetrics[i];
            }
        };
        var this_4 = this;
        for (var i = 0; i < this.selectedColumns.length; ++i) {
            _loop_5(i);
        }
    };
    OpenRefineComponent.prototype.handleOverviewSelection = function (selectedMetrics) {
        this.selectedMetrics = selectedMetrics.metrics;
        this.selectedColumns = selectedMetrics.columns;
    };
    OpenRefineComponent.prototype.handleDataRowsSelected = function (selectedRows) {
        this.rawDataTable.scrollRows(selectedRows);
    };
    OpenRefineComponent.prototype.handleDataRowsPageChanged = function (pages) {
        this.rowsFrom = pages.from;
        this.rowsTo = pages.to;
    };
    OpenRefineComponent.prototype.handleSort = function (sortBy) {
        this.sortBy = sortBy;
        this.updateProjectData(this.openRefineProject);
    };
    OpenRefineComponent.prototype.toggleMove = function () {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
        this.expanded = (this.state === 'inactive' ? false : true);
    };
    //TODO: add edit commands with @Output functions
    OpenRefineComponent.prototype.updateProjectData = function (openRefineProject) {
        this.sortMetricColumns();
        // this.openRefineService.model = this.openRefineProject.overlayModels.metricsOverlayModel;
        var colorbrewer = __webpack_require__(/*! colorbrewer */ "./node_modules/colorbrewer/index.js");
        var colColors = colorbrewer.Reds[((this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics.length < 3) ? 3 : this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics.length)];
        var spanColors = colorbrewer.Oranges[((this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics.length < 3) ? 3 : this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics.length)];
        this.columnMetricColors = {};
        this.spanMetricColors = {};
        for (var m in this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics) {
            this.columnMetricColors[this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics[m]] = colColors[m];
        }
        for (var m in this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics) {
            this.spanMetricColors[this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics[m]] = spanColors[m];
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_raw_data_table_raw_data_table_component__WEBPACK_IMPORTED_MODULE_3__["RawDataTableComponent"], { static: false }),
        __metadata("design:type", _raw_data_table_raw_data_table_component__WEBPACK_IMPORTED_MODULE_3__["RawDataTableComponent"])
    ], OpenRefineComponent.prototype, "rawDataTable", void 0);
    OpenRefineComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'metrics-overlay-model',
            template: __webpack_require__(/*! raw-loader!./open-refine.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/open-refine/open-refine.component.html"),
            providers: [_open_refine_service__WEBPACK_IMPORTED_MODULE_2__["OpenRefineService"]],
            styles: [".error {color:red;}", __webpack_require__(/*! ./open-refine.component.scss */ "./src/app/shared/open-refine/open-refine.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _open_refine_service__WEBPACK_IMPORTED_MODULE_2__["OpenRefineService"],
            _global_nav_service__WEBPACK_IMPORTED_MODULE_4__["GlobalNavService"]])
    ], OpenRefineComponent);
    return OpenRefineComponent;
}());



/***/ }),

/***/ "./src/app/shared/open-refine/open-refine.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/open-refine/open-refine.service.ts ***!
  \***********************************************************/
/*! exports provided: OpenRefineService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenRefineService", function() { return OpenRefineService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { Component, OnInit } from '@angular/core';
// @Component({
//   selector: 'app-open-refine',
//   templateUrl: './open-refine.component.html',
//   styleUrls: ['./open-refine.component.css']
// })
var OpenRefineService = /** @class */ (function () {
    function OpenRefineService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.openRefineServerUrl = 'http://localhost:3333/command/';
        // this.params = new URLSearchParams();
        // //TODO: replace with variable parameter
    }
    OpenRefineService.prototype.extractData = function (res) {
        // response => <string[]> response.json()[1];
        var body = res.json();
        if (body.availableMetrics
            && body.availableSpanningMetrics
            && body.computeDuplicates
            && body.metricColumnNames
            && body.spanningMetrics) {
            this.model = body;
        }
        return body || {};
    };
    OpenRefineService.prototype.createOpenRefineMetricsProject = function (projectName, projectId, commit_short, format, separator, content) {
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
        // let data = {
        //   'project-name': projectName,
        //   'format': format,
        //   'project-file': content
        // }
        var opt = {
            guessCellValueTypes: true,
            projectTags: [projectId, commit_short],
            ignoreLines: -1,
            processQuotes: true,
            fileSource: content,
            encoding: "",
            separator: separator,
            storeBlankCellsAsNulls: true,
            storeBlankRows: true,
            skipDataLines: 0,
            includeFileSources: false,
            headerLines: 1,
            limit: -1,
            projectName: projectName
        };
        var body = new FormData();
        body.append("download", content);
        params.set("project-name", projectName);
        params.set("format", format);
        params.set("options", JSON.stringify(opt));
        params.set("project-file", content);
        return this.http.post(this.openRefineServerUrl + 'core/create-project-from-upload', body, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.setupProject = function (projectId, metricFunctions) {
        var params = this.initializeParams(projectId);
        params.set('computeDuplicates', 'false');
        // new HttpParams().set('metricsConfigList', JSON.stringify(metricFunctions))
        if (metricFunctions)
            params.set('metricsConfigList', JSON.stringify(metricFunctions));
        // let body = new FormData();
        // body.append("metricsConfigList", );
        return this.http.post(this.openRefineServerUrl + 'metric-doc/createMetricsExtension', params) //{ metricsConfigList: JSON.stringify(metricFunctions)}, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.recommendMetrics = function (projectId) {
        var params = this.initializeParams(projectId);
        return this.http.get(this.openRefineServerUrl + 'metric-doc/recommend-metrics', { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getAllProjectMetadata = function () {
        return this.http.get(this.openRefineServerUrl + 'core/get-all-project-metadata', {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getOverlayModel = function (projectId) {
        return this.http.get(this.openRefineServerUrl + 'metric-doc/getMetricsOverlayModel', { search: this.initializeParams(projectId) })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getProjectMetadata = function (projectId) {
        return this.http.get(this.openRefineServerUrl + 'core/get-project-metadata', { search: this.initializeParams(projectId) })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getRefineProject = function (projectId) {
        return this.http.get(this.openRefineServerUrl + 'core/get-models', { search: this.initializeParams(projectId) })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getHistory = function (projectId) {
        return this.http.get(this.openRefineServerUrl + 'core/get-history', { search: this.initializeParams(projectId) })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getRows = function (projectId, first, limit) {
        var params = this.initializeParams(projectId);
        params.set('project', projectId);
        params.set('start', first);
        params.set('limit', limit);
        return this.http.get(this.openRefineServerUrl + 'core/get-rows', { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.updateMetric = function (projectId, metric, column) {
        var params = this.initializeParams(projectId);
        params.set('metric', JSON.stringify(metric));
        if (column instanceof Array) {
            params.set('columns', JSON.stringify(column));
        }
        else {
            params.set('column', column);
        }
        return this.http.post(this.openRefineServerUrl + 'metric-doc/updateMetric', params)
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.deleteMetric = function (projectId, metric, column) {
        var params = this.initializeParams(projectId);
        params.set('metricName', metric.name);
        if (column instanceof Array) {
            params.set('columns', JSON.stringify(column));
        }
        else {
            params.set('column', column);
        }
        return this.http.post(this.openRefineServerUrl + 'metric-doc/deleteMetric', params)
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.evaluateMetrics = function (projectId) {
        return this.http.post(this.openRefineServerUrl + 'metric-doc/evaluateMetrics', this.initializeParams(projectId))
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.evaluateSelection = function (projectId, metricSelection, columnSelection) {
        var selection = [];
        for (var selIdx = 0; selIdx < metricSelection.length; ++selIdx) {
            metricSelection[selIdx].dirtyIndices = [];
            metricSelection[selIdx].measure = 0;
            if (columnSelection[selIdx] instanceof Array) {
                selection.push({ metric: JSON.stringify(metricSelection[selIdx]), columns: JSON.stringify(columnSelection[selIdx]) });
            }
            else {
                selection.push({ metric: JSON.stringify(metricSelection[selIdx]), column: columnSelection[selIdx] });
            }
        }
        var params = this.initializeParams(projectId);
        params.set('selection', JSON.stringify(selection));
        return this.http.post(this.openRefineServerUrl + 'metric-doc/evaluateSelectedMetric', params)
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.previewExpression = function (projectId, expression, cellIdx) {
        var rowIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var params = this.initializeParams(projectId);
        params.set('rowIndices', JSON.stringify(rowIdx));
        params.set('expression', 'grel:' + expression);
        params.set('cellIndex', cellIdx);
        return this.http.post(this.openRefineServerUrl + 'core/preview-expression', params)
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getMetricDocFunctionsOverview = function () {
        return this.http.get(this.openRefineServerUrl + 'metric-doc/get-metricdoc-language-info')
            .map(this.extractData)
            .catch(this.handleError);
    };
    OpenRefineService.prototype.getProvenanceJSON = function (path) {
        this.http.get(path)
            .toPromise()
            .then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log(err);
        });
    };
    OpenRefineService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof _angular_http__WEBPACK_IMPORTED_MODULE_1__["Response"]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errormsg = JSON.parse(body.message);
            errMsg = "" + (errormsg.message || '');
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return rxjs_Rx__WEBPACK_IMPORTED_MODULE_2__["Observable"].throw(errMsg);
    };
    OpenRefineService.prototype.initializeParams = function (projectId) {
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
        params.set('project', projectId);
        return params;
    };
    OpenRefineService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_http__WEBPACK_IMPORTED_MODULE_1__["Jsonp"]])
    ], OpenRefineService);
    return OpenRefineService;
}());



/***/ }),

/***/ "./src/app/shared/quality-header-col/quality-header-col.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/shared/quality-header-col/quality-header-col.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9xdWFsaXR5LWhlYWRlci1jb2wvcXVhbGl0eS1oZWFkZXItY29sLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/shared/quality-header-col/quality-header-col.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/shared/quality-header-col/quality-header-col.component.ts ***!
  \***************************************************************************/
/*! exports provided: QualityHeaderColComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualityHeaderColComponent", function() { return QualityHeaderColComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QualityHeaderColComponent = /** @class */ (function () {
    function QualityHeaderColComponent(element) {
        this.element = element;
        this.htmlElement = this.element.nativeElement;
        this.host = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.element.nativeElement);
    }
    QualityHeaderColComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var cellWidth = this.htmlElement.offsetWidth - 1;
        var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.htmlElement).select("svg");
        svg.data(this.metricsOverlayModel.metrics[this.metricCol][this.metric]);
        svg.attr("height", 26)
            .on("mouseover", function (d) {
            if (_this.metricsOverlayModel.metrics[_this.metricCol][_this.metric]) {
                var currentMetric_1 = _this.metricsOverlayModel.metrics[_this.metricCol][_this.metric];
                var tooltipNode = d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").node();
                d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").html(function (d) {
                    var text = "<span style='color:steelblue'>" + currentMetric_1.name + "</span><br>" +
                        "Metric Value: <span style='color:steelblue'>" + currentMetric_1.measure + "</span><br>" +
                        "Number of Checks: <span style='color:steelblue'>" + currentMetric_1.evalTuples.length + "</span><br>";
                    if (currentMetric_1.dirtyIndices != null) {
                        text += "Erroneous Entries: <span style='color:steelblue'>" + currentMetric_1.dirtyIndices.length + "</span><br>";
                    }
                    text += "Data Type: <span style='color:steelblue'>" + currentMetric_1.datatype + "</span>";
                    return text;
                })
                    // .transition()
                    //   .duration(100)
                    .style("left", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX - tooltipNode.scrollWidth) + "px")
                    .style("top", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY) + "px")
                    .style("opacity", .9);
                // //offset is strangely dependent on elements in svg, hence we need to offset it so the proper position
                // .offset([-10, (this.htmlElement.offsetWidth/2) - ((this.metricCol.metrics[this.metric].measure*cellWidth)/2)])
                // .show(svg.data(), svg.node());
            }
        })
            .on("mouseout", function () {
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").transition()
                .duration(100)
                .style("opacity", 0);
        })
            .on("mouseleave", function () {
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").transition()
                .duration(100)
                .style("opacity", 0);
        });
        if (this.metricsOverlayModel.metrics[this.metricCol][this.metric]) {
            svg.selectAll("rect").remove();
            var rect = svg.append("rect")
                .classed("metric", true)
                .attr("height", 26)
                .attr("width", this.metricsOverlayModel.metrics[this.metricCol][this.metric].measure * cellWidth)
                .style("fill", function (d, i, siblings) {
                // let metric = siblings[i].parentNode.__data__;
                return _this.columnMetricColors[_this.metric];
            });
        }
    };
    QualityHeaderColComponent.prototype.ngAfterContentChecked = function () {
        var cellWidth = this.htmlElement.offsetWidth - 1;
        var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.htmlElement).select("svg");
        if (this.metricsOverlayModel.metrics[this.metricCol][this.metric]) {
            svg.selectAll("rect").attr("width", this.metricsOverlayModel.metrics[this.metricCol][this.metric].measure * cellWidth);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityHeaderColComponent.prototype, "metricCol", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityHeaderColComponent.prototype, "metric", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityHeaderColComponent.prototype, "metricsOverlayModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityHeaderColComponent.prototype, "columnMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QualityHeaderColComponent.prototype, "svgWidth", void 0);
    QualityHeaderColComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: '[metric-col]',
            template: __webpack_require__(/*! raw-loader!./quality-header-col.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/quality-header-col/quality-header-col.component.html"),
            styles: [__webpack_require__(/*! ./quality-header-col.component.css */ "./src/app/shared/quality-header-col/quality-header-col.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], QualityHeaderColComponent);
    return QualityHeaderColComponent;
}());



/***/ }),

/***/ "./src/app/shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "rect {\n  pointer-events: all;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3Jhdy1kYXRhLXNjcm9sbC1iYXItdmlzdWFsaXphdGlvbi9yYXctZGF0YS1zY3JvbGwtYmFyLXZpc3VhbGl6YXRpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9yYXctZGF0YS1zY3JvbGwtYmFyLXZpc3VhbGl6YXRpb24vcmF3LWRhdGEtc2Nyb2xsLWJhci12aXN1YWxpemF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJyZWN0IHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: RawDataScrollBarVisualizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RawDataScrollBarVisualizationComponent", function() { return RawDataScrollBarVisualizationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RawDataScrollBarVisualizationComponent = /** @class */ (function () {
    function RawDataScrollBarVisualizationComponent(element) {
        this.element = element;
        this.colOffset = [];
        this.htmlElement = this.element.nativeElement;
        this.host = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.element.nativeElement);
    }
    RawDataScrollBarVisualizationComponent.prototype.ngOnInit = function () {
    };
    RawDataScrollBarVisualizationComponent.prototype.ngOnChanges = function (changes) {
        if ('metricsOverlayModel' in changes) {
            this.fillCols();
        }
        if ('rowsFrom' in changes) {
            this.fillScrollVis();
            this.updateOverlayPositions();
        }
        if ('colWidths' in changes && 'bodyHeight' in changes) {
            this.updateOverlayPositions();
        }
    };
    RawDataScrollBarVisualizationComponent.prototype.fillCols = function () {
        var _this = this;
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.htmlElement)
            .selectAll('g.metrics-overlay')
            .remove();
        this.overlay = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.htmlElement)
            .selectAll('g.metrics-overlay')
            .data(function (d) {
            return Object.keys(_this.metricsOverlayModel.metrics);
        })
            .enter().append('g')
            .attr('class', 'metrics-overlay');
        // .attr('transform', (d, i) => { return 'translate(' + d.offset + ',0)' })
        this.columns = this.overlay.selectAll('.metrics-overlay-col')
            .data(function (d) {
            if (d) {
                var metrics = [];
                for (var key in d.metrics) {
                    if (d.metrics[key].dirtyIndices) {
                        metrics.push(d.metrics[key]);
                    }
                }
                if (_this.metricsOverlayModel.spanningMetrics) {
                    for (var _i = 0, _a = _this.metricsOverlayModel.spanningMetrics; _i < _a.length; _i++) {
                        var spanMetric = _a[_i];
                        if (spanMetric.spanningColumns.indexOf(d.columnName) > -1) {
                            metrics.push(spanMetric);
                        }
                    }
                }
                return metrics;
            }
            return [];
        })
            .enter().append('g')
            .attr('class', 'metrics-overlay-col')
            .attr('class', function (d, i) { return d.name; })
            .attr('transform', function (d, i) {
            var colOffset = 0;
            if (d.dirtyIndices != null) {
                colOffset = colOffset + (12 * (i + 1));
            }
            return 'translate(-' + colOffset + ',0)';
        })
            .attr('display', function (d, i) {
            if (!d.dirtyIndices)
                return 'none';
        });
        // set background
        this.columns.append('rect')
            .attr('height', this.bodyHeight)
            .attr('width', 12)
            .attr('fill', function (d) {
            var from = _this.rowsFrom;
            var to = _this.rowsFrom + _this.itemsPerPage;
            if (d.dirtyIndices) {
                var inRange = d.dirtyIndices.filter(function (d, i) {
                    return d.index >= from && d.index <= to;
                });
                if (inRange.length > 0) {
                    return 'white';
                }
            }
            return 'transparent';
        });
        // left line
        this.frameContainer = this.overlay.filter(function (d, i) {
            var from = _this.rowsFrom;
            var to = _this.rowsFrom + _this.itemsPerPage;
            for (var key in d.metrics) {
                if (d.metrics[key].dirtyIndices) {
                    var inRange = d.metrics[key].dirtyIndices.filter(function (d, i) {
                        return d.index >= from && d.index <= to;
                    });
                    if (inRange.length > 0)
                        return d;
                }
            }
            if (_this.metricsOverlayModel.spanningMetrics) {
                for (var _i = 0, _a = _this.metricsOverlayModel.spanningMetrics; _i < _a.length; _i++) {
                    var spanMetric = _a[_i];
                    if (spanMetric.spanningColumns.indexOf(d.columnName) > -1 && spanMetric.dirtyIndices) {
                        var inRange = spanMetric.dirtyIndices.filter(function (d, i) {
                            return d.index >= from && d.index <= to;
                        });
                        if (inRange.length > 0)
                            return d;
                    }
                }
            }
        });
    };
    RawDataScrollBarVisualizationComponent.prototype.updateOverlayPositions = function () {
        var _this = this;
        var from = this.rowsFrom;
        var to = this.rowsFrom + this.itemsPerPage;
        this.overlayScaleY = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
            .domain([to, from])
            .rangeRound([(this.bodyHeight), 0]);
        if (this.frameContainer)
            this.frameContainer.selectAll('line').remove();
        this.frameContainer = this.overlay.filter(function (d, i) {
            var from = _this.rowsFrom;
            var to = _this.rowsFrom + _this.itemsPerPage;
            for (var key in d.metrics) {
                if (d.metrics[key].dirtyIndices) {
                    var inRange = d.metrics[key].dirtyIndices.filter(function (d, i) {
                        return d.index >= from && d.index <= to;
                    });
                    if (inRange.length > 0)
                        return d;
                }
            }
            if (_this.metricsOverlayModel.spanningMetrics) {
                for (var _i = 0, _a = _this.metricsOverlayModel.spanningMetrics; _i < _a.length; _i++) {
                    var spanMetric = _a[_i];
                    if (spanMetric.spanningColumns.indexOf(d.columnName) > -1 && spanMetric.dirtyIndices) {
                        if (spanMetric.dirtyIndices.length > 0) {
                            var inRange = spanMetric.dirtyIndices.filter(function (d, i) {
                                return d.index >= from && d.index <= to;
                            });
                            if (inRange.length > 0)
                                return d;
                        }
                    }
                }
            }
        });
        this.overlay.attr('transform', function (d, i, elements) {
            if (_this.colWidths.length > 0) {
                var width = 0;
                for (var colIt = 0; colIt <= i + 1; colIt++) {
                    width += _this.colWidths[colIt];
                }
                return 'translate(' + (width - 4) + ',0)';
            }
        });
        this.columns.selectAll('rect')
            .attr('height', this.bodyHeight);
        this.metricElements.attr('height', this.bodyHeight / this.itemsPerPage)
            .attr('y', function (d) {
            return _this.overlayScaleY(d.index);
        });
        if (this.colWidths.length > 0) {
            this.frameContainer.append('line')
                .attr('x1', function (d) {
                var colWidth = 1;
                for (var key in d.metrics) {
                    if (d.metrics[key].dirtyIndices) {
                        colWidth += 12;
                    }
                }
                if (_this.metricsOverlayModel.spanningMetrics) {
                    for (var _i = 0, _a = _this.metricsOverlayModel.spanningMetrics; _i < _a.length; _i++) {
                        var spanMetric = _a[_i];
                        if (spanMetric.spanningColumns.indexOf(d.columnName) > -1) {
                            if (spanMetric.dirtyIndices)
                                colWidth += 12;
                        }
                    }
                }
                return -colWidth;
            })
                .attr('x2', function (d) {
                var colWidth = 1;
                for (var key in d.metrics) {
                    if (d.metrics[key].dirtyIndices) {
                        colWidth += 12;
                    }
                }
                if (_this.metricsOverlayModel.spanningMetrics) {
                    for (var _i = 0, _a = _this.metricsOverlayModel.spanningMetrics; _i < _a.length; _i++) {
                        var spanMetric = _a[_i];
                        if (spanMetric.spanningColumns.indexOf(d.columnName) > -1) {
                            if (spanMetric.dirtyIndices)
                                colWidth += 12;
                        }
                    }
                }
                return -colWidth;
            })
                .attr('y1', 0)
                .attr('y2', this.bodyHeight)
                .attr('stroke', '#ddd')
                .attr('stroke-width', '2');
            // right line line
            this.frameContainer.append('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', this.bodyHeight)
                .attr('stroke', '#ddd')
                .attr('stroke-width', '2');
        }
    };
    RawDataScrollBarVisualizationComponent.prototype.fillScrollVis = function () {
        var _this = this;
        var from = this.rowsFrom;
        var to = this.rowsFrom + this.itemsPerPage;
        var cols = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.htmlElement)
            .selectAll('g.metrics-overlay')
            .selectAll('g')
            .selectAll('g');
        d3__WEBPACK_IMPORTED_MODULE_1__["selectAll"]('rect.metrics-bin').remove();
        // Define the div for the tooltip
        this.metricElements = cols.data(function (d) {
            if (d.dirtyIndices) {
                if (d.concat === 'AND' && d.dirtyIndices.length > 1) {
                    return d.dirtyIndices.filter(function (d, i) {
                        return (d.index >= from && d.index <= to) && d.dirty.indexOf(true) == -1;
                    });
                }
                else {
                    return d.dirtyIndices.filter(function (d, i) {
                        return d.index >= from && d.index <= to;
                    });
                }
            }
            else {
                return [];
            }
        })
            .enter()
            .append('rect')
            .attr('class', 'metrics-bin')
            .attr('width', 12)
            .attr('pointer-events', 'all')
            .style('fill', function (d, i, siblings) {
            return _this.fillRect(siblings[i].parentNode.__data__);
        })
            .on('mouseover', function (d, i, siblings) {
            var rec = d3__WEBPACK_IMPORTED_MODULE_1__["select"](siblings[i]).style('fill', 'steelblue');
            // this.tooltip.html( d => {
            //     var text = '<span style="color:steelblue">Row: </span><span>'+ (d[0].index + 1) + ' </span>' ;
            //     return text;
            //   })
            //   //offset is strangely dependent on elements in svg, hence we need to offset it to the proper position
            //   .offset([-10, 0])
            //   .show(rec.data(), rec.node());
            var tooltipNode = d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").node();
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip")
                .html('<span style="color:steelblue">Row: </span><span>' + (d.index + 1) + ' </span>')
                .transition()
                .duration(100)
                .style("opacity", .9)
                .style("left", (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX - tooltipNode.scrollWidth) + "px")
                .style("top", d3__WEBPACK_IMPORTED_MODULE_1__["event"].clientY + "px");
        })
            .on('mouseout', function (d, i, siblings) {
            var rec = d3__WEBPACK_IMPORTED_MODULE_1__["select"](siblings[i]).style('fill', function (d, i, siblings) {
                return _this.fillRect(siblings[i].parentNode.__data__);
            });
            // this.tooltip.hide();
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").transition()
                .duration(100)
                .style("opacity", 0);
        })
            .on('mouseleave', function (data) {
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").select("div.d3tooltip").transition()
                .duration(100)
                .style("opacity", 0);
        });
    };
    RawDataScrollBarVisualizationComponent.prototype.fillRect = function (metric) {
        if (metric.spanningColumns) {
            if (this.spanMetricColors[metric.name])
                return this.spanMetricColors[metric.name];
        }
        else {
            if (this.columnMetricColors[metric.name])
                return this.columnMetricColors[metric.name];
        }
        return "#ce6dbd";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataScrollBarVisualizationComponent.prototype, "metricsOverlayModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], RawDataScrollBarVisualizationComponent.prototype, "colWidths", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataScrollBarVisualizationComponent.prototype, "bodyHeight", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RawDataScrollBarVisualizationComponent.prototype, "rowsFrom", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RawDataScrollBarVisualizationComponent.prototype, "itemsPerPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataScrollBarVisualizationComponent.prototype, "columnMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataScrollBarVisualizationComponent.prototype, "spanMetricColors", void 0);
    RawDataScrollBarVisualizationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: '[scroll-bar-vis]',
            template: '',
            styles: [__webpack_require__(/*! ./raw-data-scroll-bar-visualization.component.css */ "./src/app/shared/raw-data-scroll-bar-visualization/raw-data-scroll-bar-visualization.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], RawDataScrollBarVisualizationComponent);
    return RawDataScrollBarVisualizationComponent;
}());



/***/ }),

/***/ "./src/app/shared/raw-data-table/raw-data-table.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/shared/raw-data-table/raw-data-table.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.raw-data-table-footer {\n  /*border: 1px solid black;*/\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  white-space: nowrap;\n  position: relative; }\n\ndiv.raw-data-container {\n  overflow-x: scroll;\n  position: relative;\n  width: 100%; }\n\nth.metric-overview-col:hover {\n  background: lightgrey; }\n\nth.metric-overview-col.active {\n  background: lightgrey;\n  border-color: steelblue; }\n\ntable.metrics-overview {\n  margin: 0px; }\n\ntable.metrics-overview thead, table.metrics-overview tbody {\n    display: block;\n    margin-right: 15px; }\n\ntable.metrics-overview thead th.active {\n    background: lightgrey;\n    border-color: steelblue; }\n\ntable.metrics-overview tbody {\n    height: 400px;\n    overflow-y: auto;\n    margin-right: 0px; }\n\ntable.metrics-overview tbody tr.highlight {\n      background: lightgrey;\n      color: steelblue; }\n\ntable.metrics-overview tbody.disabled {\n    background: lightgrey; }\n\ntable.metrics-overview tbody.disabled tr {\n      color: darkgrey; }\n\ntable.spanning-metrics-overview {\n  margin-right: 0px;\n  margin-bottom: 0px; }\n\nsvg.table-overlay {\n  height: 400px;\n  position: absolute;\n  pointer-events: none; }\n\nsvg.table-overlay.disabled {\n  display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaHJpc3RpYW5ib3JzL1Byb2plY3RzL21ldHJpY2RvY19hbmd1bGFyL3NyYy9hcHAvc2hhcmVkL3Jhdy1kYXRhLXRhYmxlL3Jhdy1kYXRhLXRhYmxlLmNvbXBvbmVudC5zY3NzIiwiL1VzZXJzL2NocmlzdGlhbmJvcnMvUHJvamVjdHMvbWV0cmljZG9jX2FuZ3VsYXIvc3JjL2FwcC9zaGFyZWQvX2dsb2JhbHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLDJCQUFBO0VBQ0EsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsV0FBVyxFQUFBOztBQUdmO0VBQ0kscUJBQXFCLEVBQUE7O0FBR3pCO0VBQ0kscUJBQXFCO0VBQ3JCLHVCQUF1QixFQUFBOztBQUczQjtFQUNJLFdBQVcsRUFBQTs7QUFEZjtJQUlRLGNBQWM7SUFDZCxrQkFBa0IsRUFBQTs7QUFMMUI7SUFVWSxxQkFBcUI7SUFDckIsdUJBQXVCLEVBQUE7O0FBWG5DO0lBZ0JRLGFDMUNlO0lEMkNmLGdCQUFnQjtJQUNoQixpQkFBaUIsRUFBQTs7QUFsQnpCO01BcUJZLHFCQUFxQjtNQUNyQixnQkFBZ0IsRUFBQTs7QUF0QjVCO0lBMkJRLHFCQUFxQixFQUFBOztBQTNCN0I7TUE4QlksZUFBZSxFQUFBOztBQUszQjtFQUNJLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxhQ25FbUI7RURvRW5CLGtCQUFrQjtFQUNsQixvQkFBb0IsRUFBQTs7QUFHeEI7RUFDSSxhQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvcmF3LWRhdGEtdGFibGUvcmF3LWRhdGEtdGFibGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vZ2xvYmFsc1wiO1xuXG5kaXYucmF3LWRhdGEtdGFibGUtZm9vdGVyIHtcbiAgICAvKmJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyovXG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbmRpdi5yYXctZGF0YS1jb250YWluZXIge1xuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbnRoLm1ldHJpYy1vdmVydmlldy1jb2w6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JleTtcbn1cblxudGgubWV0cmljLW92ZXJ2aWV3LWNvbC5hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JleTtcbiAgICBib3JkZXItY29sb3I6IHN0ZWVsYmx1ZTtcbn1cblxudGFibGUubWV0cmljcy1vdmVydmlldyB7XG4gICAgbWFyZ2luOiAwcHg7XG5cbiAgICB0aGVhZCwgdGJvZHkgeyBcbiAgICAgICAgZGlzcGxheTogYmxvY2s7IFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gICAgfVxuXG4gICAgdGhlYWQge1xuICAgICAgICB0aC5hY3RpdmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogbGlnaHRncmV5O1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiBzdGVlbGJsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0Ym9keSB7XG4gICAgICAgIGhlaWdodDogJHJhdy1kYXRhLWhlaWdodDtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XG5cbiAgICAgICAgdHIuaGlnaGxpZ2h0IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JleTtcbiAgICAgICAgICAgIGNvbG9yOiBzdGVlbGJsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0Ym9keS5kaXNhYmxlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JleTtcblxuICAgICAgICB0ciB7XG4gICAgICAgICAgICBjb2xvcjogZGFya2dyZXk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnRhYmxlLnNwYW5uaW5nLW1ldHJpY3Mtb3ZlcnZpZXcge1xuICAgIG1hcmdpbi1yaWdodDogMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbn1cblxuc3ZnLnRhYmxlLW92ZXJsYXkge1xuICAgIGhlaWdodDogJHJhdy1kYXRhLWhlaWdodDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbnN2Zy50YWJsZS1vdmVybGF5LmRpc2FibGVkIHtcbiAgICBkaXNwbGF5OiBub25lO1xufSIsIiRyYXctZGF0YS1oZWlnaHQ6IDQwMHB4OyJdfQ== */"

/***/ }),

/***/ "./src/app/shared/raw-data-table/raw-data-table.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/shared/raw-data-table/raw-data-table.component.ts ***!
  \*******************************************************************/
/*! exports provided: RawDataTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RawDataTableComponent", function() { return RawDataTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var _open_refine_model_open_refine_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../open-refine/model/open-refine-project */ "./src/app/shared/open-refine/model/open-refine-project.ts");
/* harmony import */ var ngx_contextmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-contextmenu */ "./node_modules/ngx-contextmenu/fesm5/ngx-contextmenu.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RawDataTableComponent = /** @class */ (function () {
    function RawDataTableComponent(openRefineService, contextMenuService) {
        this.openRefineService = openRefineService;
        this.contextMenuService = contextMenuService;
        // metricsOverlayModel:MetricsOverlayModel;
        this.objectKeys = Object.keys;
        this.colWidths = [];
        this.maxSize = 5;
        this.page = 1;
        this.itemsPerPage = 100;
        this.rowsFrom = 0;
        this.disabled = false;
        this.overlayOffsetTop = 0;
        this.overlayWidth = 0;
        this.bodyHeight = 0;
        this.colOffset = [];
        this.onOverviewMetricSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.tableHeightChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageChangedEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.sortEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updated = false;
        this.changeDetected = false;
    }
    RawDataTableComponent.prototype.ngOnInit = function () {
        this.pageChanged({
            page: this.page,
            itemsPerPage: this.itemsPerPage
        });
        this.selectedMetricCells = {};
        this.selectedMetrics = [];
    };
    RawDataTableComponent.prototype.ngAfterContentChecked = function () {
        // the header widhts are added to the column widths only after initializing offsets
        this.calculateColWidths();
    };
    RawDataTableComponent.prototype.ngAfterViewChecked = function () {
        if (this.updated) {
            this.highlightRows();
            if (this.highlightedRows && this.highlightedRows.length > 0)
                this.scrollToRow(this.highlightedRows[0]);
            this.updated = false;
        }
        d3__WEBPACK_IMPORTED_MODULE_4__["selectAll"]('table.metrics-overview thead tr.overview-row th')
            .data(this.colWidths)
            .each(function (data, index) {
            d3__WEBPACK_IMPORTED_MODULE_4__["select"](this).select('svg')
                .style('width', data);
        });
    };
    RawDataTableComponent.prototype.ngDoCheck = function () {
        if (this.project) {
            if (this.project.columnModel.columns !== this.oldColumns) {
                this.changeDetected = true;
                this.colOffset = [];
                this.oldColumns = this.project.columnModel.columns;
            }
            this.changeDetected = false;
        }
    };
    RawDataTableComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.page = event.page;
        this.rowsFrom = ((this.page - 1) * this.itemsPerPage);
        this.openRefineService.getRows(this.projectId, this.rowsFrom, this.itemsPerPage)
            .subscribe(function (rowModel) {
            _this.rowModel = rowModel;
            _this.updated = true;
            _this.disabled = false;
        });
        this.pageChangedEmitter.emit({ from: this.rowsFrom, to: (this.rowsFrom + this.itemsPerPage) });
    };
    RawDataTableComponent.prototype.onContextMenu = function ($event, item, metric) {
        this.contextColumn = item.columnName;
        var metricContext = item.metrics[metric];
        if (metricContext) {
            this.contextMenuService.show.next({
                // Optional - if unspecified, all context menu components will open
                contextMenu: this.existingMenu,
                event: $event,
                item: metricContext
            });
        }
        else {
            this.contextMenuService.show.next({
                contextMenu: this.newMenu,
                event: $event,
                item: metric
            });
        }
        $event.preventDefault();
        $event.stopPropagation();
        // this.contextMenuService.show.next({
        //   actions: this.menuOptions,
        //   event: $event,
        //   item: item
        // });
    };
    RawDataTableComponent.prototype.onClickOverview = function ($event, item, cellIndex) {
        var previousMetrics = this.selectedMetrics;
        var previousColumns = this.selectedColumns;
        this.selectedColumns = [];
        this.selectedMetrics = [];
        if ($event.shiftKey) {
            this.selectedMetrics = this.selectedMetrics.concat(previousMetrics);
            this.selectedColumns = this.selectedColumns.concat(previousColumns);
        }
        else {
            this.selectedMetricCells = {};
        }
        if (!this.selectedMetricCells[item]) {
            this.selectedMetricCells[item] = [cellIndex];
        }
        else {
            this.selectedMetricCells[item].push(cellIndex);
        }
        if (item.spanningColumns) {
            this.selectedMetrics.push(item);
            this.selectedColumns.push(item.spanningColumns);
        }
        else {
            this.selectedMetrics.push(this.project.overlayModels.metricsOverlayModel.metricColumnNames[cellIndex].metrics[item]);
            this.selectedColumns.push(this.project.overlayModels.metricsOverlayModel.metricColumnNames[cellIndex].columnName);
        }
        this.onOverviewMetricSelected.emit({ metrics: this.selectedMetrics, columns: this.selectedColumns });
        this.tableHeightChanged.emit(this.colHead.nativeElement.getBoundingClientRect().height + this.spanHead.nativeElement.getBoundingClientRect().height);
    };
    RawDataTableComponent.prototype.onClickRect = function ($event) {
        var rect = $event.target;
        this.highlightedRows = [];
        this.highlightedRows.push(rect.__data__.index);
        this.scrollToRow(rect.__data__.index);
        this.highlightRows();
    };
    RawDataTableComponent.prototype.scrollRows = function (rows) {
        this.disabled = true;
        this.highlightedRows = [];
        for (var it in rows) {
            this.highlightedRows.push(rows[it] % this.itemsPerPage);
        }
        if (rows[0] < this.rowsFrom || rows[0] > (this.rowsFrom + this.itemsPerPage)) {
            this.page = Math.floor(rows[0] / this.itemsPerPage) + 1;
            this.rowsFrom = ((this.page - 1) * this.itemsPerPage);
        }
        else {
            this.highlightRows();
            this.scrollToRow(rows[0]);
        }
    };
    RawDataTableComponent.prototype.highlightRows = function () {
        if (this.highlightedRows && this.highlightedRows.length > 0) {
            d3__WEBPACK_IMPORTED_MODULE_4__["select"](this.dataBody.nativeElement).selectAll('tr').classed('highlight', false);
            for (var _i = 0, _a = this.highlightedRows; _i < _a.length; _i++) {
                var rowIdx = _a[_i];
                var truncRow = rowIdx % this.itemsPerPage;
                d3__WEBPACK_IMPORTED_MODULE_4__["select"](this.dataBody.nativeElement.childNodes[truncRow + 2]).classed('highlight', true);
            }
        }
    };
    RawDataTableComponent.prototype.scrollToRow = function (row) {
        var _this = this;
        var truncRow = row % this.itemsPerPage;
        var selectedRow = this.dataBody.nativeElement.childNodes[truncRow + 2];
        var scrollHeight = selectedRow.offsetTop - this.dataBody.nativeElement.offsetTop;
        var duration = (Math.abs(this.dataBody.nativeElement.scrollTop - scrollHeight)) * 0.5;
        d3__WEBPACK_IMPORTED_MODULE_4__["select"]('tbody.metrics-overview')
            .transition()
            .duration(duration)
            .ease(d3__WEBPACK_IMPORTED_MODULE_4__["easeLinear"])
            .tween('scroll', function (offset, _a) {
            var i = d3__WEBPACK_IMPORTED_MODULE_4__["interpolateNumber"](_this.dataBody.nativeElement.scrollTop, scrollHeight);
            return function (t) { return _this.dataBody.nativeElement.scrollTop = i(t); };
        });
    };
    RawDataTableComponent.prototype.changePage = function ($event) {
        this.highlightedRows = [];
        this.scrollToRow(0);
        this.disabled = true;
    };
    // public checkHighlighted(rowIndex: number): string {
    //   if (this.highlightedRows && this.highlightedRows.indexOf(rowIndex) != -1) {
    //     return 'highlight';
    //   }
    // }
    RawDataTableComponent.prototype.checkValues = function (item, cellIndex) {
        if (this.selectedMetricCells[item]) {
            if (this.selectedMetricCells[item].indexOf(cellIndex) >= 0)
                return 'active';
        }
    };
    RawDataTableComponent.prototype.handleSelectionUpdated = function ($event) {
        console.log("selection updated... do something?");
    };
    RawDataTableComponent.prototype.handleSort = function ($event, sortBy) {
        this.sortEmitter.emit(sortBy);
    };
    // public updateTableOverlay() {
    //   this.tableOverlay.fillCols();
    //   this.tableOverlay.fillScrollVis();
    //   this.tableOverlay.updateOverlayPositions();
    // }
    RawDataTableComponent.prototype.deleteMetric = function (metric) {
        console.log('test delete metric' + metric.name);
        this.openRefineService.deleteMetric(this.projectId, metric, this.contextColumn).subscribe(function (d) { return console.log(d); });
    };
    RawDataTableComponent.prototype.calculateColWidths = function () {
        if (this.headerCols && this.colOffset.length > 0) {
            for (var i = 1; i < this.headerCols.nativeElement.children.length; ++i) {
                if (this.colWidths[i] < this.headerCols.nativeElement.children[i].offsetWidth) {
                    this.colWidths[i] = this.headerCols.nativeElement.children[i].offsetWidth;
                }
            }
        }
        if (this.headerCols && this.bodyCols && this.colOffset.length == 0) {
            this.colWidths = [];
            // push first empty column width
            this.colWidths.push(this.headerCols.nativeElement.children[0].offsetWidth);
            for (var i = 1; i < this.bodyCols.nativeElement.children.length; ++i) {
                this.colWidths.push(this.bodyCols.nativeElement.children[i].offsetWidth);
            }
            this.colOffset = [];
            this.colOffset.push(0);
            for (var _i = 0, _a = Object.entries(this.project.overlayModels.metricsOverlayModel.metrics); _i < _a.length; _i++) {
                var metricColumn = _a[_i];
                var offsetWidth = 4;
                for (var _b = 0, _c = Object.keys(metricColumn[1]); _b < _c.length; _b++) {
                    var key = _c[_b];
                    if (metricColumn[1][key].dirtyIndices) {
                        offsetWidth += 12;
                    }
                }
                this.colOffset.push(offsetWidth);
            }
            if (this.project.overlayModels.metricsOverlayModel.spanningMetrics) {
                for (var _d = 0, _e = this.project.overlayModels.metricsOverlayModel.spanningMetrics; _d < _e.length; _d++) {
                    var spanMetric = _e[_d];
                    for (var _f = 0, _g = spanMetric.spanningColumns; _f < _g.length; _f++) {
                        var columnName = _g[_f];
                        for (var i = 0; i < this.project.overlayModels.metricsOverlayModel.metricColumnNames.length; i++) {
                            if (this.project.overlayModels.metricsOverlayModel.metricColumnNames[i].columnName === columnName)
                                this.colOffset[i + 1] += 12;
                        }
                    }
                }
            }
            for (var i = 0; i < this.colWidths.length; ++i) {
                this.colWidths[i] += this.colOffset[i];
            }
            d3__WEBPACK_IMPORTED_MODULE_4__["selectAll"]('table.metrics-overview thead tr.overview-row th')
                .data(this.colWidths)
                .each(function (data, index) {
                d3__WEBPACK_IMPORTED_MODULE_4__["select"](this).select('svg')
                    .style('paddingTop', 0)
                    .style('paddingBottom', 0)
                    .style('paddingRight', 0)
                    .style('paddingLeft', 6);
            });
            d3__WEBPACK_IMPORTED_MODULE_4__["selectAll"]('table.metrics-overview thead tr.column-names *')
                .data(this.colWidths)
                .each(function (data, index) {
                d3__WEBPACK_IMPORTED_MODULE_4__["select"](this)
                    .style('paddingTop', 0)
                    .style('paddingBottom', 0)
                    .style('paddingRight', 0)
                    .style('paddingLeft', 6);
            });
            this.tableOverlay.fillCols();
            this.tableOverlay.fillScrollVis();
        }
        if (this.tableOverlay) {
            this.tableOverlay.updateOverlayPositions();
        }
        if (this.colHead && this.dataBody) {
            var colBox = this.colHead.nativeElement.getBoundingClientRect();
            this.overlayOffsetTop = colBox.height;
            this.overlayWidth = colBox.width;
            this.bodyHeight = this.dataBody.nativeElement.getBoundingClientRect().height;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "projectId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _open_refine_model_open_refine_project__WEBPACK_IMPORTED_MODULE_2__["OpenRefineProject"])
    ], RawDataTableComponent.prototype, "project", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "columnMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "spanMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('headerCols', { static: false }),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "headerCols", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('bodyCols', { static: false }),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "bodyCols", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('rawDataBody', { static: false }),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "dataBody", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('colOverviewHead', { static: false }),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "colHead", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('spanOverviewHead', { static: false }),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "spanHead", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('tableOverlay', { static: false }),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "tableOverlay", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "onOverviewMetricSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "tableHeightChanged", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "pageChangedEmitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RawDataTableComponent.prototype, "sortEmitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('existingMetric', { static: false }),
        __metadata("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_3__["ContextMenuComponent"])
    ], RawDataTableComponent.prototype, "existingMenu", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('newMetric', { static: false }),
        __metadata("design:type", ngx_contextmenu__WEBPACK_IMPORTED_MODULE_3__["ContextMenuComponent"])
    ], RawDataTableComponent.prototype, "newMenu", void 0);
    RawDataTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-raw-data-table',
            template: __webpack_require__(/*! raw-loader!./raw-data-table.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/raw-data-table/raw-data-table.component.html"),
            providers: [_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]],
            styles: [__webpack_require__(/*! ./raw-data-table.component.scss */ "./src/app/shared/raw-data-table/raw-data-table.component.scss")]
        }),
        __metadata("design:paramtypes", [_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"],
            ngx_contextmenu__WEBPACK_IMPORTED_MODULE_3__["ContextMenuService"]])
    ], RawDataTableComponent);
    return RawDataTableComponent;
}());



/***/ }),

/***/ "./src/app/shared/span-quality-header-col/span-quality-header-col.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/shared/span-quality-header-col/span-quality-header-col.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9zcGFuLXF1YWxpdHktaGVhZGVyLWNvbC9zcGFuLXF1YWxpdHktaGVhZGVyLWNvbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/span-quality-header-col/span-quality-header-col.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/shared/span-quality-header-col/span-quality-header-col.component.ts ***!
  \*************************************************************************************/
/*! exports provided: SpanQualityHeaderColComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpanQualityHeaderColComponent", function() { return SpanQualityHeaderColComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpanQualityHeaderColComponent = /** @class */ (function () {
    function SpanQualityHeaderColComponent(element) {
        this.element = element;
        this.htmlElement = this.element.nativeElement;
        this.host = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.element.nativeElement);
    }
    SpanQualityHeaderColComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.colWidths && this.colWidths.length > 0) {
            var cellWidth = this.htmlElement.parentElement.offsetWidth - (this.colWidths[0]) - 1;
            var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.htmlElement).select("svg");
            var div_1 = d3__WEBPACK_IMPORTED_MODULE_1__["select"]("body").append("div")
                .attr("class", "d3tooltip")
                .style("opacity", 0);
            svg.data(this.metric);
            svg.attr("width", cellWidth)
                .attr("height", 26)
                .on("mouseover", function (d) {
                if (_this.metric) {
                    var currentMetric_1 = _this.metric;
                    var evalTuplesCount_1 = currentMetric_1.evalTuples.length;
                    if (currentMetric_1.spanningEvaluable)
                        evalTuplesCount_1++;
                    div_1.transition()
                        .duration(100)
                        .style("opacity", .9);
                    div_1.html(function (d) {
                        var text = "<span style='color:steelblue'>" + currentMetric_1.name + "</span><br>" +
                            "Metric Value: <span style='color:steelblue'>" + currentMetric_1.measure + "</span><br>" +
                            "Number of Checks: <span style='color:steelblue'>" + evalTuplesCount_1 + "</span><br>";
                        if (currentMetric_1.dirtyIndices != null) {
                            text += "Erroneous Entries: <span style='color:steelblue'>" + currentMetric_1.dirtyIndices.length + "</span><br>";
                        }
                        text += "Data Type: <span style='color:steelblue'>" + currentMetric_1.datatype + "</span>";
                        return text;
                    });
                }
            })
                .on("mouseout", function () {
                div_1.transition()
                    .duration(100)
                    .style("opacity", 0);
            })
                .on("mouseleave", function () {
                div_1.transition()
                    .duration(100)
                    .style("opacity", 0);
            });
            svg.call(this.tooltip);
            if (this.metric) {
                svg.selectAll("rect").remove();
                var rect = svg.append("rect")
                    .classed("metric", true)
                    .attr("height", 26)
                    .attr("width", this.metric.measure * cellWidth)
                    .style("fill", function (d, i, siblings) {
                    if (_this.spanMetricColors[_this.metric.name])
                        return _this.spanMetricColors[_this.metric.name];
                    return "#ce6dbd";
                });
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpanQualityHeaderColComponent.prototype, "metricCol", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpanQualityHeaderColComponent.prototype, "metric", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpanQualityHeaderColComponent.prototype, "tooltip", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpanQualityHeaderColComponent.prototype, "spanMetricColors", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpanQualityHeaderColComponent.prototype, "metricsOverlayModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpanQualityHeaderColComponent.prototype, "colWidths", void 0);
    SpanQualityHeaderColComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: '[span-metric-col]',
            template: '<svg width="0"></svg>',
            styles: [__webpack_require__(/*! ./span-quality-header-col.component.css */ "./src/app/shared/span-quality-header-col/span-quality-header-col.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], SpanQualityHeaderColComponent);
    return SpanQualityHeaderColComponent;
}());



/***/ }),

/***/ "./src/app/test/metric-preview/metric-preview.component.sass":
/*!*******************************************************************!*\
  !*** ./src/app/test/metric-preview/metric-preview.component.sass ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlc3QvbWV0cmljLXByZXZpZXcvbWV0cmljLXByZXZpZXcuY29tcG9uZW50LnNhc3MifQ== */"

/***/ }),

/***/ "./src/app/test/metric-preview/metric-preview.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/test/metric-preview/metric-preview.component.ts ***!
  \*****************************************************************/
/*! exports provided: MetricPreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricPreviewComponent", function() { return MetricPreviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/open-refine/open-refine.service */ "./src/app/shared/open-refine/open-refine.service.ts");
/* harmony import */ var _shared_open_refine_model_open_refine_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/open-refine/model/open-refine-project */ "./src/app/shared/open-refine/model/open-refine-project.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MetricPreviewComponent = /** @class */ (function () {
    function MetricPreviewComponent(element, openRefineService) {
        this.element = element;
        this.openRefineService = openRefineService;
        this.htmlElement = this.element.nativeElement;
    }
    MetricPreviewComponent.prototype.ngOnInit = function () {
    };
    MetricPreviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["projectId"] && !this.project) {
            this.openRefineService.getRefineProject(this.projectId).subscribe(function (project) {
                // console.log(project.overlayModels["metricsOverlayModel"]);
                _this.project = project;
                _this.drawMetricOverview();
            }, function (error) {
                console.log(error);
            });
        }
        else if (changes["project"]) {
            this.drawMetricOverview();
        }
    };
    MetricPreviewComponent.prototype.drawMetricOverview = function () {
        var _this = this;
        var svg = d3__WEBPACK_IMPORTED_MODULE_3__["select"](this.htmlElement).select("svg");
        if (this.project.overlayModels["metricsOverlayModel"]) {
            var overlayModel = this.project.overlayModels["metricsOverlayModel"];
            var colorbrewer = __webpack_require__(/*! colorbrewer */ "./node_modules/colorbrewer/index.js");
            var colColors = colorbrewer.Reds[overlayModel.availableMetrics.length];
            var spanColors = colorbrewer.Oranges[overlayModel.availableMetrics.length];
            this.columnMetricColors = {};
            this.spanMetricColors = {};
            for (var m in overlayModel.availableMetrics) {
                this.columnMetricColors[overlayModel.availableMetrics[m]] = colColors[m];
            }
            for (var m in overlayModel.availableSpanningMetrics) {
                this.spanMetricColors[overlayModel.availableSpanningMetrics[m]] = spanColors[m];
            }
            var stack = d3__WEBPACK_IMPORTED_MODULE_3__["stack"]().keys(overlayModel.availableMetrics) //.concat(this.metricsOverlayModel.availableSpanningMetrics)
                .order(d3__WEBPACK_IMPORTED_MODULE_3__["stackOrderNone"])
                .offset(d3__WEBPACK_IMPORTED_MODULE_3__["stackOffsetNone"])
                .value(function (d, key) {
                if (d) {
                    if (d.metrics && d.metrics[key])
                        return d.metrics[key].measure;
                }
            });
            var metrics = stack(overlayModel.metricColumnNames);
            var bandScale = d3__WEBPACK_IMPORTED_MODULE_3__["scaleBand"]()
                .domain(this.project.columnModel.columns.map(function (d) { return d.name; }))
                .range([0, 500])
                .padding(0);
            var y = d3__WEBPACK_IMPORTED_MODULE_3__["scaleLinear"]().domain([0, overlayModel.availableMetrics.length]).range([this.svgHeight, 0]);
            var colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
            // let area = d3.area()
            //   .x(function(d:any) {
            //     console.log(bandScale(d.data.columnName));
            //     return bandScale(d.data.columnName); 
            //   })
            //   .y0(function(d:any) {
            //     // console.log(y(d[0]));
            //     return y(d[1]); 
            //   })
            //   .y1(function(d:any) {
            //     // console.log(y(d[1]));
            //     return y(d[0]); 
            //   });
            svg.selectAll("g.metric")
                .data(metrics)
                .enter().append("g")
                .attr("class", "metric")
                .selectAll("area")
                .data(function (d) {
                return d.map(function (obj, idx, data) {
                    return {
                        0: obj[0],
                        1: obj[1],
                        columnName: obj.data.columnName,
                        metric: obj.data.metrics[data.key]
                    };
                });
            })
                .enter()
                .append("rect")
                .attr("x", function (d, i, any) {
                // console.log(bandScale(d.columnName));
                return bandScale(d.columnName);
            })
                .attr("y", function (d) {
                if (!isNaN(d[1]))
                    return y(d[1]);
                else
                    return (y(0));
            })
                .attr("height", function (d) {
                if (!isNaN(d[1]))
                    return y(d[0]) - y(d[1]);
                else
                    return 0;
            })
                .attr("width", bandScale.bandwidth())
                .attr("fill", function (d) {
                if (d && d.metric) {
                    if (_this.columnMetricColors[d.metric.name])
                        return _this.columnMetricColors[d.metric.name];
                    if (_this.spanMetricColors[d.metric.name])
                        return _this.spanMetricColors[d.metric.name];
                }
                return 0;
            });
            // .append("path")
            //   .data(metrics)
            //   .attr("class", "area")
            //   .attr("d", area);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MetricPreviewComponent.prototype, "projectId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _shared_open_refine_model_open_refine_project__WEBPACK_IMPORTED_MODULE_2__["OpenRefineProject"])
    ], MetricPreviewComponent.prototype, "project", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], MetricPreviewComponent.prototype, "svgHeight", void 0);
    MetricPreviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'metric-preview',
            template: __webpack_require__(/*! raw-loader!./metric-preview.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/metric-preview/metric-preview.component.html"),
            styles: [__webpack_require__(/*! ./metric-preview.component.sass */ "./src/app/test/metric-preview/metric-preview.component.sass")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _shared_open_refine_open_refine_service__WEBPACK_IMPORTED_MODULE_1__["OpenRefineService"]])
    ], MetricPreviewComponent);
    return MetricPreviewComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/christianbors/Projects/metricdoc_angular/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map