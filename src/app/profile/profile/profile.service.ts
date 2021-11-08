import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPrefix } from 'src/app/constant';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	constructor(public http: HttpClient) { }
	profile() {
		return new Promise( (resolve,reject) => {
			if(localStorage.getItem('user_customerId') != null){
				this.http.get( apiPrefix+'get/user/profile/'+localStorage.getItem('user_customerId') ).subscribe(res=>{
					resolve(res);
				},err=>{
					reject(err);
				});
			}
		});
	}	
}