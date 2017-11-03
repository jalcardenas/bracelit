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
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private wristbandservice: WristbandService
              ) {

  }
  onClick(){
    this.navCtrl.push(RegisterPage,{

   });
  }
  onSubmit(name:string){
    //this.wristbandservice.selectWristband(name);
    this.navCtrl.push(MenuPage,{

   });
  }
}
