import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
// import { IonicSelectableModule } from 'ionic-selectable';
import { HomePage } from './home.page';
import { ComponentModule } from '../sharedComponent/component.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		// IonicSelectableModule,
		ComponentModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage
			}
		])
	],
	declarations: [HomePage]
})
export class HomePageModule {
	
}