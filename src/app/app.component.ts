import { Component } from '@angular/core';

import { Platform, Events, ToastController, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { HomeService } from './home/home/home.service';
import { Location } from '@angular/common';
import { ProfileService } from './profile/profile/profile.service';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
	user_id : any;
	datarole:any;
	public appPages = [
		{
			title: 'Home',
			url: '/home',
			icon: 'home'
		},
  	];
	public appPagesAdmin = [
		{
			title: 'Home',
			url: '/dashboard',
			icon: 'home'
		},
  	];
	  
	
	constructor(
		public profileSer:ProfileService,
		private platform: Platform,
		private splashScreen: SplashScreen,
		private route: Router,
		private statusBar: StatusBar,
		public events: Events,
		public network:Network,
		public toastController: ToastController,
		public alertController:AlertController,
		private backgroundMode: BackgroundMode,
		public plt: Platform,
		public navCtrl:NavController,
		private fcm: FirebaseMessaging,
		public location:Location,
		private homeServ:HomeService
	) {

			this.user_id = localStorage.getItem('user_customerId');
			this.initializeApp();
			events.subscribe('user:created', (user, time) => {
				this.datarole = localStorage.getItem('datarole_id');
			});
			events.subscribe('has-internet' , () => {
				if (this.network.type == 'none'){
					this.AlertNet()
				}else if(this.network.type === 'wifi'){
				}
				
				this.network.onConnect().subscribe(()=> {
					if(network.Connection.WIFI){
						this.presentToastWithOptions()
					}
				});
				
				this.network.onDisconnect().subscribe(()=> {
					this.presentToast()
				});	
			});
			this.plt.ready().then(() => {
				this.profile();
				
				this.plt.backButton.subscribeWithPriority(10, () => {
					this.location.back();
				});
					this.fcm.requestPermission().then(() => {
						this.fcm.getToken().then(token => {	
							let formdata = {token : token, userId : localStorage.getItem('dataUserId')};
							this.homeServ.updateToken(formdata).then((res:any) => {
							},(err:any) => {
							});
						});
						this.fcm.onTokenRefresh().subscribe(token => {
							console.log("here")
							this.fcm.getToken().then(token => {
								let formdata = {token : token, userId : localStorage.getItem('dataUserId')};
								this.homeServ.updateToken(formdata).then((res:any) => {
		
								},(err:any) => {
		
								});
							});
						});

						this.fcm.onMessage().subscribe(data => {
							if(data.tap == "background"){
								this.route.navigate([ 'voucher-details', { voucherId : data.redirect_url } ]);
							} else {
								console.log('Received in foreground');
							};
						});
					})

				
	
				if( localStorage.getItem('dataUserId') != undefined || localStorage.getItem('dataUserId') != null ){
					this.fcm.getToken().then(token => {
						let formdata = {token : token, userId : localStorage.getItem('dataUserId')};
						this.homeServ.updateToken(formdata).then((res:any) => {

						},(err:any) => {

						});
					});
				}
			});
		// if( localStorage.getItem('user_customerId') ) {
		// 	if( localStorage.getItem('datarole_id') == '3' ){
		// 		this.route.navigate(['dashboard']);
		// 	}else{
		// 		this.route.navigate(['home']);
		// 	}
		// }else{
		// 	this.route.navigate(['login']);
		// }
	}

	profile(){
		
		this.profileSer.profile().then((res: any) => {
			// dataUserId
			localStorage.setItem('user_plan' , res.data.plan_id);
		},(err: any) => {
			console.log(err);
		});
	}

	async toastPresent(Message){
		const toast = await this.toastController.create({
			message : Message,
			duration : 3000
		});
		await toast.present();
	}

	subscribeToTopic() {
		// this.fcm.subscribeToTopic('discoutIndia');
	}
	getToken() {
		// this.fcm.getToken().then(token => {
		//   // Register your new token in your back-end if you want
		//   // backend.registerToken(token);
		// });
	}
	unsubscribeFromTopic() {
		// this.fcm.unsubscribeFromTopic('discoutIndia');
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: 'You dont have internet connection :(',
			duration: 2000
		});
		toast.present();
	}
	
	async presentToastWithOptions() {
		const toast = await this.toastController.create({
			message: 'Internet connection is back :)',
			// showCloseButton: true,
			position: 'top',
			// closeButtonText: 'Done'
			duration : 2000
		});
		toast.present();
	}
	
	async AlertNet(){
	  	const alert = await this.alertController.create({
			header: 'Alert',
			subHeader: 'No internet',
			message: 'You do not have an Internet connection. Please check your connection status',
				buttons: [{
					text: "Ok"
				}]    
			});
	  	await alert.present();
	}
	initializeApp() {
		this.platform.ready().then(() => {
			// this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.notificationSetup();
		});
	}

	logout(){
		localStorage.clear();
		this.route.navigate(['login']);
	}
	terms(){
		this.route.navigate(['terms']);
	}


	private async presentToastFCM(message) {
		const toast = await this.toastController.create({
			message,
			duration: 3000
		});
		toast.present();
	}
	
	notificationSetup() {
		this.fcm.getToken();
		this.fcm.onMessage().subscribe((msg) => {
			if (this.platform.is('ios')) {
				this.presentToastFCM(msg.aps.alert);
			} else {
				this.presentToastFCM(msg.body);
			}
		});
	}	

}