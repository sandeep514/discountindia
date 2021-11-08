import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyOtpService } from './verify-otp.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
	selector: 'app-verify-otp',
	templateUrl: './verify-otp.page.html',
	styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {
	mobile:any;
	otp:any;
	hasValidationError:any;
	
	constructor(public actRoute:ActivatedRoute,public api:VerifyOtpService, public toast:ToastController,public navCtrl:NavController) {
		this.mobile = this.actRoute.snapshot.paramMap.get('mobile');
		console.log(this.mobile);
	}

	ngOnInit() {

	}
	async toastPresent(message){
		const toaster = await this.toast.create({
			message : message,
			duration: 2500
		});
		toaster.present();
	}
	verifyOTP(){
		let formData = new FormData();
		formData.append('mobile' , this.mobile );
		formData.append('otp' , this.otp );

		this.api.verifyOTP(formData).then((res:any) => {
			if( res.status == 'success' ){
				this.toastPresent("Otp verified");
				this.navCtrl.navigateForward(['change-password' , {mobile : this.mobile}]);
			}else{
				this.toastPresent(res.message);
			}
		}, (err:any) => {
			console.log(err);
		});
	}
}