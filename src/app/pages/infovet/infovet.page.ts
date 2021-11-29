import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { veterinariaInterface } from 'src/app/utils/interfaces/veterinaria.interface';
import { VeterinariasService } from '../../servicios/veterinarias.service';
declare var mapboxgl:any;
@Component({
  selector: 'app-infovet',
  templateUrl: './infovet.page.html',
  styleUrls: ['./infovet.page.scss'],
})
export class InfovetPage implements OnInit {
  codvet:number;
  datosvet:veterinariaInterface;
  ban:boolean=false;
  Doctor:any;
  constructor(private route:ActivatedRoute,private vet:VeterinariasService,private usu:UsuariosService) { 
     this.codvet=Number(this.route.snapshot.paramMap.get('codvet'));
    //  console.log(this.codvet);
  }

  ngOnInit() {

    
  }

  ionViewWillEnter(){
    this.veterinaria();
    this.datosDoctor();
  }

  veterinaria(){
     this.vet.getVetById(this.codvet).then((data:veterinariaInterface)=>{
       this.datosvet=data[0];      
       this.ban=true;
       this.inizializarMapa(this.datosvet);
     });
  }

   datosDoctor(){
     this.usu.datosPropietario(this.codvet).then((data:any)=>{
       this.Doctor=data[0];
     
       
     })
   }

  inizializarMapa(veterinaria:veterinariaInterface){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9naW1hcGJveCIsImEiOiJja2Nxdm5nMzEwaTNxMzBtcXczcTN2YjIxIn0.bPOJOnc186Cwld5lR_PFSw';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [Number(veterinaria.lng),Number(veterinaria.lat)],
      zoom: 13,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
  });
  map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions:{
      enableHighAccuracy:true
    },
    trackUserLocation:true
  })
  );

  map.on('load', ()=> {
    // Redimencionar El mapa
    map.resize();

    //Marker
    const marker = new mapboxgl.Marker()
    .setLngLat([Number(veterinaria.lng),Number(veterinaria.lat)])
    .setPopup(new mapboxgl.Popup()
    .setHTML(   
      '<div style="text-align:center;">'  +
      '<img src="'+veterinaria.imagen+ '"  style="width:50px; height:50px; border-radius:100%; margin:auto; display:block;">'+
      '<small style="color: #a1a1a1;">'+ veterinaria.nombre+'</small> '+
      '</div>'
      ))
    .addTo(map);
    marker.togglePopup();
      }); 
  }
  llamar(celular){
    window.location.href="tel:"+celular;
  }
}
