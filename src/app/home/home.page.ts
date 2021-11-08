import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { HomeService } from './home/home.service';
import { imgPrefix } from '../constant';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	categories : any;
	cities : any;
	city : any;
	offers : any;
	hotDeals : any;
	hotDealsLength = 0;
	premiumDeals : any;
	premiumDealsLength = 0;
	imgPre = '';
	selectedCity = '';
	activetab = "planVoucher";
	sharedDeals:any;
	sharedDealsLength=0;
	deliveryData:any;
	deliverylength:any;
	listslider:any;
	listsliderlength:any;
	hotDealsCategory:any;
	slideOptsOne = {
		initialSlide: 0,
		slidesPerView: 1.1,
		autoplay: true
	};
	selectedHotCategory:any;
	constructor(public navCtrl: NavController,
			public homeServ: HomeService,
			private geolocation: Geolocation,
			public route: Router,
			public alertCtrl: AlertController,
			public network: Network,
			public toastController: ToastController,
			public alertController: AlertController,
			public plt: Platform,
			// private photoViewer: PhotoViewer
			// private fcm: FCM
		){
		this.imgPre = imgPrefix;
		
		if( localStorage.getItem('selectedCity') != null ){
			this.selectedCity = localStorage.getItem('selectedCity');
		}else{
			this.selectedCity = 'Amritsar';
			localStorage.setItem('selectedCity' , 'Amritsar');
		}
		
		localStorage.getItem('selectedCity');
		// this.plt.ready()
		// 	.then(() => {
		// 		this.fcm.onNotification().subscribe(data => {
		// 		if (data.wasTapped) {
		// 		} else {
		// 		};
		// 		});

		// 		this.fcm.onTokenRefresh().subscribe(token => {
		// 		// Register your new token in your back-end if you want
		// 		// backend.registerToken(token);
		// 		});
		// 	})
	}

	getSlider(){
		this.homeServ.getSlider().then((res:any) => {
			
			this.listslider = res.slider;
			console.log(res);
			this.listsliderlength = res.slider.length;
		} , (err:any) => {

		});
	}

	ionViewDidEnter(){
		this.getCategories();
		this.getCities();
		this.getDelivery();
		this.getHotDeals();
		this.getPremiumDeals();
		this.getSharedDeals();
		this.getSlider();
		this.getHotDealsCategory();
	}
	
	async toastPresent(Message){
		const toast = await this.toastController.create({
			message : Message,
			duration : 3000
		});
		await toast.present();
	}
	hasClick(sliderId){
		this.homeServ.incressCount(sliderId).then((res) => {
			console.log(res)
		} , (err) => {
			console.log(err)
		})
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

	delivery(){
		this.activetab = 'delivery';
	}
	planVoucher(){
		this.activetab = 'planVoucher';
	}
	
	premiumVoucher(){
		this.activetab = 'premiumVoucher';
	}

	getLatLong(lat ,long){
		// this.homeServ.getLatLong(lat ,long).then((res:any) => {
		// 	this.selectedCity = res.results[0].components.city;
		// 	localStorage.setItem('selectedCity' , this.selectedCity);

		// },(err:any) => {
		// });
	}

	getCategories(){
		this.homeServ.getCategories().then((res:any) => {
			if( 'data' in res ){
				this.categories = res.data;
			}
		},(err) => {

		});
	}

	cityChange (event) {
		console.log(event);
		this.selectedCity = event.detail.value;
		localStorage.setItem('selectedCity' , this.selectedCity);

		this.getHotDeals();
		this.getDelivery();
		this.getPremiumDeals();
	}

	// cityChange (event: {
	// 	component: IonicSelectableComponent,
	// 	value: any
	//   }) {
	// 	this.selectedCity = event.value.city;
	// 	localStorage.setItem('selectedCity' , this.selectedCity);
	// 	this.getHotDeals();
	// 	this.getDelivery();
	// 	this.getPremiumDeals();
	// }

	getDelivery(){
		this.homeServ.getDelivery().then((res:any) => {
			console.log(res.data);
			this.deliveryData = res.data;
			this.deliverylength = res.data.length;
		},(err:any) => {
			this.deliverylength = 0;
		});
	}
	
	getCities(){
		this.homeServ.getCities().then((res:any) => {
			if( 'data' in res ){
				// this.ports.push({'id' : res.data[i]['id'], 'name': res.data[i]['name']+"("+res.data[i]['mobile']+")" });
				this.cities = res.data;
			}
		},(err) => {

		});
	}

	getHotDeals(){
		this.homeServ.getHotDeals().then((res:any) => {
			this.hotDeals = res;
			this.hotDealsLength = res.length;
		},(err) => {
		});
	}

	getPremiumDeals(){
		this.homeServ.getPremiumDeals().then((res:any) => {
			this.premiumDeals = res.data;
			this.premiumDealsLength = res.data.length;
		},(err) => {
		});
	}

	getSharedDeals(){
		this.homeServ.getSharedDeals().then((res:any) => {
			this.sharedDeals = res.data;
			this.sharedDealsLength = res.length;
		},(err) => {
		});
	}

	countlength(string){
		return string.length;
	}
	
	getPremiumVoucher(id){
		this.navCtrl.navigateForward(['premium-details' , {premiumDealsId : id}]);
	}
	
	sharePremiumVoucher(id){
		this.navCtrl.navigateForward(['premium-details' , {shareDealsId : id}]);
	}

	getOffers(catId , catName){
		if( catName == "Business" ){
			localStorage.setItem('selectedCatId' , catId);
			this.navCtrl.navigateForward('subcategory');
		}else{
			this.navCtrl.navigateForward(['deals' , {id : catId}]);
		}
	}

	getCityName(){
		localStorage.setItem('selectedCity' , this.selectedCity);
		this.getHotDeals();
	}

	showDeals(){
		this.navCtrl.navigateForward('deals');
	}
	
	showHealthCare(){
		this.navCtrl.navigateForward('health-care');
	}

	trim(data){
		return data.trim(); 
	}
	
	getVoucher(voucherId){
		if( localStorage.getItem('user_plan') == null || localStorage.getItem('user_plan') == undefined || localStorage.getItem('user_plan') == 'null'){
			this.presentAlert();
		}else{
			this.route.navigate(['voucher-details', {voucherId : voucherId}]);
		}
	}

	getHotDealsCategory(){
		this.homeServ.getHotDealsCategory(this.selectedCity).then( (res:any) => {
			console.log(res.data)
			
			this.hotDealsCategory = res.data;
			this.selectedHotCategory = 'hotCat_'+this.hotDealsCategory[0].id;
			setTimeout(() => {
				document.getElementById('hotCat_'+this.hotDealsCategory[0].id).click();
			} , 1000);
		} , (err:any) => {

		});
	}

	getCategoryHotDeals(hotCatId){
		this.selectedHotCategory = 'hotCat_'+hotCatId;
	}

	async presentAlert() {
		const alert = await this.alertCtrl.create({
			header: 'Alert',
			message: 'Please Buy the subscription to activate The Discount India vouchers.',
			buttons: [
			{
				text: 'Okay',
				handler: () => {
					this.route.navigate(['profile']);
				}
			}
		  ]
		});
	
		await alert.present();
	}

}