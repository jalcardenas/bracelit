import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { FormGroup, FormControl } from "@angular/forms";
import { WristbandService } from "../Wristband.service";
import { MenuPage } from "../menu/menu";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  signupForm : FormGroup;

  ngOnInit(){
    this.signupForm = new FormGroup({
      'id': new FormControl(null),
    })
    this.onGet();
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wristbandservice: WristbandService
              ) {

  }
  onClick(){
    this.navCtrl.push(RegisterPage,{

   });
  }
  onSubmit(){
    this.wristbandservice.selectWristband(this.signupForm.value.id);
    this.navCtrl.push(MenuPage,{
   });
  }
  onGet(){
    this.wristbandservice.loadWristbands().
    subscribe(
      (wristbands: any[]) => this.wristbandservice.setWristbands(wristbands),
      (error) => console.log(error)
    );
  }
}
