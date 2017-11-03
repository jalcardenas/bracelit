import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from "@angular/forms";
import { WristbandService } from "../Wristband.service";
import { MenuPage } from "../menu/menu";

/**
 * Generated class for the RechargeBondsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge-bonds',
  templateUrl: 'recharge-bonds.html',
})
export class RechargeBondsPage {

  signupForm : FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
  private wristbandservice: WristbandService
              ) {
  }
  ngOnInit(){
    this.signupForm = new FormGroup({
      //'id': new FormControl(null),
      'amount': new FormControl(null),

    })
  }
  onSubmit(){
    this.wristbandservice.patchWristband(this.wristbandservice.getSelectedWristband(),
      this.wristbandservice.getMoneyWristband(this.wristbandservice.getSelectedWristband()),
      this.wristbandservice.getBondsWristband(this.wristbandservice.getSelectedWristband())+
      this.signupForm.value.amount,
      this.wristbandservice.getProductsWristband(this.wristbandservice.getSelectedWristband()),
      this.wristbandservice.getAmountsWristband(this.wristbandservice.getSelectedWristband()));
    this.navCtrl.push(MenuPage,{
    });
    this.signupForm.reset();
  }

}
