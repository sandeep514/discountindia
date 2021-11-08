import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NavController, Events, Platform, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-redeem-voucher',
  templateUrl: './redeem-voucher.page.html',
  styleUrls: ['./redeem-voucher.page.scss'],
})
export class RedeemVoucherPage implements OnInit {
	scanSub:any;
	isHide = 'show';
	loading:any;
	constructor(private qrScanner: QRScanner,public navCtrl:NavController,public events:Events,public platform:Platform,public loader:LoadingController) {
		
	}

    ngOnInit() {
		this.qrscan();
	}
	async presentLoader(){
		this.loading = await this.loader.create({
			message : 'Please wait...',
			duration: 1000
		});
		this.loading.present();
	}
	qrscan(){
		this.platform.ready().then(() => {
			this.qrScanner.prepare().then((status: QRScannerStatus) => {
				this.qrScanner.show();
				if (status.authorized) {
					console.log("thbhjfbfrgb");
					this.qrScanner.scan().subscribe((text: string) => {
						this.presentLoader();

						console.log(text);
						
						this.events.subscribe('open:qr', (data) => {
							this.isHide = 'hide';
						});

						this.qrScanner.hide();
						// scanSub.unsubscribe();
						this.navCtrl.pop();
						this.navCtrl.navigateRoot(['voucher-detail', { data: text }]);
					});
				} else if (status.denied) {
					console.log('denied');
				} else {
					console.log("rfe");
				}
			}).catch((e: any) => console.log('Error is', e));


		});
	}
	home(){
		this.navCtrl.navigateForward(['dashboard']);
	}	
}