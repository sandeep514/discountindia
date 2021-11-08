import { Injectable } from '@angular/core';
import { apiPrefix } from 'src/app/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DealsService {

	constructor(public http: HttpClient) { }

	getOffers(dealId){
		let selectedCity = localStorage.getItem('selectedCity');
		let selectedCatId = localStorage.getItem('selectedCatId');

		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix+'get/offers?city='+selectedCity+'&catId='+dealId).subscribe(res=>{
				let data = res;
				resolve(res);
			},err=>{
				console.log(err);
				reject(err);
			});
		});
	}
}