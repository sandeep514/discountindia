import { Injectable } from '@angular/core';
import { apiPrefix } from 'src/app/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	constructor(public http: HttpClient) {

	}
	loginUser(formData){
		return new Promise((resolve,reject) => {
			this.http.post(apiPrefix+'login/user',formData).subscribe(res=>{
				console.log(res);
				resolve(res);
			},err=>{
				console.log(err);
				reject(err);
			});
		});
	}

}