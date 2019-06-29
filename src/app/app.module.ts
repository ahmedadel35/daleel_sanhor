import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdmobFreeService } from './admob-free.service';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FileUploadModule } from 'ng2-file-upload';

import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FileUploadModule,
    IonicStorageModule.forRoot({
      name: '__daleelsahnordb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    AdMobFree,
    AdmobFreeService,
    File,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
