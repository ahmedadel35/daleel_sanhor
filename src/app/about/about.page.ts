import { Component, OnInit } from '@angular/core';

import { AdmobFreeService } from '../admob-free.service';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private callNumber: CallNumber,
    private admobFreeService: AdmobFreeService) { }

  call(num) {
    this.callNumber.callNumber(num, true)
    .then(res => console.log('lanshed dialer', res))
    .catch(err => console.log('error', err));
  }

  ionViewWillEnter() {
    this.admobFreeService.BannerAd();
  }

  ngOnInit() {
  }

}
