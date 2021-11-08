import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPrefix } from '../constant';
import { ActivatedRoute } from '@angular/router';
import { VoucherDetailsService } from './voucher-details/voucher-details.service';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.page.html',
  styleUrls: ['./voucher-details.page.scss'],
})
export class VoucherDetailsPage implements OnInit {
	selectedVoucher :any;
	vouchers = { id : '', voucher_template : '',	title : '',	valid_date : '', terms_condition : '', voucher_unique_id : '' , offer : {category: {icon: ''}}};
	customerId : any;
	constructor( public http: HttpClient , public activeRoute: ActivatedRoute , public voucherDeServ: VoucherDetailsService) {
		this.selectedVoucher = this.activeRoute.snapshot.paramMap.get('voucherId');
		this.getVoucher();
		this.customerId = localStorage.getItem('user_customerId');	}

	ngOnInit() {

	}

	getVoucher() {
		this.voucherDeServ.getVoucher(this.selectedVoucher).then((res:any) => {
			console.log(res);
			
			if( 'data' in res ){
				this.vouchers = res.data;
				console.log(res.data);
			}
		},(err) => {
		});
	}

	countlength(string){
		return string.length;
	}
}