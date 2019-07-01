import { Injectable } from '@angular/core';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';


@Injectable()
export class AdmobFreeService {

  private bannerId = 'ca-app-pub-8847964607951258/6098340696';
  private intersId = 'ca-app-pub-8847964607951258/3937235303';

  constructor(
    private admobFree: AdMobFree,
    public platform: Platform
  ) {}

  BannerAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // isTesting: true, //  Remove in production
      autoShow: true,
      id: this.bannerId
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
      // console.log('banner working');
    }).catch(e => console.log('banner error: ', e));
  }

  InterstitialAd() {
    const interConfig: AdMobFreeInterstitialConfig = {
      id: this.intersId,
      // isTesting: true,
      autoShow: true
    };
    // Check if Ad is loaded
    this.admobFree.interstitial.config(interConfig);
      // Prepare Ad to Show
    this.admobFree.interstitial.prepare().then(() => {
      // console.log('prepared');
      this.admobFree.interstitial.isReady().then()
        .catch(e => console.log('isReady ' + e));
    }).catch(e => console.log(e));
  }

}
