import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

	constructor(public navCtrl:NavController) { }

	ngOnInit() {
	}

	redeemVoucher (){
		this.navCtrl.navigateRoot(['redeem-voucher']);
	}
	
	createvoucher(){
		this.navCtrl.navigateForward(['list-vouchers']);
	}
	home(){
		this.navCtrl.navigateForward(['dashboard']);
	}	
	redeemedVoucher(){
		this.navCtrl.navigateForward(['admin/voucher-history']);
	}
}