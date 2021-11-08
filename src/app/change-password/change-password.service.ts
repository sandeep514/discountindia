import { Injectable } from '@angular/core';
import { apiPrefix } from '../constant';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

	constructor(public http:HttpClient) { }

	changePassword(formData){
		return new Promise((resolve ,reject) => {
			this.http.post(apiPrefix+'admin/update/password' , formData).subscribe((res:any) =>{
				resolve(res);
				console.log(res);
			}, (err:any) => {
				reject(err);
				console.log(err);
			});
		});
	}
}