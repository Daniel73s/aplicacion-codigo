import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DatalocalService } from 'src/app/servicios/datalocal.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { usuarioInterface } from 'src/app/utils/interfaces/usuario.interface';
import { veterinariaInterface } from 'src/app/utils/interfaces/veterinaria.interface';
import { VeterinariasService } from '../../servicios/veterinarias.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.page.html',
  styleUrls: ['./veterinarias.page.scss'],
})
export class VeterinariasPage implements OnInit {
public veterinarias:veterinariaInterface[];
public bandera:boolean=false;
textoBuscar:string='';
usuario:usuarioInterface;
  constructor(private vet:VeterinariasService,private router:Router,private datalocal:DatalocalService,private usu:UsuariosService,public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getvet();
    this.datalocal.getToken().then(data=>{
      if(data===null){
        this.usuario=null;
      }else{
        this.usuario=this.usu.decodificar(data);
      }
    });
  }


  getvet(){
    this.vet.getVeterinarias(true).then((data:veterinariaInterface[])=>{
      this.veterinarias=data;
      this.bandera=true;
    }).catch(e=>{
       this.mensaje('error al cargar los datos');
    })
  }

  infovet(codvet:number){
    this.router.navigate([`/tabs/infovet/${codvet}`]);
  }

  buscarVet(e){
    this.textoBuscar=e.detail.value;
  }

  guardarVetEnFavoritos(veterinaria:any){
     this.datalocal.guardarVetEnFavoritos(veterinaria).then((data:any[])=>{
       this.mensaje('Se guardo en favoritos')
     })
  }
  async mensaje(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass:'animated fadeInLeft',
      position:'top'
    });
    toast.present();
  }

  enviarWhatsapp(tel:number){
    window.location.href=`https://api.whatsapp.com/send?phone=+591${tel}`;
  }
   
}
