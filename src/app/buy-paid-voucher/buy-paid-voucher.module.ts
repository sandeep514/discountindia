import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyPaidVoucherPage } from './buy-paid-voucher.page';
import { ComponentModule } from '../sharedComponent/component.module';

const routes: Routes = [
  {
    path: '',
    component: BuyPaidVoucherPage
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
  declarations: [BuyPaidVoucherPage]
})
export class BuyPaidVoucherPageModule {}
