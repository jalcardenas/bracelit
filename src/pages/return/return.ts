import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { WristbandService } from "../Wristband.service";
import { MenuPage } from "../menu/menu";

/**
 * Generated class for the DevolverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return',
  templateUrl: 'return.html',
})
export class ReturnPage implements OnInit {
  signupForm : FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wristbandservice: WristbandService
              ) {
  }
  ngOnInit(){
    this.signupForm = new FormGroup({
           'username': new FormControl(null),
    })
  }
  onSubmit(){
    this.wristbandservice.patchWristband(this.wristbandservice.getSelectedWristband(),
      0,
      this.wristbandservice.getBondsWristband(this.wristbandservice.getSelectedWristband()),
      this.wristbandservice.getProductsWristband(this.wristbandservice.getSelectedWristband()),
      this.wristbandservice.getAmountsWristband(this.wristbandservice.getSelectedWristband()));
    this.navCtrl.push(MenuPage,{
    });
    this.signupForm.reset();
  }

}
