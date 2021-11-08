import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPrefix } from 'src/app/constant';

@Injectable({
  providedIn: 'root'
})
export class VoucherDetailsService {

  	constructor(public http: HttpClient) { }

  	getVoucher(selectedVoucher) {
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/voucher/'+selectedVoucher).subscribe((res:any) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}
	
	getVousherUniqueId(voucherId) {
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'get/voucherUniqueId/'+voucherId+'/'+localStorage.getItem('dataUserId')).subscribe((res:any) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});
	}
	
	redeemVoucher( voucherId , cusId){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'admin/redeem/voucher/'+voucherId+'/'+cusId+'/'+localStorage.getItem('dataUserId')).subscribe((res:any) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});		
	}
	redeemPaidVocuher(id){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'redeem/voucher/paid/'+id+'/'+localStorage.getItem('dataUserId')).subscribe((res:any) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});	
	}

	paidRedeemVoucher( voucherId , cusId){
		return new Promise((resolve , reject) => {
			this.http.get(apiPrefix+'admin/paid/redeem/voucher/'+voucherId+'/'+cusId+'/'+localStorage.getItem('dataUserId')).subscribe((res:any) => {
				resolve(res);
			}, (err)=> {
				reject(err)
			});
		});		
	}

} 	