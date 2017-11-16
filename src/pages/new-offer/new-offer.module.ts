import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOfferPage } from './new-offer';

@NgModule({
  declarations: [
    NewOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOfferPage),
  ],
})
export class NewOfferPageModule {}
