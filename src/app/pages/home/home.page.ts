import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { DatalocalService } from 'src/app/servicios/datalocal.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';
import { usuarioInterface } from 'src/app/utils/interfaces/usuario.interface';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts={
    initialSlide: 1,
    speed: 400,
    slidesPerView: 4,
    breakpoints:{
      // when window width is >= 412px
      412: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      // when window width is >= 732px
      732: {
        slidesPerView: 7,
        spaceBetween: 30
      },
      1024:{
        slidesPerView: 8,
        spaceBetween: 30
      }
    }
  }
  slideOptsFavoritos={
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2,
    breakpoints:{
      // when window width is >= 412px
      412: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 732px
      732: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1024:{
        slidesPerView: 3.5,
        spaceBetween: 10
      }
    }
  }
  slideOptsAnuncios={
    slidesPerView:1.5,
    initialSlide: 1,
    speed: 400,
    breakpoints:{
      // when window width is >= 412px
      412: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 732px
      732: {
        slidesPerView: 3,
        spaceBetween: 10
      }
    }
  }
 
  usuario:usuarioInterface;
  anuncios:any[];
  image:any;
  veterinarias:any[];
  estadoA:boolean=true;
  estadoV:boolean=true;
  constructor(private usu:UsuariosService,
              public datalocal:DatalocalService, 
              private anuncio:AnunciosService,
              private router:Router,
              public camera:Camera,
              private vet:VeterinariasService,
              public alertController: AlertController,
              public toastController: ToastController,
              private socialSharing: SocialSharing
              ) { 
  }

  ngOnInit() {


  }

   
  abrirGaleria(){
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY ,
      allowEdit:true,
      encodingType:this.camera.EncodingType.JPEG,
      targetHeight:1024,
      targetWidth:1024,
      correctOrientation:true,
      saveToPhotoAlbum:true
    }).then(data=>{
      this.image="data:image/jpeg;base64,"+data;
    }).catch(error=>{
      this.mensaje('ocurrio un error inesperado intentelo nuevamente')
    })
  }
  ionViewWillEnter(){
    this.datalocal.getToken().then(data=>{
      if(data===null){
        this.usuario=null;

      }else{
        this.usuario=this.usu.decodificar(data);
      }
    });

    this.listarAnuncios(true);
    this.listarVet(true);
  }


  listarAnuncios(estado:boolean){
     this.anuncio.getanuncios(estado).then((data:any[])=>{
       this.anuncios=[];  
       this.estadoA=false;
       data.forEach(element=>{
         this.anuncios.unshift(element)
       });

     }).catch((e)=>{
       this.mensaje('error al cargar los datos intentelo nuevamente')
      })
  }

  eliminarDeFavoritos(vet:any){
    this.datalocal.eliminarVetDeFavoritos(vet).then(data=>{
      this.mensaje('se elimino de favoritos')
    })
  }
  listarVet(ac:boolean){
     this.vet.listarvetByAc(ac).then((data:any[])=>{
       this.veterinarias=data;
       this.estadoV=false;
     })
  }
  infoveterinaria(codvet:number){
   this.router.navigate([`/tabs/infovet/${codvet}`]);
  }

  mostrarAnuncio(codanuncio:number){
    this.router.navigate([`/tabs/anuncio/${codanuncio}`]);
  }
  //Componente de ionic-alert

  async presentAlertConfirm(vet:any) {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: '<strong>Eliminar de favoritos?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            // console.log('Confirm Okay');
            this.datalocal.eliminarVetDeFavoritos(vet).then(data=>{
              // console.log(data,"se eliminno la veterinaria");
              this.mensaje("se elimino de favoritos");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async mensaje(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
