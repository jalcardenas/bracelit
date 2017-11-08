import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { FormGroup, FormControl } from "@angular/forms";
import { WristbandService } from "../Wristband.service";
import { CoverPage } from "../cover/cover";
import {NewEventPage} from "../new-event/new-event";

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
              ) {

  }
  onClick(){
    this.navCtrl.push(NewEventPage,{

   });
  }
  onSubmit(){
    this.navCtrl.push(CoverPage,{

    });
  }

}
