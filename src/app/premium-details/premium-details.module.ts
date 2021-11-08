import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PremiumDetailsPage } from './premium-details.page';
import { ComponentModule } from '../sharedComponent/component.module';

const routes: Routes = [
	{
		path: '',
		component: PremiumDetailsPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ComponentModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [PremiumDetailsPage]
})
export class PremiumDetailsPageModule {}
