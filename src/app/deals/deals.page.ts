import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { DealsService } from './deals/deals.service';
import { imgPrefix } from '../constant';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../admin/api-service.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
	offers : any;
	imagePrefix = imgPrefix;
	hasOffers = false;
	loading:any;
	dealId:any;

	constructor(public navCtrl: NavController, public dealSer: DealsService, public route: Router, public loadingController: LoadingController, public actRoute:ActivatedRoute,public apiser:ApiServiceService){
		this.dealId = this.actRoute.snapshot.paramMap.get('id');
		this.getOffers();
	}

	showFilters(){
		this.navCtrl.navigateForward('filter');
	}

	ngOnInit() {
	}

	showDetail(id){
		this.route.navigate(['deal-details',{id : id}]);
	}

	getOffers(){
		this.presentLoading();
		let catId = localStorage.getItem('selectedCatId');
		this.dealSer.getOffers(this.dealId).then( (res:any) => {
			if( 'data' in res ){
				this.offers = res.data;
				console.log(this.offers);
				if( res.data.length > 0 ){
					this.hasOffers = true;
					// this.loading.dismiss();
				}else{
					this.hasOffers = false;
					// this.loading.dismiss();
				}
			}
		} ,(err:any) =>{
			console.log(err);
		} );

		// this.apiser.getDealById(this.dealId).then((res:any) => {
		// 	if( 'offers' in res ){
		// 		this.offers = res.offers;
		// 		if( res.offers.length > 0 ){
		// 			this.hasOffers = true;
		// 			// this.loading.dismiss();
		// 		}else{
		// 			this.hasOffers = false;
		// 			// this.loading.dismiss();
		// 		}
		// 	}
		// },(err) => {

		// });
	}

	profile(){
		this.navCtrl.navigateForward('profile');
	}
	
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: 'Please wait..',
			duration:1000
		});
		await this.loading.present();
	}
	getImage(JSONImage){
		// return JSON.parse(JSONImage)[0];
	}
}