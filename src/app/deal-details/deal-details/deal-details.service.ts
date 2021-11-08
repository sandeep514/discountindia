import { Injectable } from '@angular/core';
import { apiPrefix } from 'src/app/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealDetailsService {

    constructor(public http: HttpClient) { }

    offersVouchers(offerId){
		let plan_id = localStorage.getItem('user_plan');
		let user_id = localStorage.getItem('user_customerId');
		
		return new Promise((resolve,reject) => {
			this.http.get(apiPrefix+'get/vouchers/'+offerId+'/'+plan_id+'/'+user_id).subscribe(res=>{
				console.log(res);
				resolve(res);
			},err=>{
				console.log(err);
				reject(err);
			});
		});
	}
}