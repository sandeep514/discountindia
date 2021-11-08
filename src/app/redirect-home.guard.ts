import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RedirectHomeGuard implements CanActivate {
  constructor( public navCtrl:NavController ){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('datarole_id') == '3' ) {
      console.log("njhni");
      this.navCtrl.navigateForward(['dashboard']);
    } else {
      return true;
    }
    
  }
}
