import { Injectable } from '@angular/core';
import { apiPrefix } from '../constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class ForgetPasswordService {

	constructor( public http:HttpClient) { }
	
	checkIfUserExist(mobile){
		let formData = new FormData;
		formData.append('mobile' , mobile);

		return new Promise((resolve , reject) => {
			this.http.post(apiPrefix+'admin/check/user/exist' , formData).subscribe((res:any) => {
				resolve(res);
			},(err:any)=>{
				reject(err);
			});
		});
	}
}