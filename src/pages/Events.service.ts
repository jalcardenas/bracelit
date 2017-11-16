import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { WristbandModel } from "./Wristband.model";
import {Http, Headers, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import {EventsModel} from "./Events.model";
import {WorkersModel} from "./Workers.model";
import {ProductModel} from "./Product.model";
import {OffersModel} from "./Offers.module";


@Injectable()
export class EventsService {
  events: EventsModel[]=[];
  stored:boolean;
  //Evento seleccionada se identifica con el id
  eventselected: string;

  constructor(private http: Http,

  ) {}



  selectEvent(id:string){
    for (var item in this.events) {
      if(this.events[item].id==id  ){
        this.eventselected=id;
        console.log("Seleccionado evento: " + this.eventselected);
        //Meter un servicio dentro de otro y fijar aqui las pulseras.
      }
    }
  }
  isEventStored(id:string){
    this.stored=false;
    for (var item in this.events) {
      if(this.events[item].id==id  ){
        this.stored=true;
      }
    }
    return this.stored;
  }
  getEvents() {
    return this.events;
  }
  getSelectedEvent(){
    return this.eventselected;
  }
  postEvent(name: string, id:string){
    if(this.events!=null) {
      this.events.push(new EventsModel(name,id,[],[],[],[]));
      console.log(this.events[this.events.length - 1]);
      this.selectEvent(id);
      this.storeEvents(this.events)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }else{
      this.events=[];
      this.events[0]=new EventsModel(name, id, [],[],[],[]);
      console.log(this.events[this.events.length - 1]);
      this.selectEvent(id);
      this.storeEvents(this.events)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
  }

  storeEvents(events: EventsModel[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});
    return this.http.put('https://bracelit-f0d14.firebaseio.com/data.json',
      events,
      {headers: headers});

  }

  loadEvents() {
    return this.http.get('https://bracelit-f0d14.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }

  addWristbandEvent(id:string, wristbands: WristbandModel[] ){
    for (var item in this.events) {
      if(this.events[item].id==id  ){
        this.events[item].wristbands=wristbands;
        //Creo que esto sobra COMPROBAR
        this.selectEvent(id);
        //
        console.log(this.events[item]);
      }
    }
    this.storeEvents(this.events)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  addWorkerEvent(id:string, worker: WorkersModel ){
    for (var item in this.events) {
      if(this.events[item].id==id  ){
        this.events[item].workers.push(worker);
        this.selectEvent(id);
        console.log(this.events[item]);
      }
    }
    this.storeEvents(this.events)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  setEvents(events: EventsModel[]){
    this.events=events;
    console.log(this.events);
  }
  getWristbands(){
    for (var item in this.events) {
      if(this.events[item].id==this.getSelectedEvent()){
        return this.events[item].wristbands;
      }
    }

  }

  getProducts(){
    for (var item in this.events) {
      if(this.events[item].id==this.getSelectedEvent()){
        return this.events[item].menu;
      }
    }
  }

  addProductEvent(id: string, menuproduct: ProductModel){
      for (var item in this.events) {
        if(this.events[item].id==id  ){
          if(this.events[item].menu!=null) {
            this.events[item].menu.push(menuproduct);
          }else{
            this.events[item].menu=[];
            this.events[item].menu[0]=menuproduct;
          }
        }
      }
      this.storeEvents(this.events)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );

  }

  getOffers(){
    for (var item in this.events) {
      if(this.events[item].id==this.getSelectedEvent()){
        return this.events[item].offers;
      }
    }
  }

  addOfferEvent(id: string, offer:OffersModel){
    for (var item in this.events) {
      if(this.events[item].id==id  ){
        if(this.events[item].offers!=null) {
          this.events[item].offers.push(offer);
        }else{
          this.events[item].offers=[];
          this.events[item].offers[0]=offer;
        }
      }
    }
    this.storeEvents(this.events)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

  }
}
