import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatalocalService } from 'src/app/servicios/datalocal.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { usuarioInterface } from 'src/app/utils/interfaces/usuario.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{
  usuario:usuarioInterface;

  constructor(private router:Router,private usu:UsuariosService,private datalocal:DatalocalService) {}


 ngOnInit() {

  console.log("Inicio el menu");
 


    this.datalocal.getToken().then(data=>{
      if(data===null){
        this.usuario=null;
        console.log('La data esta nula desde el menu'+this.usuario);
      }else{
        this.usuario=this.usu.decodificar(data);
        console.log(this.usuario,'Desde el menu');
      }
    });

    
  
  }


  misveterinarias(codper:number){
    this.router.navigate([`/tabs/misveterinarias/${codper}`]);

  }
}
