import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {

    public all_sections = [
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
        'المهن الإخرى'
    ];

  constructor( public http: HttpClient ) {
    this.http.get('http://localhost:80/daleel/api/create.php')
      .subscribe(res => {
        console.log(res);
      });
  }

  sendData(form) {
    const token = '$2y$10$oLEwL4QeFfHEdTOeGtVBCucqnfP1buY';
    const domain = 'http://localhost:80/daleel/';
    const url = domain + 'api/create.php';

    const f = form.value;

    const reqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const img = document.querySelector('#img input');

    console.log(f);

    const body = 'token=' + token + '&cat=' + f.section + '&name='
      + f.title
      + '&address=' + f.adress + '&tell=' + f.tel
      + '&img=' + img;

    // this.http.post(url, body, reqOpts)
    //     .subscribe(res => {
    //         console.log(res);
    //     }, err => {
    //         console.error('error');
    //         console.log(err.error.text);
    //         console.log(err);
    //     });

    // const formData = new FormData();
    // formData.append('img', img);
    // formData.append('name', f.title);
    // formData.append('address', f.address);
    // formData.append('tell', f.tel);
    // formData.append('cat', f.section);
    // formData.append('token', token);
    
    // fetch(url, {
    //   method: 'POST',
    //   body: formData
    // }).then(res => res.text())
    // .then(res => console.log(res));

  }

  ngOnInit() {
  }

}
