import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../admin/api-service.service';
import { ForgetPasswordService } from './forget-password.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
	mobile= '';
	hasValidationError:any;
	
	constructor(public api:ForgetPasswordService,public toastr:ToastController,public navCtrl:NavController) { }

	ngOnInit() {
	}

	async toastPresent(Message){
		const toaster = this.toastr.create({
			message : Message,
			duration : 2500
		});
	}

	verify(){
		this.api.checkIfUserExist(this.mobile).then((res:any) => {
			console.log(res);
			if( res.status == 'success' ){
				this.toastPresent('OTP Send to your mobile number');
				this.navCtrl.navigateForward(['verify-otp' , {mobile : this.mobile}]);
			}else{
				this.toastPresent(res.message);
			}
		}, (err:any) => {
			console.log(err);
		});
	}
}