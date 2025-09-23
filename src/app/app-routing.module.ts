import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'beban-kerja-kemudi',
    loadChildren: () => import('./beban-kerja-kemudi/beban-kerja-kemudi.module').then( m => m.BebanKerjaKemudiPageModule)
  },
  {
    path: 'beban-kerja-kejadian',
    loadChildren: () => import('./beban-kerja-kejadian/beban-kerja-kejadian.module').then( m => m.BebanKerjaKejadianPageModule)
  },
  {
    path: 'tes-kantuk',
    loadChildren: () => import('./tes-kantuk/tes-kantuk.module').then( m => m.TesKantukPageModule)
  },
  {
    path: 'waktu-reaksi-rem',
    loadChildren: () => import('./waktu-reaksi-rem/waktu-reaksi-rem.module').then( m => m.WaktuReaksiRemPageModule)
  },
  {
    path: 'waktu-reaksi-kemudi',
    loadChildren: () => import('./waktu-reaksi-kemudi/waktu-reaksi-kemudi.module').then( m => m.WaktuReaksiKemudiPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
