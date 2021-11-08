import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../admin/api-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voucher-history',
  templateUrl: './voucher-history.page.html',
  styleUrls: ['./voucher-history.page.scss'],
})
export class VoucherHistoryPage implements OnInit {
	voucherDetails:any;
	voucherPaidDetails:any;
	// userVoucherType: any;
	constructor(public route: Router,public alertCtrl: AlertController,public apiSer: ApiServiceService) { }

	ngOnInit() {
		this.getVocuhersDetails();
	}
	getVocuhersDetails(){
		this.apiSer.getUserDetailsVoucher().then((res:any) => {
			this.voucherDetails = res.data;
			this.voucherPaidDetails = res.paid;
			// this.userVoucherType = res.data.voucherType;
			console.log(res);
		} , (err:any)=> {
			console.log(err);
		});
	}
	async presentAlert() {
		const alert = await this.alertCtrl.create({
			header: 'Alert',
			message: 'Please Buy the subscription to activate The Discount India vouchers.',
			buttons: [
			{
				text: 'Okay',
				handler: () => {
					this.route.navigate(['profile']);
				}
			}
		  ]
		});
		await alert.present();
	}

	
	getVoucher(voucherId){
		if( localStorage.getItem('user_plan') == null || localStorage.getItem('user_plan') == undefined || localStorage.getItem('user_plan') == 'null'){
			this.presentAlert();
		}else{
			this.route.navigate(['voucher-detail', { data :  voucherId }]);
		}
	}
}
