import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class DatalocalService {
  private usuario$:Subject<any>;
  private usuario:string;
  veterinarias:any[]=[];
  private repetido:boolean=false;
  constructor(private storage:Storage) { 
    this.usuario$=new Subject();
    this.cargarStorage();
  }


  setusuario(token:string){
       this.usuario=decode(token);
       this.usuario$.next(this.usuario);
  }
  getusuario():Observable<any>{
    return this.usuario$.asObservable();
  }

  guardarToken(token:string){
    return this.storage.set('token',token);
  }
 eliminarToken(){
    return this.storage.remove('token');
 }
 getToken(){
   return this.storage.get('token');
 }


 //metodos que manejan el localstorage
 async cargarStorage(){
  this.veterinarias = await this.storage.get('registros') || [];

}
guardarVetEnFavoritos(vet){
  if(this.veterinarias.length===0){
    this.veterinarias.unshift(vet);
    return this.storage.set('registros',this.veterinarias)
  }else{
    this.repetido=this.veterificarRepetido(vet);
    if(this.repetido){
        return this.storage.set('registros',this.veterinarias)
    }else{
        this.veterinarias.unshift(vet);
        return this.storage.set('registros',this.veterinarias)
    }
  }
}
eliminarVetDeFavoritos(vetdelete){
  this.veterinarias=this.veterinarias.filter(vet=>vet.codvet != vetdelete.codvet)
  return this.storage.set('registros',this.veterinarias)
}
veterificarRepetido(vet:any):boolean{
  let estado:boolean;
  for(let i=0;i<this.veterinarias.length;i++){
    if(this.veterinarias[i].codvet==vet.codvet){
        estado=true;
        break
    }else{
      estado=false;
    }
  }
  return estado;
 }
}
