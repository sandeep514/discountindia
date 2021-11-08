import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoucherDetailsService } from 'src/app/voucher-details/voucher-details/voucher-details.service';
import { Events, AlertController, NavController, LoadingController, Platform } from '@ionic/angular';

@Component({
	selector: 'app-voucher-details',
	templateUrl: './voucher-details.page.html',
	styleUrls: ['./voucher-details.page.scss'],
})
export class VoucherDetailsPage implements OnInit {
	voucherDetails :any;
	cusId:any;
	voucherId:any;
	loading:any;
	voucherType:any;
	paidVoucher:any;
	vouchers:any;
	paidVoucherDetails:any;
	paidVoucherDet:any='';

	constructor(public actRoute: ActivatedRoute,public voucherDeServ:VoucherDetailsService,public events:Events,public alertCtrl:AlertController,public navCtrl:NavController,public loadingController: LoadingController,public platform: Platform) {
		this.platform.ready().then(() => {
			let userdata = this.actRoute.snapshot.paramMap.get('data');
			console.log(userdata);
			if (userdata.includes('paid')) {
				var string = userdata;
				var newstring = string.split('paid_')[1];
				let dataArray = newstring.split('_');
				let voucherId = dataArray[0];
				let customerId = dataArray[1];

				this.cusId = customerId;
				this.getVoucherUniqueId(voucherId);
			} else {
				let usrdata = this.actRoute.snapshot.paramMap.get('data').split('CUS');
				this.voucherId = usrdata[0];
				this.cusId = 'CUS' + usrdata[1];
			}
			this.events.publish('open:qr', 'data1', 'data2');
		});
		
	}

	ngOnInit() {
		this.platform.ready().then(() => {
			let userdata = this.actRoute.snapshot.paramMap.get('data');
			console.log(userdata);
			if (userdata.includes('paid')) {
				var string = userdata;
				var newstring = string.split('paid_')[1];
				let dataArray = newstring.split('_');
				let voucherId = dataArray[0];
				let customerId = dataArray[1];

				this.cusId = customerId;
				this.getVoucherUniqueId(voucherId);
			} else {
				console.log("here is the test message ");
				let usrdata = this.actRoute.snapshot.paramMap.get('data').split('CUS');
				console.log(usrdata);
				this.voucherId = usrdata[0];
				this.cusId = 'CUS' + usrdata[1];
				this.getVoucher(this.voucherId);
			}
			this.events.publish('open:qr', 'data1', 'data2');
		});

		// this.getVoucher(this.voucherId);

	}

	ionViewDidLoad(){
		
		
	}
	getVoucherUniqueId(voucherId){
		this.presentLoading();
		this.voucherDeServ.getVousherUniqueId(voucherId).then((res:any) => {
			if( 'data' in res ){
				if( 'voucher_details' in res.data ){
					this.paidVoucherDet = res.data;
					console.log(res.data);
					document.getElementById('getDetails').click();
				}else{
					this.paidVoucherDetails = res.data; 
					console.log(res.data);
					document.getElementById('getDetails').click();
				}
			}
		} , (err:any) => {
			console.log(err);
		});
	}

	getVoucher(voucher) {
		this.voucherDeServ.getVoucher(voucher).then((res:any) => {
			if( res.data != null ){
				if( 'data' in res ){
					if( "paymentId" in res.data ){
						console.log(res.data);
						this.voucherType = "paid";
						this.paidVoucher = res.data;
						document.getElementById('getDetails').click()
					}else{
						console.log("hnj");
						this.voucherType = "free";
						this.voucherDetails = res.data;
						document.getElementById('getDetails').click()
					}
					console.log(this.voucherType);
					this.events.publish('getDetails:qr' , res.data);
				}
			}
		},(err) => {
		});
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
		  message: 'Please wait..',
		  duration:2000
		});

		await this.loading.present();
	}

	redeemVoucher(){
		console.log(this.voucherId);
		console.log(this.cusId);
		this.presentLoading();
		this.voucherDeServ.redeemVoucher(this.voucherId , this.cusId).then((res:any) => {
			if( res.status == 'fail' ){
				this.presentError(res.message);
			}else{
				this.presentSuccess("Voucher redeemed Successfully.");	
			}
			this.loading.dismiss();
		},(err:any) => {
			this.presentError(err.message);
		});
	}

	redeemPaidVoucher(id){
		console.log(id);

		this.presentLoading();
		this.voucherDeServ.redeemPaidVocuher(id).then((res:any) => {
			if( res.status == "success" ){
				this.presentSuccess("Voucher redeemed Successfully.");	
			}else{
				this.presentError(res.message);	
			}
			this.loading.dismiss();
		},(err:any) => {
			this.presentError(err.message);
		});
	}
	
	paidRedeemVoucher(){
		console.log(this.voucherId);
		console.log(this.cusId);
		this.presentLoading();
		this.voucherDeServ.paidRedeemVoucher(this.voucherId , this.cusId).then((res:any) => {
			if( res.status == 'fail' ){
				this.presentError(res.message);
			}else{
				this.presentSuccess("Voucher redeemed Successfully.");	
			}
			this.loading.dismiss();
		},(err:any) => {
			this.presentError(err.message);
		});
	}
	
	async presentError(message){
		const alert = await this.alertCtrl.create({
			header: "something went wrong",
			message : message,
			buttons : [{
				text : "Ok",
				role : 'Cancel'
			}]
		});
		await alert.present();
	}

	async presentSuccess(message){
		const alert = await this.alertCtrl.create({
			header: "Voucher redeemed.",
			message : message,
			buttons : [{
				text : "Ok",
				handler : () =>{
					this.navCtrl.navigateForward(['dashboard']);
				}
			}]
		});
		await alert.present();
	}


	
	home(){
		this.navCtrl.navigateForward(['dashboard']);
	}	
	getUserdetails(){
		if( this.paidVoucher != undefined ){
			this.getVoucher(this.voucherId);
		}
		if (this.voucherDetails != undefined ){
			this.getVoucher(this.voucherId);
		}
		
		console.log(this.paidVoucher);
		console.log(this.voucherDetails);
		console.log(this.paidVoucherDetails);
		console.log(this.paidVoucherDet);
	}
}