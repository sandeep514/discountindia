import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';

@Component({
	selector: 'app-list-vouchers',
	templateUrl: './list-vouchers.page.html',
	styleUrls: ['./list-vouchers.page.scss'],
})
export class ListVouchersPage implements OnInit {

	constructor(public navCtrl:NavController,public apiSer:ApiServiceService) {
		this.getVoucher();
	}

	ngOnInit() {
	}
	getVoucher(){
		this.apiSer.getVouchers().then( (res:any) => {
			console.log(res);
		} ,(err:any) => {
			console.log(err);
		});
	}
	newVoucher(){
		this.navCtrl.navigateForward(['create-voucher']);
	}
}