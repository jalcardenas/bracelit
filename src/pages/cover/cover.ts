import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { FormGroup, FormControl } from "@angular/forms";
import { WristbandService } from "../Wristband.service";
import { MenuPage } from "../menu/menu";

@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html'
})
export class CoverPage implements OnInit{
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
    if(this.wristbandservice.isWristbandStored(this.signupForm.value.id)) {
      this.wristbandservice.selectWristband(this.signupForm.value.id);
      this.navCtrl.push(MenuPage, {});
    }else{
      alert('Pulsera no registrada!')
    }
  }
  onGet(){
    this.wristbandservice.loadWristbands().
    subscribe(
      (wristbands: any[]) => this.wristbandservice.setWristbands(wristbands),
      (error) => console.log(error)
    );
  }
}
