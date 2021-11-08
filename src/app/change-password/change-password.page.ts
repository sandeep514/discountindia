import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.page.html',
	styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
	mobile :any;
	password:any;
	confirmPassword:any;

	constructor(public actRoute:ActivatedRoute,public apiSer:ChangePasswordService,public toastr:ToastController,public navCtrl:NavController) {
		this.mobile = this.actRoute.snapshot.paramMap.get('mobile');
	}

	ngOnInit() {
	}

	async toastPresent(message){
		const toast = await this.toastr.create({
			message: message,
			duration: 2500
		});
		await toast.present();
	}

	changrPassword(){
		if( this.password == this.confirmPassword ){
			let formData = new FormData();
			formData.append('mobile' , this.mobile);
			formData.append('password' , this.password);
			formData.append('confirmPassword' , this.confirmPassword);

			this.apiSer.changePassword(formData).then((res:any) => {
				if( res.status == 'success' ){
					this.toastPresent("Password change successfully");
					this.navCtrl.navigateForward(['login']);
				}else{
					this.toastPresent("Sorry..! something went wrong");
				}
				console.log(res);
			}, (err:any) => {
				console.log(err);
			});

		}else{
			this.toastPresent("Password and confirm password must be same.");
		}

	}

}