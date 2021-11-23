import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-modveterinaria',
  templateUrl: './modveterinaria.page.html',
  styleUrls: ['./modveterinaria.page.scss'],
})
export class ModveterinariaPage {
  public codvet: number;
  public veterinaria: any[];
  public formulario: FormGroup;
  public ac: boolean;
  public imagen: string;
  public uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  @ViewChild('Imagevet') fotovet: ElementRef;

  constructor(private route: ActivatedRoute,
    private vetService: VeterinariasService,
    private fb: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.codvet = Number(this.route.snapshot.paramMap.get('codvet'))
  }

  ionViewWillEnter() {
    this.getInfoVet(this.codvet);
    this.formInit();
  }

  async formInit() {
    const vet = await this.vetService.getVetById(this.codvet);
    this.ac = vet[0].ac;
    this.imagen = vet[0].imagen;
    this.formulario = this.fb.group({
      nombre: [vet[0].nombre, [Validators.maxLength(30), Validators.required]],
      descripcion: [vet[0].descripcion, [Validators.required, Validators.maxLength(250)]],
      direccion: [vet[0].direccion, [Validators.maxLength(150), Validators.required]],
      horarioatencion: [vet[0].horarioatencion, [Validators.required]],
      telefono: [vet[0].telefono, [Validators.required, Validators.pattern(/^([0-9])*$/),Validators.maxLength(8),Validators.minLength(8)]],
      atenciondom: [vet[0].atenciondom]
    });
  }

  getInfoVet(codvet: number) {
    this.vetService.getVetById(codvet).then((data: any) => {
      this.veterinaria = data[0];
    });
  }

  abrirCerrar(e, codvet: number) {
    let ac = e.detail.checked;


    this.vetService.abrirCerrarVet({
      codvet: codvet,
      ac: ac
    }).then((data: any) => {

      this.Mensaje(data.Mensaje);
    })
  }

  modificar() {
    let veterinaria = this.formulario.value;
    const fechamod = new Date();
    veterinaria.codvet = this.codvet;
    veterinaria.fechamod = fechamod;
    veterinaria.imagen=this.fotovet.nativeElement.value;
    if(veterinaria.imagen==""){
      veterinaria.imagen=this.imagen;
    }

    
    this.vetService.modvetapp(veterinaria).then(data => {
      this.Mensaje(data['mensaje']);
      this.router.navigate([`/tabs/login`])
    }).catch(e => {
      this.Mensaje(`ocurrio un error inesperado`)
    })
  }


  async Mensaje(mensaje: string) {
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
    } else if (this.formulario.get(field).hasError('maxlength')) {
      if (field == 'nombre') {
        mensaje = 'solo se permiten 30 caracteres como maximo'
      } else if (field == 'direccion') {
        mensaje = 'solo se permiten 150 caracteres'
      } else if (field == 'descripcion') {
        mensaje = 'solo se permiten 250 caracteres'
      }else if(field=='telefono'){
        mensaje = 'solo se permiten 8 digitos'
      }
    } else if (this.formulario.get(field).hasError('minlength')) {
      mensaje = 'faltan digitos'
    } else if (this.formulario.get(field).hasError('pattern')) {
      mensaje = 'numero no valido'
    }
    return mensaje
  }
}
