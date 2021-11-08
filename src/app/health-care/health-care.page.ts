import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-health-care',
  templateUrl: './health-care.page.html',
  styleUrls: ['./health-care.page.scss'],
})
export class HealthCarePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  details(){
    this.navCtrl.navigateForward('health-care-details');
  }

}
