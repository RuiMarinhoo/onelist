import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NgxDatatableComponent } from './ngx-datatable/ngx-datatable.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-table',
        pathMatch: 'full'
      },
      {
        path: 'basic-table',
        component: BasicTableComponent
      },
      {
        path: 'data-table',
        component: DataTableComponent
      },
      {
        path: 'ngx-datatable',
        component: NgxDatatableComponent
      }
    ]
  }
]

@NgModule({
  declarations: [CustomerComponent, BasicTableComponent, DataTableComponent, NgxDatatableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ]
})
export class CustomerModule { }
