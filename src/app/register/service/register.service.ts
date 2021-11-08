import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiPrefix } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

	constructor(public http: HttpClient) { }


	createUser(formData) {
		return new Promise((resolve,reject) => {
			this.http.post(apiPrefix+'register/user',formData).subscribe(res=>{
				console.log(res);
				resolve(res);
			},err=>{
				console.log(err);
				reject(err);
			});
		});
	}
}