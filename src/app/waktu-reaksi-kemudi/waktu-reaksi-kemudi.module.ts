import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WaktuReaksiKemudiPageRoutingModule } from './waktu-reaksi-kemudi-routing.module';
import { WaktuReaksiKemudiPage } from './waktu-reaksi-kemudi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaktuReaksiKemudiPageRoutingModule
  ],
  declarations: [WaktuReaksiKemudiPage]
})
export class WaktuReaksiKemudiPageModule {}
