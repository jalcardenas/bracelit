import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { FormGroup, FormControl } from "@angular/forms";
import { WristbandService } from "../Wristband.service";
import { CoverPage } from "../cover/cover";
import {NewEventPage} from "../new-event/new-event";
import {EventsService} from "../Events.service";

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
             private eventsservice: EventsService,
              private wristbandservice: WristbandService
              ) {

  }
  onClick(){
    this.navCtrl.push(NewEventPage,{

   });
  }
  onSubmit(){
    if(this.eventsservice.isEventStored(this.signupForm.value.id)){
    this.eventsservice.selectEvent(this.signupForm.value.id);
    this.wristbandservice.setWristbands(this.eventsservice.getWristbands());
    console.log(this.eventsservice.getWristbands());
        this.navCtrl.push(CoverPage,{
    });
    }else{
       alert('Evento no registrado!');
  }
}

  onGet(){
   this.eventsservice.loadEvents().
    subscribe(
      (events: any[]) => this.eventsservice.setEvents(events),
      (error) => console.log(error)
    );
  }

}
