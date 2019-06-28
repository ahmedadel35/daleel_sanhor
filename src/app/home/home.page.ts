import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';

import { Storage } from '@ionic/storage';
import { AdmobFreeService } from '../admob-free.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    public page = {
      title: '',
      name: ''
    };

  constructor(
    private router: Router,
    private storage: Storage,
    private admobFreeService: AdmobFreeService) {}

    openDetalis(title, name) {
        this.page = {
          title,
          name
        };
        const navExtras: NavigationExtras = {
            state: {
                page: this.page
            }
        };
        this.router.navigate(['item'], navExtras);
    }

    goToAdd() {
      this.router.navigate(['add-new']);
    }

    ionViewWillEnter() {
      this.admobFreeService.BannerAd();
    }

    ionViewDidEnter() {
      if (!sessionStorage.getItem('user')) {
        this.admobFreeService.InterstitialAd();
        sessionStorage.setItem('user', 'ok');
      }
    }

}
