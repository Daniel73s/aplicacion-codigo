import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatalocalService } from '../../servicios/datalocal.service';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { usuarioInterface } from 'src/app/utils/interfaces/usuario.interface';
import { AlertController, ToastController } from '@ionic/angular';
import { RolesService } from 'src/app/servicios/roles.service';
import { MisValidaciones } from 'src/app/utils/validaciones/misValidaciones';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup;
  usuario: usuarioInterface;
  edicion: boolean = false;
  formularioEdicion: FormGroup;
  codper: number;
  foto: string;
  rolInfo: any={nombre:'',codrol:''};
  estado: boolean;
  formularioClave: FormGroup;
  loading: any;
  regex = '[A-Za-z ]*';
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private datalocal: DatalocalService,
    private router: Router,
    private usu: UsuariosService,
    public alertController: AlertController,
    private rol: RolesService,
    public toastController: ToastController,
    public loadingController: LoadingController) { }



  ngOnInit() {
    this.formInit();
    this.formClave();

    
  }


  formInit() {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      clave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/), Validators.minLength(8)]]
    });
  }

  async submit() {
    this.presentLoading();
    this.auth.IniciarSesion(this.formulario.value).then(data => {
      this.datalocal.guardarToken(data['token']);
      this.router.navigate(['/tabs/home']);
      this.loading.dismiss();
    }).catch(e => {
      this.loading.dismiss();
      this.Mensaje('usuario o clave incorrectos');
    })

  }

  salir() {
    this.auth.CerrarSesion().then(() => {
      this.router.navigate(['/tabs/home']);
      this.Mensaje('sesion cerrada');
    }).catch(e => {
      this.Mensaje('Se produjo un error al salir intentelo nuevamante');
    })
  }


  ionViewWillEnter() {
    this.edicion = false;
    this.estado = false;
    this.datalocal.getToken().then(data => {
      if (data === null) {
        this.usuario = null;
      } else {
        this.usuario = this.usu.decodificar(data);
        
        this.infopersona(this.usuario.codper);
        //console.log(this.usuario);
        // this.getRolById(this.usuario.codrol);

      }
    });
  }




  async infopersona(codper: number) {
    const persona = await this.usu.getpersonaById(codper);
    this.codper = persona[0].codper;
    this.foto = persona[0].foto;
    this.rolInfo.codrol=persona[0].codrol;
    this.rolInfo.nombre=persona[0].rol;
    this.formularioEdicion = this.fb.group({
      nombre: [persona[0].nombre, [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      ap: [persona[0].ap, [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      am: [persona[0].am, [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      fechanac: [persona[0].fechanac, [Validators.required]],
      celular: [persona[0].celular, [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(8), Validators.minLength(8)]],
      direccion: [persona[0].direccion, [Validators.required, Validators.maxLength(200)]]
    })
  }

  activarEdicion(e: any) {
    this.edicion = e.detail.checked;
  }

  async alerta() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesion',
      message: '<p>para realizar los cambios, se cerrara automaticamente la sesion!!! </p>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.modificar();
            this.auth.CerrarSesion();
            this.router.navigate(['/tabs/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  modificar() {
    let valores = this.formularioEdicion.value;
    valores.foto = this.foto;
    this.usu.modpersona(this.codper, valores).then(data => {
      this.Mensaje('Se modifico satisfactoriamente');
    }).catch(e => {
      this.Mensaje('Ocurrio un error inesperado');

    })
  }

  miveterinaria(codper: number) {
    this.router.navigate([`/tabs/misveterinarias/${codper}`]);
  }

  /*getRolById(codrol: number) {
    this.rol.getRolById(codrol).then((data: any) => {
      this.rolInfo = data[0];
    }).catch(e => {
      this.Mensaje('Ocurrio un error inesperado');
    })
  }*/

  cambiarestado(e: any) {
    this.estado = e.detail.checked;
  }

  formClave() {
    this.formularioClave = this.fb.group({
      clave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/), Validators.minLength(8)]],
      repclave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/), Validators.minLength(8)]]
    },
      {
        validators: MisValidaciones.passwordMatchValidator
      }
    )
  }
  modificarClave() {

    this.usu.cambiarClave({
      username: this.usuario.login,
      clave: this.formularioClave.value.clave
    }).then(data => {
      this.Mensaje(data['mensaje']);
      this.formularioClave.reset();
      this.estado = false;
    }).catch(e => {
      this.Mensaje('Ocurrio un error inesperado');
    })

  }

  async Mensaje(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      cssClass: 'animated bounceIn'
    });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Autenticando...',
      cssClass: 'animated bounceInLeft'
    });
    return this.loading.present();
  }

  getError(field: string): string {
    let mensaje;

    if (this.formulario.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formulario.get(field).hasError('minlength')) {
      mensaje = 'la clave debe tener como minimo 8 caracteres'
    } else if (this.formulario.get(field).hasError('pattern')) {
      mensaje = 'La contraseña debe tener mayusculas minusculas digitos y caracteres especiales'
    }
    return mensaje
  }


  getErrorEditar(field: string): string {
    let mensaje;

    if (this.formularioEdicion.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formularioEdicion.get(field).hasError('minlength')) {
      if (field == 'celular') {
        mensaje = 'el numero debe tener 8 digitos'
      }
    } else if (this.formularioEdicion.get(field).hasError('pattern')) {
      if (field == 'nombre' || field == 'ap' || field == 'am') {
        mensaje = 'no se aceptan digitos'
      } else if (field == 'celular') {
        mensaje = 'solo se aceptan digitos'
      }
    } else if (this.formularioEdicion.get(field).hasError('maxlength')) {
      if(field=='nombre' || field=='ap' || field=='am'){
        mensaje = 'supero el numero de caracteres validos'
      }else if(field=='celular'){
        mensaje='solo se permiten 8 digitos'
      }else if(field=='direccion'){
        mensaje='solo se permiten 250 caracteres'
      }
    }
    return mensaje
  }

  getErrorClave(field: string): string {
    let mensaje;

    if (this.formularioClave.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formularioClave.get(field).hasError('minlength')) {
      mensaje = 'la clave debe tener como minimo 8 caracteres'
    } else if (this.formularioClave.get(field).hasError('pattern')) {
      mensaje = 'La contraseña debe tener mayusculas minusculas digitos y caracteres especiales'
    }else if (this.formularioClave.get(field).hasError('NoPassswordMatch')) {
      mensaje = 'La clave no coincide'
    }
    return mensaje
  }

}
