import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-modanuncio',
  templateUrl: './modanuncio.page.html',
  styleUrls: ['./modanuncio.page.scss'],
})
export class ModanuncioPage {
codanuncio:number;
formulario:FormGroup;
codvet:number;
estado:boolean;
imagen:string;
public uploadPercent: Observable<number>;
public urlImage: Observable<string>;
@ViewChild('ImageAnuncio') imagenAnuncio: ElementRef;
private fechamod = new Date();
  constructor(private route:ActivatedRoute,private anuncio:AnunciosService,public toastController: ToastController,private fb:FormBuilder,private router:Router,private storage: AngularFireStorage) { 
    this.codanuncio=Number(this.route.snapshot.paramMap.get('codanuncio'))
  }

  ionViewWillEnter() {
    this.formInit();
  }



async formInit(){
    const info=await this.anuncio.getAnuncioByCodanuncio(this.codanuncio);

    
    this.codvet=info[0].codvet;
    this.estado=info[0].estado;
    this.imagen=info[0].imganuncio;
    this.formulario=this.fb.group({
      titulo:[info[0].titulo,[Validators.required,Validators.maxLength(100)]],
      texto:[info[0].texto,[Validators.required,Validators.maxLength(500)]]
    })
}

  cambiarEstado(e,codanuncio:number){
   const datosanuncio={
     'codanuncio':codanuncio,
     'estado':e.detail.checked 
   }
   this.anuncio.CambiarEsatdoAnuncio(datosanuncio).then((data:any)=>{
     this.Mensaje(data.mensaje);
   })
  }

actualizar(){
  let anuncio=this.formulario.value;
  anuncio.codanuncio=this.codanuncio;
  anuncio.fechamod=this.fechamod;
  anuncio.imagen=this.imagenAnuncio.nativeElement.value;
  if(anuncio.imagen==""){
    anuncio.imagen=this.imagen;
  }
  // console.log(this.imagenAnuncio.nativeElement.value,"Esta es la imagen");
  // console.log(this.imagen,"esta es la imagen del anuncio");
  
  // console.log(anuncio,"Se envio esta data Anuncio");
  
  this.anuncio.actualizaranuncio(anuncio).then((data:any)=>{
    this.Mensaje(data.mensaje);
    this.router.navigate([`/tabs/misanuncios/${this.codvet}`]);
  })
  
}

  async Mensaje(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


  // //Subir imagen a firebase
  uploadFile(event) {
    // console.log('Tiene '+ (event.target.files[0].size/1024)+' Kilobytes')
    if ((event.target.files[0].size / 1024) > 3000) {
      this.Mensaje('Imagen Demaciado grande');
      return
    } else {
      const id = Math.random().toString(36).substring(2);
      const file = event.target.files[0];
      const filePath = `/anuncios/img_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() =>
        this.urlImage = ref.getDownloadURL()
      )).subscribe();
    }
  }


  getError(field: string): string {
    let mensaje;
 
    if (this.formulario.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    }else if(this.formulario.get(field).hasError('maxlength')){
      if(field=='titulo'){
        mensaje='el titulo no debe pasar de 100 caracteres'
      }else if(field=='texto'){
        mensaje='el texto no debe pasar de 500 caracteres'
      }
    }
    return mensaje
  }
}
