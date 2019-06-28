import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import { LoadingController } from '@ionic/angular';

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

    private jsonFiles = [
      'beauty', 'camera', 'car', 'cleaner', 'clothes', 'doctors',
      'donut', 'eng', 'experments', 'gadgets', 'gifts', 'gym',
      'hosbital', 'low', 'mobile', 'paints', 'penaut', 'pharmasy',
      'ps', 'pulp', 'resturants', 'school', 'shops', 'teachers',
      'vegtable', 'workers'
    ];

    public loader: any;
    public busy = false;

  constructor(
    private router: Router,
    private storage: Storage,
    public loaderCtrl: LoadingController,
    private admobFreeService: AdmobFreeService) {
      this.storage.get('all_data_stored').then(val => {
        if (!val) {
          this.showLoader();
          const URL = '../../assets/data/';
          const Ext = '.json';
          console.log('no val');
          this.jsonFiles.forEach(jsF => {
            fetch(URL + jsF + Ext).then(res => res.json())
            .then(res => {
              storage.set(jsF, JSON.stringify(res))
                .then(saved => console.log(jsF + ' saved'));
            }).catch(err => console.log(err));
            if (jsF === 'vegtable' || jsF === 'workers') {
              this.storage.set('all_data_stored', true)
                .then(_ => {
                  console.log('saved');
                  this.hideLoader();
                });
            }
          });
        }
        console.log('val: ', val);
      });
    }

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

    async showLoader() {
      this.busy = true;
      if (!this.loader) {
        this.loader = await this.loaderCtrl.create({
          backdropDismiss: false,
          message: 'يرجى الإنتظار',
          duration: 5000
        });
      }
      await this.loader.present();
    }

    async hideLoader() {
      this.busy = false;
      if (this.loader) {
        await this.loader.dismiss();
      }
    }

    // ionViewWillEnter() {
    //   this.admobFreeService.BannerAd();
    // }

    ionViewDidEnter() {
      this.admobFreeService.BannerAd();
      if (!sessionStorage.getItem('user')) {
        this.admobFreeService.InterstitialAd();
        sessionStorage.setItem('user', 'ok');
      }
    }

}
