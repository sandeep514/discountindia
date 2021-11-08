import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPrefix } from '../constant';

@Injectable({
  	providedIn: 'root'
})
export class VerifyOtpService {

	constructor(public http:HttpClient) { }
	
	verifyOTP(formData){
		return new Promise((resolve , reject) => {
			this.http.post(apiPrefix+'admin/check/otp/verify' , formData).subscribe((res:any) => {
				resolve(res);
			} , (err:any) => {
				reject(err)
			});
		});
	}
}