import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from 'src/app/servicios/anuncios.service';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './misanuncios.page.html',
  styleUrls: ['./misanuncios.page.scss'],
})
export class MisanunciosPage {

  public misAnuncios:any[];
  public valueSelected:string='todos';
  private codvet:number;
  constructor(private anuncios:AnunciosService,private router:Router,private route:ActivatedRoute) { 
    this.codvet=Number(this.route.snapshot.paramMap.get('codvet'));
  }


  // ngOnInit(){}
  ionViewWillEnter(){
    this.getMisAnuncios(this.codvet);

    
  }


  getMisAnuncios(codvet:number){
    this.anuncios.getAnuncioByCodVet(codvet).then((data:any[])=>{
      this.misAnuncios=data;
    });
  }

  cambiar(e){
    this.valueSelected=e.detail.value;
  }

  modanuncio(codanuncio:number){
     this.router.navigate([`/tabs/modanuncio/${codanuncio}`]);
  }
  addanuncio(){
       this.router.navigate([`/tabs/addanuncio/${this.codvet}`])
  }
}
