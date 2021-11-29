import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { cuentaInterface } from '../utils/interfaces/cuenta.interface';
import { usuarioInterface } from '../utils/interfaces/usuario.interface';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
usuario:usuarioInterface
url='https://apidogi.herokuapp.com/usuarios';
  constructor(private http:HttpClient) { }


  decodificar(token:string){
    this.usuario = decode(token);
     return this.usuario; 
  }

  crearPersona(persona:any){
     return this.http.post(`${this.url}/crearPersona`,persona).toPromise();
  }
  crearCuenta(usuario:any){
    return this.http.post(`${this.url}/crearCuenta`,usuario).toPromise();
  }
  getpersonaById(codper:number){
    return this.http.get(`${this.url}/imprimirPersona/${codper}`).toPromise();
  }

 
  // listarPersonaById

  modpersona(codper:number,persona:any){
    return this.http.put(`${this.url}/modPersona/${codper}`,persona).toPromise();
  }

  cambiarClave(cuenta:cuentaInterface){
     return this.http.put(`${this.url}/cambiarclave`,cuenta).toPromise();
  }
  datosPropietario(codvet:number){
    return this.http.get(`${this.url}/pervet/${codvet}`).toPromise();
  }
}

