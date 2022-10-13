import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ts-ignore
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AutocompleteLibModule} from "angular-ng-autocomplete";

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { ConfigurationComponent } from './configuration.component';
import {WizardComponent} from "./wizard/wizard.component";
import {ArchwizardModule} from "angular-archwizard";
import {PdfComponent} from "./pdf/pdf.component";
import {PdfModalComponent} from "./pdf/pdf-modal/pdf-modal.component";

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  },
  {
    path: 'map-information',
    component: WizardComponent
  },
  {
    path: 'pdf',
    component: PdfComponent
  },
]

@NgModule({
  declarations: [ConfigurationComponent, WizardComponent, PdfComponent, PdfModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ArchwizardModule,
    ReactiveFormsModule,
    PdfViewerModule,
    AutocompleteLibModule
  ]
})
export class ConfigurationModule { }
