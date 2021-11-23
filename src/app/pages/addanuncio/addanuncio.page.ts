import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-addanuncio',
  templateUrl: './addanuncio.page.html',
  styleUrls: ['./addanuncio.page.scss'],
})
export class AddanuncioPage implements OnInit {

  public codvet:number;
  public formulario:FormGroup;
  private fechacre = new Date(); 
  public uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  @ViewChild('ImageAnuncio') imagenAnuncio: ElementRef;
  constructor(private route:ActivatedRoute,private fb:FormBuilder,private anuncioservise:AnunciosService,public toastController: ToastController,private router:Router,private storage: AngularFireStorage) { 
    this.codvet=Number(this.route.snapshot.paramMap.get('codvet'));
  }

  ngOnInit() {
    this.formInit();
  }



  formInit(){
  this.formulario=this.fb.group({
        titulo:['',[Validators.required,Validators.maxLength(100)]],
        texto:['',[Validators.required,Validators.maxLength(500)]]
    });
  }
   
  agregar(){
      let anuncio=this.formulario.value;
      anuncio.fechacre=this.fechacre;
      anuncio.imagen=this.imagenAnuncio.nativeElement.value;
    if(anuncio.imagen==" "){
      anuncio.imagen='https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/anuncios%2Fdefault.jpg?alt=media&token=02e4e452-7184-476b-ae52-95dacd3e0525';
    } 
      this.anuncioservise.addanuncio(anuncio).then(data=>{
        const codanuncio=data[0].codanuncio;
        const vetanuncio={
          codvet:this.codvet,
          codanuncio:codanuncio
        }
        return this.anuncioservise.addvetanuncio(vetanuncio).then((data:any)=>{
               this.mensaje(data.mensaje);
               this.router.navigate([`/tabs/misanuncios/${this.codvet}`]);
        })
      });
    this.formulario.reset();
  }

  async mensaje(texto:string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }
    // //Subir imagen a firebase
    uploadFile(event) {
      // console.log('Tiene '+ (event.target.files[0].size/1024)+' Kilobytes')
      if ((event.target.files[0].size / 1024) > 3000) {
        this.mensaje('Imagen Demaciado grande');
        return
      } else {
        const id = Math.random().toString(36).substring(2);
        const file = event.target.files[0];
        const filePath = `/veterinarias/img_${id}`;
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
