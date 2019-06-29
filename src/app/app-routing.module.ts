import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // },
  { path: 'item', loadChildren: './item/item.module#ItemPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'add-new', loadChildren: './add-new/add-new.module#AddNewPageModule' },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
