import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HealthCarePage } from './health-care.page';
import { ComponentModule } from '../sharedComponent/component.module';

const routes: Routes = [
  {
    path: '',
    component: HealthCarePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HealthCarePage]
})
export class HealthCarePageModule {}
