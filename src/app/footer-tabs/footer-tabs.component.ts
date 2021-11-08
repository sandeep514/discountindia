import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-footer-tabs',
  templateUrl: './footer-tabs.component.html',
  styleUrls: ['./footer-tabs.component.scss'],
})
export class FooterTabsComponent implements OnInit {

  	constructor(public navCtrl:NavController,public loader:LoadingController) { }
	ngOnInit() {}
	async loaderPresent(message){
		let loader = await this.loader.create({
			message : message,
			duration: 2500
		});
		loader.present();
	}
	buyVoucher(){
		this.loaderPresent("Please wait...");
		this.navCtrl.navigateRoot('buy-paid-voucher');
  	}
  	profile(){
		this.loaderPresent("Please wait...");
		var userId = localStorage.getItem('dataUserId');
		if( userId  ){
			this.navCtrl.navigateForward('profile');
		}else{
			this.navCtrl.navigateForward('login');
		}
	}
	listPlans(){
		this.loaderPresent("Please wait...");
		this.navCtrl.navigateForward('plan');
	}
	listUsedVouchers(){
		this.loaderPresent("Please wait...");
		this.navCtrl.navigateForward('voucher-history');
	}
	goToHome(){
		this.loaderPresent("Please wait...");
		this.navCtrl.navigateForward('home');
	}
}