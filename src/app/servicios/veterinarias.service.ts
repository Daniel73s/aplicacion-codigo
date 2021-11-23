import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VeterinariasService {
private url:string='https://apidogi.herokuapp.com/veterinarias'


  constructor(private http:HttpClient) { }

  getVeterinarias(estado:boolean){
  return this.http.get( `${this.url}/listarvetbyestado/${estado}`).toPromise()
  }

  getVetById(codvet:number){
    return this.http.get(`${this.url}/vetByid/${codvet}`).toPromise()
  }
  listarmisveterinarias(codper:number){
    return this.http.get(`${this.url}/listarvetusu/${codper}`).toPromise()
  }

  abrirCerrarVet(acVet:any){
    return this.http.put(`${this.url}/abrirCerrarVet`,acVet).toPromise()
  }

  listarvetByAc(ac:boolean){
    return this.http.get(`${this.url}/listarvetbyac/${ac}`).toPromise()
  }
  
  //modificar veterinaria desde la app
  modvetapp(vet:any){
      return this.http.put(`${this.url}/modvetapp`,vet).toPromise()
  }
}
