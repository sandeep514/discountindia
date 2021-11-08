import { NgModule, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CanActivateGuard } from './gaurd/can-activate.guard';
import { Vibration } from '@ionic-native/vibration/ngx';
// import { IonicSelectableModule } from 'ionic-selectable';
import { Network } from '@ionic-native/network/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

@NgModule({
	declarations: [AppComponent],
		entryComponents: [],

		imports: [
			BrowserModule,
			HttpClientModule,
			IonicModule.forRoot(),
			AppRoutingModule,
			// IonicSelectableModule
		],

	providers: [
		StatusBar,
		Geolocation,
		CanActivateGuard,
		SplashScreen,
		QRScanner,	
		Vibration,	
		Network,
		// FCM,
		FirebaseMessaging,
		PhotoViewer,
		BackgroundMode,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	
	bootstrap: [AppComponent]
})
export class AppModule {}