import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WristbandService } from '../Wristband.service';
import { FormControl, FormGroup } from "@angular/forms";
import { MenuPage } from "../menu/menu";
import { Response} from "@angular/http";

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  genders= ['Male','Female'];
  signupForm : FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
            private wristbandService: WristbandService
              ) {
  }
  ngOnInit(){
    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'edad': new FormControl(null),
      'gender': new FormControl('Male')
    })
    this.onGet();
  }
  onSubmit(){
   this.wristbandService.postWristband(this.signupForm.value.username,
      (Math.random() * (9999999999999999)).toString(),
      0,this.signupForm.value.edad,0,[],[]);
   this.wristbandService.storeWristband(this.wristbandService.wristbands)
     .subscribe(
       (response) => console.log(response),
       (error) => console.log(error)
     );
    this.navCtrl.push(MenuPage,{
    });
    this.signupForm.reset();
  }
  onGet(){
    this.wristbandService.loadWristbands().
    subscribe(
      (wristbands: any[]) => this.wristbandService.setWristbands(wristbands),
      (error) => console.log(error)
    );
  }
}
