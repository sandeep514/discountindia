import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { HomeService } from '../home/home/home.service';
declare var RazorpayCheckout:any;

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.page.html',
  styleUrls: ['./plan-details.page.scss'],
})

export class PlanDetailsPage implements OnInit {
	details:any;	
	currency: string = "INR";
	currencyIcon: string = "Rs";
	razor_key = "rzp_live_o0X7MFc3fIrXXz";
	email:any;
	userName:any;
	userMobile:any;
	userId:any;
	user_customerId:any;
	user_plan:any;
	planDetails:any;

	constructor(public activeRoute:ActivatedRoute , public homeSer: HomeService,public loader:LoadingController,public toast: ToastController) {
		let dataSupported = this.activeRoute.snapshot.paramMap.get('data');	
		this.getPlanDetail(dataSupported);

		this.user_plan = localStorage.getItem('user_plan' );
		this.user_customerId = localStorage.getItem('user_customerId' );
		this.userId = localStorage.getItem('dataUserId' );
		this.userMobile = localStorage.getItem('userMobile' );
		this.email = localStorage.getItem('userEmail' );
		this.userName = localStorage.getItem('userName' );
	}
	async loaderPresent(message){
		const loader = await this.loader.create({
			message : message,
			duration : 2500
		});
		await loader.present();
	}
	buyNowPlan(data) {
		console.log(data)
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

		var options = {
			description: 'But Plan',
			image: '',
			currency: this.currency, 
			key: this.razor_key, 
			amount: data.price + '00',
			name: data.title,
			prefill: {
				email: email,
				contact: this.userMobile,
				name: this.userName
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
	async toastPresent(message){
		const toast = await this.toast.create({
			message : message,
			duration : 2500
		});
		await toast.present();
	}
	PaymentSuccess(payment_id){
		this.loaderPresent("Please wait...");
		let voucher = '0';
		let voucherType = 'paid';
		// if( this.paidVoucherId != null ){
		// 	voucher = this.paidVoucherId;
		// 	voucherType = 'paid';
		// }
		// if( this.shareVoucherId != null ){
		// 	voucher = this.shareVoucherId;
		// 	voucherType = 'shared';
		// }
		
		// this.api.updatePaymentSystem(voucher , payment_id , voucherType).then((res:any) => {
		// 	this.toastPresent("Voucher buy successfully.");
		// } , (err:any) => {
		// 	alert(JSON.parse(err));
		// });
	}
	getPlanDetail = (planId) => {
		this.homeSer.getPlanDetails(planId).then((res:any) => {
			if('data' in res){
				if( 'desc' in res.data ){
					this.planDetails = res.data;
					this.details = res.data.desc
					console.log(this.details)
				}
			}
		});
	}

	ngOnInit() {

	}

}