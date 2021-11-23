
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
//Storagemodule
import {IonicStorageModule} from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { Camera } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//Modulos de angularfire
import { AngularFireModule } from '@angular/fire';
//angularfireStorage
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MisdirectivasModule } from './utils/directivas/directivas.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            ComponentsModule,
            MisdirectivasModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireStorageModule,
            IonicModule.forRoot(), 
            AppRoutingModule,
            ReactiveFormsModule,
            IonicStorageModule.forRoot(),
            ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
          ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
