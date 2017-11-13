import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WristbandService } from '../Wristband.service';
import { FormControl, FormGroup } from "@angular/forms";
import { MenuPage } from "../menu/menu";
import { Response} from "@angular/http";
import {CoverPage} from "../cover/cover";
import {EventsService} from "../Events.service";

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage implements OnInit {

  signupForm : FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eventsservice: EventsService
  ) {
  }
  ngOnInit(){
    this.signupForm = new FormGroup({
      'name': new FormControl(null),
      'id': new FormControl(null),
    })

  }
  onSubmit(){
    this.eventsservice.postEvent(this.signupForm.value.name,this.signupForm.value.id);
    this.navCtrl.push(CoverPage,{
    });
    this.signupForm.reset();
  }

}