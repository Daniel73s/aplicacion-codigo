import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { cuentaInterface } from '../utils/interfaces/cuenta.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='https://apidogi.herokuapp.com/autenticacion'; 
  constructor(private http:HttpClient,private storage:Storage) { }

  IniciarSesion(datos:cuentaInterface){
     return this.http.post(`${this.url}/login`,datos).toPromise()
  }

  CerrarSesion(){
    return this.storage.remove('token');
  }

}
