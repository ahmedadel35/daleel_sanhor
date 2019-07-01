import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FileUploader, FileSelectDirective, FileLikeObject  } from 'ng2-file-upload';

import { ToastController, LoadingController } from '@ionic/angular';

import { AdmobFreeService } from '../admob-free.service';

const DOMAIN = 'http://daleel-sanhor.epizy.com/';
const URL = DOMAIN + 'api/create.php';

const SIZE_LIMIT = 1024000; // 1mb
const ALLOWED_TYPES = ['jpg', 'jpeg', 'png'];

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {

    public allSections = [
        'المطاعم',
        'سوبر ماركت',
        'الحلوانى',
        'الصيدليات',
        'الأدوات المنزلية',
        'بيوتى سنتر',
        'مراكز تعليم',
        'معامل التحاليل',
        'الأطباء',
        'المهندسين',
        'المدرسين',
        'المكتبات',
        'البويات',
        'النادى الرياضى',
        'التصوير',
        'المستشفيات',
        'موبيلات وكمبيوتر',
        'بلاى ستيشن',
        'الملابس',
        'الهدايا والعطور',
        'العطارة ومستلزمات المطبخ',
        'مقله وتسالى',
        'مراكز السيارات',
        'المهن الإخرى',
        'المحامين',
        'الادوات الصحية'
    ];

    public uploader: FileUploader = new FileUploader({
      url: URL,
      headers: [{name : 'Content-Type', value : 'application/x-www-form-urlencoded'}],
      method: 'post',
      allowedFileType: ['image'],
    });

    private token = '$2y$10$oLEwL4QeFfHEdTOeGtVBCucqnfP1buY';

    public loader: any;
    public busy = false;

  constructor(
    public http: HttpClient,
    public toast: ToastController,
    public loaderCtrl: LoadingController,
    private admobFreeService: AdmobFreeService ) {}

  uploadImage(): Promise<string> {
    const file = this.uploader.queue[0].file;
    const formData = new FormData();
    formData.append('token', this.token);
    formData.append('req', 'upload');
    formData.append('img', file.rawFile, file.name);

    return new Promise((resolve, reject) => {
      this.http.post<{name: string}>(URL, formData)
        .subscribe(res => {
          if (res && res.name && res.name.length) {
            resolve(res.name); // uploaded image name
          }
          reject(res); // return error
        }, err => {
          reject(err);
      });
    });
  }

  sendData(form) {
    const f = form.value;
    const reqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    // validate form before upload image
    if (!f.section.length
      || !f.title.length
      || !f.adress.length) {
        return false;
    }

    // show loader
    this.showLoader();

    this.uploadImage().then(imgName => {
      const body = 'req=create&token=' + this.token + '&cat='
        + f.section + '&name=' + f.title + '&address=' + f.adress
        + '&tell=' + f.tel + '&img=' + imgName;

      this.http.post(URL, body, reqOpts)
        .subscribe(res => {
            console.log(res);
            this.hideLoader();
            if (res === true) {
              this.presentToast('تم الحفظ بنجاح');
            }
        }, err => {
          this.hideLoader();
          this.presentToast('حدث خطأ غير متوقع برجاء إعادة المحاولة');
      });
    })
    .catch(err => {
      this.hideLoader();
      this.presentToast('حدث خطأ غير متوقع برجاء إعادة المحاولة');
    });
  }

  async presentToast(mes) {
    const toast = await this.toast.create({
      message: mes,
      duration: 1500,
      showCloseButton: true,
      closeButtonText: 'إغلاق'
    });
    toast.present();
  }

  async showLoader() {
    this.busy = true;
    if (!this.loader) {
      this.loader = await this.loaderCtrl.create({
        backdropDismiss: true,
        duration: 9000
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

  ionViewWillEnter() {
    this.admobFreeService.BannerAd();
  }

  ngOnInit() {
    // select only one image
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;

      // limit queue to one image and update if another choosed
      if (this.uploader.queue.length > 1) {
        this.uploader.queue.shift();
        this.uploader.queue.length = 1;
      }

      // filter image
      const img = file.file;
      if (img.size > SIZE_LIMIT) {
        this.presentToast('يجب أن لا يتعدى حجم الصورة 1 ميجا');
        this.uploader.queue.length = 0;
      } else if (ALLOWED_TYPES.indexOf(img.type.split('/')[1]) < 1) {
        this.presentToast('الملف غير مدعوم');
        this.uploader.queue.length = 0;
      }

    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
    };

  }

}
