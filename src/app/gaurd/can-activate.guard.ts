import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Platform, ToastController, AlertController, Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard implements CanActivate  {
	
	constructor(
		public route:Router, 
		public actvRoute:ActivatedRoute,
		public network: Network,
		public toastController: ToastController,
		public alertController: AlertController,
		public events:Events
	){
		console.log(this.route.url);
			
	}

	ionViewDidEnter() {
		console.log(this.route.url);
	}
	
	canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		this.events.publish('has-internet', "here");
		if( localStorage.getItem('user_customerId') != '' && localStorage.getItem('user_customerId') != null && localStorage.getItem('user_customerId') != undefined ){
			// console.log(state.url);
			// if( state.url == '/login' || state.url == '/register'){
			// 	this.route.navigate(['home']);
			// }
			return true;
		}else{
			this.route.navigate(['login']);
			console.log("njhjk");

		}
		return true;
	}
}