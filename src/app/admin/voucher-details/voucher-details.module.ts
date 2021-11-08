import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VoucherDetailsPage } from './voucher-details.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VoucherDetailsPage]
})
export class VoucherDetailsPageModule {}
