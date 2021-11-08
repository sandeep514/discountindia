import { Injectable } from '@angular/core';
import { apiPrefix } from 'src/app/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

	constructor(public http:HttpClient) {
	}

	getLatLong( lat , long){
		return new Promise((resolve,reject) => {
			this.http.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+long+'9&key=2647316fdf9d41789fd81ee6e2034542').subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}

	getHotDealsCategory(selectedCity){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/deals/category/'+selectedCity).subscribe((res:any) => {
				resolve(res);
				
			} , (err:any) => {
				reject(err);
			});
		} );
	}	

	getDelivery(){
		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix + 'get/delivery/'+localStorage.getItem('selectedCity')).subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}

	getCategories(){
		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix+'get/categories').subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}

	getCities(){
		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix+'get/cities').subscribe(res=>{
				resolve(res);
			},err=>{
				reject(err);
			});
		});
	}

	getSlider(){
		var city =  localStorage.getItem('selectedCity');
		if( city == null ){
			city = "Amritsar";
		}
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix +'get/slider/'+city).subscribe((res:any) => {
				resolve(res);
			},(err:any) => {
				reject(err);
			});
		});
	}

	getHotDeals(){
		var city =  localStorage.getItem('selectedCity');
		if( city == null ){
			city = "Amritsar";
		}		

		return new Promise((resolve , reject) => {
			
			this.http.get(apiPrefix+'get/hot/deals/'+localStorage.getItem('user_customerId')+'/'+city).subscribe((res) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}
	getPremiumDeals(){
		var city =  localStorage.getItem('selectedCity');
		if( city == null ){
			city = "Amritsar";
		}
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/premium/deals/'+city).subscribe((res) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}
	getSharedDeals(){
		var userId =  localStorage.getItem('dataUserId');
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/share/voucher/deals/'+userId).subscribe((res) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}
	
	updateToken(formData){
		return new Promise((resolve , reject) => {
			this.http.post( apiPrefix+'update/token' , formData ).subscribe((res:any) => {
				resolve(res);
			} , (err:any) => {
				reject(err);
			});
		});
	}
	incressCount(sliderId){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'update/count/top/slider/'+sliderId).subscribe((res) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}	
	getPlanDetails(planId){
		// get/plan/details/{id}
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/plan/details/'+planId).subscribe((res) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}
}