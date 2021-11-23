import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';
import { veterinariaInterface } from 'src/app/utils/interfaces/veterinaria.interface';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-misveterinarias',
  templateUrl: './misveterinarias.page.html',
  styleUrls: ['./misveterinarias.page.scss'],
})
export class MisveterinariasPage{
codper:number;
misveterinarias:veterinariaInterface[];
  constructor(private route:ActivatedRoute,private vet:VeterinariasService,public actionSheetController: ActionSheetController,private router:Router) {
    this.codper=Number(this.route.snapshot.paramMap.get('codper'))
   }

   ionViewWillEnter() {
   this.listarMisVeterinarias(this.codper);
  }


  listarMisVeterinarias(codper:number){
      this.vet.listarmisveterinarias(codper).then((data:veterinariaInterface[])=>{
        this.misveterinarias=data; 
      })
  }
  async presentActionSheet(codvet:number) {

    
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.router.navigate([`/tabs/modveterinaria/${codvet}`]);
        }
      }, {
        text: 'Anuncios',
        icon: 'clipboard',
        handler: () => {
          this.router.navigate([`/tabs/misanuncios/${codvet}`]);
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

  }
}
