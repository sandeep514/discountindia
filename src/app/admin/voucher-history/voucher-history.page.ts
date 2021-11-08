import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-voucher-history',
  templateUrl: './voucher-history.page.html',
  styleUrls: ['./voucher-history.page.scss'],
})
export class VoucherHistoryPage implements OnInit {
  voucherDetails:any;

  constructor(public apiSer:ApiServiceService) { }

  	ngOnInit() {
		this.getVocuhersDetails();
	}
	
	getVocuhersDetails(){
		this.apiSer.getUserDetailsVoucher().then((res:any) => {
			this.voucherDetails = res.data;
			console.log(res);
		} , (err:any)=> {
			console.log(err);
		});
	}
	
}