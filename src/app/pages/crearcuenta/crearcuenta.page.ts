import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { cuentaInterface } from 'src/app/utils/interfaces/cuenta.interface';
import { MisValidaciones } from 'src/app/utils/validaciones/misValidaciones';
import { DatalocalService } from '../../servicios/datalocal.service';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.page.html',
  styleUrls: ['./crearcuenta.page.scss'],
})
export class CrearcuentaPage implements OnInit {
  public formulario: FormGroup;
  regex = '[A-Za-z ]*';
  regexclave='/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/';
  constructor(private fb: FormBuilder, private usu: UsuariosService, private router: Router, private auth: AuthService, private datalocal: DatalocalService,public toastController:ToastController) { }

  ngOnInit() {

    this.formInit();
console.log();


  }


  formInit() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      ap: ['', [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      am: ['', [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      celular: ['', [Validators.required, Validators.pattern(/^([0-9])*$/),Validators.maxLength(8),Validators.minLength(8)]],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      fechanac: ['', [Validators.required]],
      clave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/), Validators.minLength(8)]],
      repclave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/), Validators.minLength(8)]],
    },
      {
        validators: MisValidaciones.passwordMatchValidator
      }
    );
  }

  submit() {
    const fechacre = new Date;
    const valores = this.formulario.value;
    valores.foto = 'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/fotosPerfil%2Fuser.png?alt=media&token=dd40b091-627f-4fc0-90d3-a433d777d66b';
    this.usu.crearPersona(valores).then(data => {
      const codper = data[0].codper;
      const user = `user${codper}`;
      const clave = this.formulario.value.clave
      return this.usu.crearCuenta({
        "user": user,
        "clave": clave,
        "codper": codper,
        "codrol": '3',
        "fechacre": fechacre
      }).then(() => {
        this.iniciarSesion({ username: user, clave: clave });
      });
    })
  }


  iniciarSesion(cuenta: cuentaInterface) {
    this.auth.IniciarSesion(cuenta).then(data => {
      this.datalocal.guardarToken(data['token']);
      this.router.navigate(['/tabs/home']);
    }).catch(e => {
      this.mensaje('ocuerrio un error al iniciar sesion')
    })
  }
  getError(field: string): string {
    let mensaje;
 
    if (this.formulario.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formulario.get(field).hasError('minlength')) {
      if(field=='clave' || field=='repclave'){
        mensaje = 'la clave debe tener como minimo 8 caracteres'
      }else if(field=='celular'){
        mensaje='el numero debe tener 8 digitos'
      }
    } else if (this.formulario.get(field).hasError('pattern')) {
      if (field == 'nombre' || field == 'ap' || field == 'am') {
        mensaje = 'no se permiten numeros'
      } else if(field=='clave' || field=='repclave'){
        mensaje = 'La contraseña debe tener mayusculas minusculas digitos y caracteres especiales'
      }else if(field=='celular'){
         mensaje='solo se aceptan digitos'
      }
    } else if (this.formulario.get(field).hasError('NoPassswordMatch')) {
      mensaje = 'La clave no coincide'
    }else if (this.formulario.get(field).hasError('maxlength')) {
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
