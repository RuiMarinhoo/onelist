import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { DataTableComponent } from './data-table/data-table.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
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
      }
    ]
  }
]

@NgModule({
  declarations: [ArticleComponent, BasicTableComponent, DataTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ]
})
export class ArticleModule { }
