import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PremiumDetailsService } from './premium-details.service';
import { ToastController, LoadingController, NavController, Events } from '@ionic/angular';
import { apiPrefix, imgPrefix } from '../constant';
declare var RazorpayCheckout:any;

@Component({
  selector: 'app-premium-details',
  templateUrl: './premium-details.page.html',
  styleUrls: ['./premium-details.page.scss'],
})
export class PremiumDetailsPage implements OnInit {
	paidVoucherId = '0';
	shareVoucherId = '0';
	details:any;
	detailsLength:any;
	detailsVoucher:any;
	detailsVoucherLength:any;
	preImage:any;
	paymentAmount: number = 100;
	currency: string = "INR";
	currencyIcon: string = "Rs";
	razor_key = "rzp_live_o0X7MFc3fIrXXz";
	user = null;

	constructor(public actRooute:ActivatedRoute,public api:PremiumDetailsService,public toast:ToastController,public loader:LoadingController,public navCtrl:NavController,public event:Events) {

		this.event.subscribe('user:created', (user, time) => {
			console.log(localStorage.getItem('dataUserId'));
			if( localStorage.getItem('dataUserId') !== null || localStorage.getItem('dataUserId') != null || localStorage.getItem('dataUserId') != undefined ){
				this.user = localStorage.getItem('dataUserId');
			}
		});
		if( localStorage.getItem('dataUserId') !== null || localStorage.getItem('dataUserId') != null || localStorage.getItem('dataUserId') != undefined ){
			this.user = localStorage.getItem('dataUserId');
		}

		console.log(this.user);

		this.paidVoucherId = this.actRooute.snapshot.paramMap.get('premiumDealsId'); 

		this.shareVoucherId = this.actRooute.snapshot.paramMap.get('shareDealsId'); 
		if( this.paidVoucherId != "0" ){
			this.getVoucherDetails();
		}

		if( this.shareVoucherId != "0" ){
			this.getShareVoucherDetails();

		}
		this.preImage = imgPrefix;
	}

	async toastPresent(message){
		const toast = await this.toast.create({
			message : message,
			duration : 2500
		});
		await toast.present();
	}

	async loaderPresent(message){
		const loader = await this.loader.create({
			message : message,
			duration : 2500
		});
		await loader.present();
	}

	ngOnInit() {
	}

	getVoucherDetails(){
		this.loaderPresent("Fetching records...");
		this.api.getVoucherDetails(this.paidVoucherId).then((res:any) => {
			this.details = res.data;
			
			if( res.data != null ){
				this.detailsLength = 1;
			}else{
				this.detailsLength = 0;
			}

			this.loader.dismiss();
		} , (err:any)=>{
		});
	}
	
	getShareVoucherDetails(){
		this.loaderPresent("Fetching records...");
		this.api.shareVoucherDetails(this.shareVoucherId).then((res:any) => {
			this.detailsVoucher = res.data;
			console.log(this.detailsVoucher);
			this.loader.dismiss();
		} , (err:any)=>{
		});
	}
	Login(){
		this.navCtrl.navigateForward(['login']);
	}
	payWithRazor(data) {
		console.log(data);

		if (localStorage.getItem('userMobile') == '' || localStorage.getItem('userMobile') == null ){
			var mobile = '';
		}else{
			var mobile = localStorage.getItem('userMobile');
		}

		if (localStorage.getItem('userEmail') == '' || localStorage.getItem('userEmail') == null) {
			var email = '';
		} else {
			var email = localStorage.getItem('userEmail');
		}

		if (localStorage.getItem('userName') == '' || localStorage.getItem('userName') == null) {
			var name = '';
		} else {
			var name = localStorage.getItem('userName');
		}

		// if (data.customer_price.length == 4) {
		// 	var amount = data.customer_price + '00';
		// }
		// if (data.customer_price.length == 3) {
		// 	var amount = data.customer_price + '00';
		// }
		// if (data.customer_price.length == 2) {
		// 	var amount = data.customer_price + '00';
		// }
		// if (data.customer_price.length == 1) {
		// 	var amount = data.customer_price + '00';
		// }

		var options = {
			description: 'Voucher Paid',
			image: '',
			currency: this.currency, 
			key: this.razor_key, 
			amount: data.customer_price + '00',
			name: data.title,
			prefill: {
				email: email,
				contact: mobile,
				name: name
			},
			theme: {
				color: '#F37254'
			},
			modal: {
				ondismiss: function () {
					this.toastPresent('Payment Cancelled.');
				}
			}
		};
	
		var successCallback = (payment_id) => {
			this.loaderPresent("Please wait...");
			this.PaymentSuccess(payment_id);		
		};
	
		var cancelCallback = (error)  => {
			this.toastPresent('Payment Cancelled.');
		};
	
		RazorpayCheckout.open(options, successCallback, cancelCallback);
	}

	payWithRazorShared(detailsVoucher) {

		if( detailsVoucher.amount.length == 3 ){
			var amount = detailsVoucher.amount+'000';
		}
		if( detailsVoucher.amount.length == 2 ){
			var amount = detailsVoucher.amount+'00';
		}
		if( detailsVoucher.amount.length == 1 ){
			var amount = detailsVoucher.amount+'000';
		}

		if (localStorage.getItem('userMobile') == '' || localStorage.getItem('userMobile') == null) {
			var mobile = '';
		} else {
			var mobile = localStorage.getItem('userMobile');
		}

		if (localStorage.getItem('userEmail') == '' || localStorage.getItem('userEmail') == null) {
			var email = '';
		} else {
			var email = localStorage.getItem('userEmail');
		}

		if (localStorage.getItem('userName') == '' || localStorage.getItem('userName') == null) {
			var name = '';
		} else {
			var name = localStorage.getItem('userName');
		}

		var options = {
			description: 'Voucher Paid',
			image: 'https://i.imgur.com/3g7nmJC.png',
			currency: this.currency, 
			key: this.razor_key, 
			amount: amount,
			name: detailsVoucher.title,
			prefill: {
				email: email,
				contact: mobile,
				name: name
			},
			theme: {
				color: '#F37254'
			},
			modal: {
				ondismiss: function () {
					this.toastPresent('Payment Cancelled.');
				}
			}
		};
	
		var successCallback = (payment_id) => {
			this.loaderPresent("Please wait...");
			this.PaymentSuccess(payment_id);		
		};
	
		var cancelCallback = (error) => {
			this.toastPresent('Payment Cancelled.');
		};
	
		RazorpayCheckout.open(options, successCallback, cancelCallback);
	}

	PaymentSuccess(payment_id){
		this.loaderPresent("Please wait...");
		let voucher = '0';
		let voucherType = 'paid';
		if( this.paidVoucherId != null ){
			voucher = this.paidVoucherId;
			voucherType = 'paid';
		}
		if( this.shareVoucherId != null ){
			voucher = this.shareVoucherId;
			voucherType = 'shared';
		}
		
		this.api.updatePaymentSystem(voucher , payment_id , voucherType).then((res:any) => {
			this.toastPresent("Voucher buy successfully.");
		} , (err:any) => {
			alert(JSON.parse(err));
		});
	}
	
}