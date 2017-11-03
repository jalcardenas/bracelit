import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyOffersPage } from './buy-offers';

@NgModule({
  declarations: [
    BuyOffersPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyOffersPage),
  ],
})
export class BuyOffersPageModule {}
