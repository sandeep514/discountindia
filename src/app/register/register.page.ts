import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { RegisterService } from './service/register.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	username = '';
	mobile = '';
	email = '';
	password = '';
	hasValidationError = [];
	loading:any;
	isChecked:any=false;

	constructor(public navCtrl: NavController, public registerSer: RegisterService, public route: Router,public loadingController: LoadingController) {

	}
	terms(){
		this.route.navigate(['terms']);
	}  
	ngOnInit() {
		
	}

	login(){
		this.navCtrl.navigateForward('login');
	}

	checkRegsiterValidation(){
		this.hasValidationError = [];
		if(this.isChecked){
			if( this.username != '' && this.mobile != '' && this.email != '' && this.password != '' ){
				let hasEmail = this.validateEmail(this.email);
				if( hasEmail ){
					if( this.mobile.length == 10 || this.mobile.length == 12 ){
						if( this.password.length >= 6 ){
							let ProcessData = {username: this.username , mobile: this.mobile , email: this.email, password : this.password};
							this.presentLoading().then(() => {
								this.registerSer.createUser(ProcessData).then((res:any) => {
									// localStorage.setItem('user_plan' , res.data.plan_id);
									// localStorage.setItem('user_customerId' , res.data.customer_unique_id);
									console.log("register");
									
									localStorage.setItem('user_plan' ,res.data.plan_id);
									localStorage.setItem('user_customerId' ,res.data.customer_unique_id);
									localStorage.setItem('datarole_id' ,res.data.role_id);
									localStorage.setItem('dataUserId' ,res.data.id);
									localStorage.setItem('userMobile', res.data.mobile);
									localStorage.setItem('userEmail', res.data.email);
									localStorage.setItem('userName', res.data.name);
	
									this.loading.dismiss();
									
									this.route.navigate(['home']);
									
								},(err:any) => {
									if( 'error' in err  ){
										if( 'errors' in err.error ){
											let errorType = [ 'username' , 'mobile' , 'email' , 'password' ];
											this.loading.dismiss();
											for (let i = 0; i < errorType.length; i++) {
												if( err.error.errors[errorType[i]] != undefined ){
													this.hasValidationError.push(err.error.errors[errorType[i]][0]);
												}	
											}
										}
									}
								});
							});
								
						}else{
							this.hasValidationError.push("Password must be greater or equal to 6 character");
						}
					}else{
						this.hasValidationError.push("Please enter correct mobile number");
					}
				}else{
					this.hasValidationError.push("Please enter correct email");
				}
			}else{
				this.hasValidationError.push('Please enter all require Fields');
			}
		}else{
			this.hasValidationError.push('Please Accept terms and condition');
		}
	
		
	}

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
		  message: 'Please wait..',
		});
		await this.loading.present();
	}

}