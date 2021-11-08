import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';

@Component({
	selector: 'app-create-voucher',
	templateUrl: './create-voucher.page.html',
	styleUrls: ['./create-voucher.page.scss'],
})

export class CreateVoucherPage implements OnInit {
  	templates:any;
  	selectedTemplate:any;
	title:any;
	validDate:any;
	TandC:any;
	customerPrice:any;
	hotelPrice:any;
	currentDate:any;
	maxDate:any;
	
	constructor(public altrCtrl:AlertController,public apiSer:ApiServiceService) {
		this.templates = {'1' : 'Template One','2' : 'Template two','3' : 'Template three','4' : ' template Four','5' : 'Long Text'};
		var todayFullDate = new Date();
		var todayYear = todayFullDate.getFullYear();
		var todayMonth = todayFullDate.getMonth();
		var todayDate = todayFullDate.getDate();

		this.currentDate = todayYear+"-"+todayMonth+"-"+todayDate;
		this.maxDate = (todayYear+3)+'-'+todayMonth+"-"+todayDate;
	}

	ngOnInit() {
	}

	createVoucher(){
		console.log(this.selectedTemplate);
		console.log(this.title);
		console.log(this.validDate);
		console.log(this.TandC);
		console.log(this.customerPrice);
		console.log(this.hotelPrice);

		if( this.selectedTemplate == undefined || this.title == undefined || this.validDate == undefined || this.TandC == undefined || this.customerPrice == undefined || this.hotelPrice == undefined ){
			this.presentAlert("Requires Field missing.!" ,"Please fill all required fields. " );
		}else{
			let data = {
				selectedTemplate : this.selectedTemplate,
				title : this.title,
				validDate : this.validDate,
				TandC : this.TandC,
				customerPrice : this.customerPrice,
				hotelPrice : this.hotelPrice,
				belongsTo : localStorage.getItem('dataUserId')
			}
			this.createPaidVoucherByadminApp(data);
		}
	
	}
	async presentAlert(header , message){
		const alert  = 	await this.altrCtrl.create({
							header : header,
							message  : message,
							buttons : ['Dismiss']
						});
		alert.present();
	}

	createPaidVoucherByadminApp(formData){
		this.apiSer.createPaidVoucherByadminApp(formData).then((res:any) => {
			if( res.status == "success"){
				this.presentAlert('Success' , 'voucher create successfully');
			}
		} , (err:any) => {
			console.log(err);
		})
	}
}