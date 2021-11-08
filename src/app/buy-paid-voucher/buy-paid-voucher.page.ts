import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../admin/api-service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-buy-paid-voucher',
	templateUrl: './buy-paid-voucher.page.html',
	styleUrls: ['./buy-paid-voucher.page.scss'],
})
export class BuyPaidVoucherPage implements OnInit {
	voucherDetails:any;
	voucherDetailsLength:any;

	sharedVoucherDetails:any;
	sharedVoucherDetailsLength:any;

    constructor(public apiSer: ApiServiceService,public alertCtrl:AlertController,public loaderCtrl:LoadingController) {
		this.getUserPaidDetailsVoucher();
		this.getUserSharedPaidDetailsVoucher();
	}
	
    ngOnInit() {
		this.getUserPaidDetailsVoucher();
	}
	ionViewDidEnter(){
		this.getUserPaidDetailsVoucher();
		this.getUserSharedPaidDetailsVoucher();
	}
	getUserPaidDetailsVoucher(){
		this.apiSer.getUserPaidDetailsVoucher().then((res:any) => {
			console.log(res.data);
			this.voucherDetails = res.data;
			this.voucherDetailsLength = res.data.length;
		} , (err:any)=> {

		});
	}
	
	getUserSharedPaidDetailsVoucher(){
		this.apiSer.getUserSharedPaidDetailsVoucher().then((res:any) => {
			console.log(res.data);
			this.sharedVoucherDetails = res.data;
			console.log(res.data);
			this.sharedVoucherDetailsLength = res.data.length;
		} , (err:any)=> {

		});
	}
	
	async alertPresent(image){
		let alert = await this.alertCtrl.create({
			message : "<img src='"+image+"' style='width:100%;height:100%' >",
			buttons:[{
				text : "ok"
			}]
		});
		await alert.present();
	}
	
	async loaderPresent(message){
		let loader = await this.loaderCtrl.create({
			message : message,
			duration:1500
		});
		await loader.present();
	}

	showQR(id){
		this.loaderPresent("Please wait...");
		let imageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x150&data=paid_'+id+'_'+localStorage.getItem('user_customerId');
		this.alertPresent(imageUrl);
	}
}
