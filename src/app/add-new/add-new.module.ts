import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddNewPage } from './add-new.page';

import {FileUploadModule} from "ng2-file-upload";

import { ThumbnailDirective  } from '../directives/thumbnail-directive.directive';

const routes: Routes = [
  {
    path: '',
    component: AddNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [AddNewPage, ThumbnailDirective]
})
export class AddNewPageModule {}
