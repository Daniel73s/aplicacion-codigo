import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import decode from 'jwt-decode';
import { ToastController } from '@ionic/angular';
import { UsuariosService } from "src/app/servicios/usuarios.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router,public toastController: ToastController,private usu:UsuariosService) {}
  async canActivate() {
    const isUserLoggedIn = await this.storage.get("token");
    let codper=decode(isUserLoggedIn)['codper'];
    const persona = await this.usu.getpersonaById(codper);
    let rol=persona[0].codrol;
    if (persona) {
      //let rol=decode(isUserLoggedIn)['codrol'];
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
