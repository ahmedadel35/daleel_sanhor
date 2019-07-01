import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { AdmobFreeService } from '../admob-free.service';

import { ToastController } from '@ionic/angular';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  page_title: string;

  page_name: string;
  data: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storage: Storage,
              private admobFreeService: AdmobFreeService,
              public toast: ToastController,
              private callNumber: CallNumber) {
    // get params from route
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        // get page name and title from state
        this.page_title = this.router.getCurrentNavigation().extras.state.page.title;
        this.page_name = this.router.getCurrentNavigation().extras.state.page.name;

        // load data from storage file
        // with the same item name
        this.storage.get(this.page_name)
          .then(json => {
            json = JSON.parse(json);
            if (json.length) {
              this.data = json;
            } else {
              // show toast to inform user it is empty section
              this.presentToast();
              // go to home page
              this.router.navigate(['home']);
            }
          })
          .catch(error => { // error mostly will be json fileNotExists
            // show toast to inform user it is empty section
            this.presentToast();
            // go to home page
            this.router.navigate(['home']);
          });
      }  else {
        // if no page name provided return to home page
        this.router.navigate(['home']);
      }
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'لا يتوفر بيانات بهذا القسم سيتم إضافة المزيد فى التحديثات القادمة',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'إغلاق'
    });
    toast.present();
  }

  defaultImage(): string {
    const jpg = [
      'beauty', 'doctors', 'eng', 'paints', 'teachers', 'jobs'
    ];
    const jpeg = [
      'camera', 'car', 'low', 'penaut', 'pulp', 'vegtable'
    ];

    let img_name = this.page_name;

    if (jpg.indexOf(img_name) > -1) {
      img_name += '.jpg';
    } else if(jpeg.indexOf(img_name) > -1) {
      img_name += '.jpeg';
    } else {
      img_name += '.png';
    }
    return img_name;
  }

  call(num) {
    // num = num.toString();
    this.callNumber.callNumber(num, true)
    .then(res => console.log('lanshed dialer', res))
    .catch(err => console.log('error', err));
  }

  ionViewWillEnter() {
    this.admobFreeService.BannerAd();
  }

  ngOnInit() {
    // runs twice so no need to do anything here
  }

}
