import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../admin/api-service.service';
import { LoadingController, NavController } from '@ionic/angular';
import { imgPrefix } from '../constant';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit {
	subcategorylist:any;
	hasOffers = false;
	offers: any;
	imagePrefix:any;
	loader:any;

	constructor(public apiser:ApiServiceService, public loading: LoadingController, public navCtrl:NavController) { }

	ngOnInit() {
	}
  	ionViewDidEnter(){
		this.imagePrefix = imgPrefix;
		this.getSubcategory();
	  	// this.getOffers();
  	}
	async loadingPresent(){
		const loader = await this.loading.create({
			message : 'Please wait...',
			duration : 2000
		});
		loader.present();
	}
	getSubcategory(){
		this.loadingPresent();
		this.apiser.getSubcategory().then( (res:any) => {
			console.log(res);
			this.subcategorylist = res.data;
		} , (err:any) => {
			console.log(err);
		} ); 
		// this.loading.dismiss();
	}

	getOffers() {
		this.loadingPresent();
		let catId = localStorage.getItem('selectedCatId');
		this.apiser.getOffers().then((res: any) => {
			if ('data' in res) {
				this.offers = res.data;
				console.log(res.data);
				if (res.data.length > 0) {
					this.hasOffers = true;
					
				} else {
					this.hasOffers = false;
					
				}
			}
			this.loader.dismiss();
		}, (err) => {

		});
	}

	getDealsById(id){
		this.navCtrl.navigateForward(['deals' , { id : id} ]);
	}
}