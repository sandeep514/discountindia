import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealDetailsService } from './deal-details/deal-details.service';
import { imgPrefix } from '../constant';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.page.html',
  styleUrls: ['./deal-details.page.scss'],
})
export class DealDetailsPage implements OnInit {
	offerId = '';
	imagePrefix = '';
	dealsAndOffers: any;
	attachements: any;
	vouchers: any;
	category: any;
	hasPlan :any;
	loading:any;
	OwnBanner:any;

	sliderOpts = {
		zoom: false,
		spaceBetween: 20,
		centeredSlides: true,
		initialSlide: 0,
		slidesPerView: 1,

	  };
	constructor(public activateRoute: ActivatedRoute , public dealSetailServ: DealDetailsService,public navCtrl:NavController,public route:Router,public alertCtrl : AlertController,public loadingController: LoadingController) {
		this.offerId = this.activateRoute.snapshot.paramMap.get('id');
		this.getOffers();
		this.imagePrefix = imgPrefix;
		this.hasPlan = localStorage.getItem('user_plan');
		var templateType = {'1' : '1.png' , 2 : '2.png' , 3 : '3.png' , 4 : '4.png', 5 : 'longText.png'};
	}

	ngOnInit() {
		
	}

	getOffers(){
		this.presentLoading();
		this.dealSetailServ.offersVouchers(this.offerId).then((res:any) => {
			if( res.data != null ){
				this.OwnBanner = res.data;

				for (let i = 0; i < this.OwnBanner.length; i++) {
					this.OwnBanner[i]['mobileArray'] = this.OwnBanner[i].mobile.split(',');
					this.OwnBanner[i]['attachmentArray'] = JSON.parse(this.OwnBanner[i].attachment);
				}

				console.log(this.OwnBanner);				


				this.dealsAndOffers = res.data[0];
				this.attachements = JSON.parse(this.dealsAndOffers['attachment']);
				if( 'vouchers' in res.data[0] ){
					this.vouchers = res.data[0].vouchers;
				}
				if( 'category' in res.data[0] ){
					this.category = res.data[0].category;
				}
			}else{
				this.dealsAndOffers = '';
			}
			
		}, (err) => {
			console.log(err);
		})
		
	}
	parseJson(json){
		return JSON.parse(json);
	}
	profile(){
		this.navCtrl.navigateForward('profile');
	}
	countlength(string){
		return string.length;
	}
	getVoucher(voucherId){
		if( localStorage.getItem('user_plan') == null || localStorage.getItem('user_plan') == undefined || localStorage.getItem('user_plan') == 'null'){
			this.presentAlert();
		}else{
			this.route.navigate(['voucher-details', {voucherId : voucherId}]);
		}
	}

	async presentAlert() {
		const alert = await this.alertCtrl.create({
		  header: 'Alert',
		  message: 'Please Buy the subscription to activate The Discount India vouchers.',
		  buttons: ['OK']
		});
	
		await alert.present();
	}
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: 'Please wait..',
		});
		await this.loading.present();


		setTimeout(() => {
			this.loading.dismiss();
		},300);
	}
}