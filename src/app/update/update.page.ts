import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { ToastController } from '@ionic/angular';

const URL = 'http://localhost/daleel/api/update.php';
const Token = '$2y$10$oLEwL4QeFfHEdTOeGtVBCucqnfP1buY';
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  public src = '';
  public progress = 0;
  public showLoader = false;
  public hasUpdate = false;
  public searching: boolean;
  public downloading: boolean;
  public downText = 'تنزيل';
  public errMes = 'حدث خطأ برجاء إعادة المحاولة';

  private jsonFiles = [
    'resturants', 'shops', 'donut', 'pharmasy', 'cleaner', 'beauty',
     'school', 'experments', 'doctors', 'eng', 'teachers', 'gadgets',
     'paints', 'gym', 'camera', 'hosbital', 'mobile', 'ps', 'clothes',
     'gifts', 'vegtable', 'penaut', 'car', 'low', 'pulp', 'workers'
    ];

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private file: File,
    private ft: FileTransfer,
    public toast: ToastController) { }

  lookforUpdate() {
    this.showLoader = true;
    this.searching = true;
    let Body = 'req=check&token=' + Token
      + '&upToken=';

    // retrive update token from storage
    this.storage.get('update_token').then(upToken => {
      console.log(upToken);
      Body += upToken;
      this.checkForUpdate(Body);
    });

  }

  checkForUpdate(body: string) {
    this.http.post<{go: boolean}>(URL, body, {headers})
    .subscribe(res => {
      console.log(res);
      this.showLoader = false;
      if (res.go) {
        this.hasUpdate = true;
      } else if (res.go === false) {
        this.presentToast(' لا توجد تحديثات جديدة فى الوقت الحالى');
      } else {
        this.presentToast(this.errMes);
        this.searching = false;
      }
    }, err => {
      this.showLoader = false;
      this.searching = false;
      this.presentToast(this.errMes);
      console.log(err.error.error.message);
      console.log(err.error.text);
    });
  }

  update() {
    // this.downloading = true;
    this.showLoader = true;

    let Body = 'req=update&token=' + Token + '&upToken=';

    this.storage.get('update_token').then(upToken => {
      Body += upToken;
      this.doUpdate(Body);
    });
  }

  doUpdate(body: string) {
    this.http.post<[{name, address, category, updateToken, img, tell}]>(URL, body, {headers})
    .subscribe(res => {
      console.log(res);
      if (res.length) {
        const arr = [];
        // update storage update_token for another update
        // to prevent dublicate updates
        this.storage.set('update_tokenee', res[0].updateToken).then(s => {
          this.updateStorage(res);
        });
      }
    }, err => {
      this.showLoader = false;
      this.downloading = false;
      this.presentToast(this.errMes);
      console.log(err.error.error.message);
      console.log(err.error.text);
    });
  }

  async updateStorage(res) {
    for (const p of res) {
      const key = this.jsonFiles[p.category];
      const obj = {
          title: p.name,
          address: p.address,
          img: p.img,
          tells: [p.tell]
      };

      let keyVal = await this.storage.get(key);
      keyVal = JSON.parse(keyVal);
      keyVal.push(obj);

      const qq = await this.storage.set(key, JSON.stringify(keyVal));

    }
  }

  async downloadImage() {
    const downloadUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPGY0t9glwZVlmCIMx63swXOr8vYL9bhugNUPC0Qm6XnCW1rry';
    const path = this.file.externalApplicationStorageDirectory;
    const dir = 'img';

    // check if img folde exists
    this.file.checkDir(path, dir)
    .then(fe => {
      alert('folder exists');
    }).catch(err => {
      alert('dir not exitst');
      this.file.createDir(path, dir, true)
      .then(_ => {
        alert('files created ');
      });
    });

    // alert(fileExists);

    const transfer: FileTransferObject = this.ft.create();
    // alert(transfer);

    transfer.download(downloadUrl, path + '/myimage' + Math.random() + '.png')
    .then(entry => {
      let url = entry.toURL();
      this.src = url;
      alert(url);
      alert('fileTransfer.download data ** ** ** **:' + JSON.stringify(entry));
    }, (err) => {
      alert('downloadfile() error: ' + JSON.stringify(err));
    });
  }

  async presentToast(mes) {
    const toast = await this.toast.create({
      message: mes,
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'إغلاق'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
