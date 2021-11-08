import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Events } from '@ionic/angular';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	hasValidationError: any[];
	email = '';
	mobile = '';
	password = '';
	loading:any;

	constructor(public navCtrl: NavController, public loginServ : LoginService,public route: Router,public loadingController: LoadingController,public events: Events) { }

	ngOnInit() {
	}
	ionViewDidLoad(){
		this.email = '';
	}
	home(){
		this.navCtrl.navigateForward('home');
	}

	register(){
		this.navCtrl.navigateForward('register');
	}
  	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	checkLogin(){
		this.hasValidationError = [];
		if( this.mobile != '' && this.password != '' ){
			// let hasEmail = this.validateEmail(this.email);
			let hasEmail = this.mobile;
			if( hasEmail ){
				if( this.password.length >= 6 ){
					let ProcessData = { mobile: this.mobile, password : this.password};
					this.presentLoading().then(() => {
						this.loginServ.loginUser(ProcessData).then((res:any) => {
							this.loading.dismiss();
							if( res.status == 'fail' ){
								this.hasValidationError.push(res.message);
							}else{

								console.log(res);

								localStorage.setItem('user_plan' ,res.data.plan_id);
								localStorage.setItem('user_customerId' ,res.data.customer_unique_id);
								localStorage.setItem('datarole_id' ,res.data.role_id);
								localStorage.setItem('dataUserId' ,res.data.id);
								localStorage.setItem('userMobile' ,res.data.mobile);
								localStorage.setItem('userEmail' ,res.data.email);
								localStorage.setItem('userName' ,res.data.name);
								
								this.events.publish('user:created', "here");
								this.events.publish('has-internet', "here");
								
								if( res.data.role_id == 3 ){
									this.route.navigate(['dashboard']);
								}else{
									this.route.navigate(['home']);
								}
							}
						},(err:any) => {
							this.loading.dismiss();
							if( 'error' in err  ){
								if( 'errors' in err.error ){
									let errorType = [ 'username' , 'mobile' , 'email' , 'password' ];
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
				this.hasValidationError.push("Please enter correct email");
			}
		}else{
			this.hasValidationError.push('Please enter all require Fields');
		}
		this.loadingController.dismiss();

	}
	about(){
		this.navCtrl.navigateForward(['about']);
	}
	terms(){
		this.route.navigate(['terms']);
	}  
	async presentLoading() {
		this.loading = await this.loadingController.create({
		  message: 'Please wait..',
		});
		await this.loading.present();
	}
	forgotPassword(){
		this.navCtrl.navigateForward(['forget-password']);
	}
}