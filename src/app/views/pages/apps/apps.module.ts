import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppsComponent } from './apps.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './email/inbox/inbox.component';
import { ReadComponent } from './email/read/read.component';
import { ComposeComponent } from './email/compose/compose.component';


const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      {
        path: '',
        redirectTo: 'email',
        pathMatch: 'full',
      },
      {
        path: 'email',
        component: EmailComponent,
        children: [
          {
            path: '',
            redirectTo: 'inbox',
            pathMatch: 'full'
          },
          {
            path: 'inbox',
            component: InboxComponent
          },
          {
            path: 'read',
            component: ReadComponent
          },
          {
            path: 'compose',
            component: ComposeComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  declarations: [EmailComponent, AppsComponent, InboxComponent, ReadComponent, ComposeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgSelectModule
  ],
  providers: []
})
export class AppsModule { }
