import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      name: 'الرئيسية',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'AddNew',
      name: 'إضافة المزيد',
      url: '/add-new',
      icon: 'add-circle'
    }
    ,
    {
      title: 'About',
      name: 'من نحن',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Update',
      name: 'تحديث البيانات',
      url: '/update',
      icon: 'download'
    },
    {
      title: 'Item',
      name: '',
      url: '/item',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#488aff');
      setTimeout(_ => { this.splashScreen.hide(); }, 2500);
    });
  }
}
