import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import decode from 'jwt-decode';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router,public toastController: ToastController) {}
  async canActivate() {
    const isUserLoggedIn = await this.storage.get("token");
    if (isUserLoggedIn) {
      let rol=decode(isUserLoggedIn)['codrol'];
      if(rol==2){
        return true;
      }else{
        this.router.navigateByUrl("/tabs/login");
        this.mensaje('acceso solo a veterinarios')
      }
    } else {
      this.router.navigateByUrl("/tabs/login");
      this.mensaje('acceso denegado')
    }
  }
 

  async mensaje(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass:'animated bounceInLeft',
      position:'top'
    });
    toast.present();
  }
}
