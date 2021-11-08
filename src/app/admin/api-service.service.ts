import { Injectable } from '@angular/core';
import { apiPrefix } from '../constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  	constructor(public http: HttpClient) { }

	createPaidVoucherByadminApp(formData){
		return new Promise((resolve,reject) => {
			this.http.post(apiPrefix+'create/admin/voucher',formData).subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}

	getVouchers(){
		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix+'admin/get/client/voucher/'+localStorage.getItem('dataUserId')).subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}

	getDelivery(){
		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix+'get/delivery').subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}
	
	getUserDetailsVoucher(){
		let userId = localStorage.getItem('dataUserId');
		return new Promise((resolve,reject)=>{
			this.http.get(apiPrefix+'get/user/redeem/voucher/'+userId).subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});		
	}
	
	getUserPaidDetailsVoucher(){
		let userId = localStorage.getItem('dataUserId');
		return new Promise((resolve,reject)=>{
			this.http.get(apiPrefix+'list/paid/voucher/'+userId).subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});		
	}

	getUserSharedPaidDetailsVoucher(){
		let userId = localStorage.getItem('dataUserId');
		return new Promise((resolve,reject)=>{
			this.http.get(apiPrefix+'list/shared/paid/voucher/'+userId).subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});		
	}

	ListPlans(){
		return new Promise((resolve,reject)=>{
			this.http.get(apiPrefix+'list/plans').subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});		
	}


	getSubcategory(){
		return new Promise((resolve,reject)=>{
			this.http.get(apiPrefix +'get/sub/category').subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});		
	}

	getOffers() {
		let selectedCity = localStorage.getItem('selectedCity');
		let selectedCatId = localStorage.getItem('selectedCatId');

		return new Promise((resolve, reject) => {
			this.http.get(apiPrefix + 'get/offers?city=' + selectedCity + '&catId=' + selectedCatId).subscribe(res => {
				let data = res;
				resolve(res);
			}, err => {
				console.log(err);
				reject(err);
			});
		});
	}
	getDealById(id){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix +'get/deals/sub/category/'+id).subscribe((res:any) => {
				resolve(res);
			} , (err:any) => {
				reject(err);
			});
		});
	}
}