import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPrefix } from 'src/app/constant';

@Injectable({
  providedIn: 'root'
})
export class PremiumDetailsService {

    constructor(public http:HttpClient) { }

	getVoucherDetails(voucherId){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/paid/voucher/details/'+voucherId).subscribe((res:any) => {
				resolve(res);
			},(err:any) => {
				reject(err);
			});
		});
	}
	
	shareVoucherDetails(voucherId){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/share/voucher/details/'+voucherId).subscribe((res:any) => {
				resolve(res);
			},(err:any) => {
				reject(err);
			});
		});
	}

	updatePaymentSystem(voucherId , paymentId, voucherType){
		let formData = new FormData();
		formData.append('voucherId' , voucherId);
		formData.append('paymentId' , paymentId);
		formData.append('voucherType' , voucherType);
		formData.append('userId' , localStorage.getItem('dataUserId'));
			
		return new Promise((resolve , reject) => {
			this.http.post(apiPrefix+'update/voucher/payment/status', formData).subscribe((res:any) => {
				resolve( res );
			} , (err:any) => {
				reject( err );
			});
		});
		
	}
}
