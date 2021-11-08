import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VoucherHistoryPage } from './voucher-history.page';
import { ComponentModule } from '../sharedComponent/component.module';

const routes: Routes = [
  {
    path: '',
    component: VoucherHistoryPage
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
  declarations: [VoucherHistoryPage]
})
export class VoucherHistoryPageModule {}
