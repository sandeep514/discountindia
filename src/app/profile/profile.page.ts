import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	UserProfileData :any;
	hasPlan:any;
	hasCustomer:any;

	constructor( public profileSer : ProfileService, public route:Router) { }

	ngOnInit() {
		this.profile();
		this.hasPlan = localStorage.getItem('user_plan');

		if( this.hasPlan == 'null' ){
			this.hasCustomer = false;;
		}else{
			this.hasCustomer = true;
		}
		console.log(typeof this.hasPlan);
	}
	
	logout(){
		localStorage.clear();
		this.route.navigate(['login']);
	}

	profile(){
		this.profileSer.profile().then((res: any) => {
			this.UserProfileData = res.data;
			console.log(res);
		},(err: any) => {
			console.log(err);
		});
	}
}