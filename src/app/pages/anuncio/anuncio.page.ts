import { ToastController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from 'src/app/servicios/anuncios.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.page.html',
  styleUrls: ['./anuncio.page.scss'],
})
export class AnuncioPage implements OnInit {
  codanuncio:number;
  datanuncio:any;
  constructor(private route:ActivatedRoute,private anuncio:AnunciosService,private router:Router,public toastController:ToastController) { 
    this.codanuncio=Number(this.route.snapshot.paramMap.get('codanuncio'));
  }

  ngOnInit() {
    this.getanuncio();

    
  }

  getanuncio(){
    this.anuncio.getAnuncioByCodanuncio(this.codanuncio).then((data:any)=>{
      this.datanuncio=data[0];
    }).catch(e=>{
    this.mensaje('ocurrio un error inesperado intentelo nuevamente')
    })
  }

  redireccionarAveterinaria(codvet:number){
   this.router.navigate([`/tabs/infovet/${codvet}`]);
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
