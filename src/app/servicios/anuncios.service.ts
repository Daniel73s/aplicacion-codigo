import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
private url:string='https://apidogi.herokuapp.com/anuncios';
  constructor(private http:HttpClient) { }


  getanuncios(estado:boolean){
      return this.http.get(`${this.url}/listaranuncioporestado/${estado}`).toPromise();
  }

  getAnuncioByCodanuncio(codanuncio:number){
    return this.http.get(`${this.url}/listaranunciobycodanuncio/${codanuncio}`).toPromise();
  }

  getAnuncioByCodVet(codvet:number){
    return this.http.get(`${this.url}/listaranunciobycodvet/${codvet}`).toPromise();
  }

  CambiarEsatdoAnuncio(datosanuncio:any){
     return this.http.put(`${this.url}/cambiarestado`,datosanuncio).toPromise();
  }
 
  addanuncio(anuncio:any){
     return this.http.post(`${this.url}/addanuncio`,anuncio).toPromise();
  }

  addvetanuncio(vetanuncio:any){
    return this.http.post(`${this.url}/addvetanuncio`,vetanuncio).toPromise();
  }

  actualizaranuncio(anuncio:any){
    return this.http.put(`${this.url}/actualizaranuncio`,anuncio).toPromise();
  }

}
