import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { WristbandModel } from "./Wristband.model";
import {ProductModel} from "./Product.model";
import {Http, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import {EventsService} from "./Events.service";


@Injectable()
export class WristbandService {
  wristbands: WristbandModel[]=[];
  stored:boolean;
  //Pulsera seleccionada se identifica con el id
  wristbandselected: string;

  constructor(private http: Http, private eventsservice: EventsService) {}



  selectWristband(id:string){
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        this.wristbandselected=id;
      }
    }
  }
  isWristbandStored(id:string){
    this.stored=false;
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
          this.stored=true;
      }
    }
    return this.stored;
  }
  getWristbands() {
    return this.wristbands;
  }
  getSelectedWristband(){
    return this.wristbandselected;
  }
  postWristband(username: string, id:string, money:number, age:number,
                bonds:number, products: ProductModel[], amounts: number[]){
    console.log(this.wristbands);
    if(this.wristbands==null) {
      this.wristbands=[];
      this.wristbands[0]=new WristbandModel(username, id, money, age, bonds, products, amounts);
      this.selectWristband(id);
      this.storeWristband(this.wristbands);
    }else{
      this.wristbands.push(new WristbandModel(username, id, money, age, bonds, products, amounts));
      this.selectWristband(id);
      this.storeWristband(this.wristbands);
    }
  }

  storeWristband(wristbands: WristbandModel[]) {
    this.eventsservice.addWristbandEvent(this.eventsservice.getSelectedEvent(),wristbands);
  }

  loadWristbands() {
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

  patchWristband(id:string, money:number, bonds: number, products:ProductModel[], amounts:number[]){
   for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        this.wristbands[item].money=money;
        this.wristbands[item].bonds=bonds;
        this.wristbands[item].products=products;
        this.wristbands[item].amounts=amounts;
        this.selectWristband(id);
        console.log(this.wristbands[item]);
      }
    }
    this.storeWristband(this.wristbands)
  }
  getMoneyWristband(id:string){
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        return this.wristbands[item].money;
      }
    }
  }
  getBondsWristband(id:string){
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        return this.wristbands[item].bonds;
      }
    }
  }
  getProductsWristband(id:string){
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        return this.wristbands[item].products;
      }
    }
  }
  getAmountsWristband(id:string){
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        return this.wristbands[item].amounts;
      }
    }
  }
  setWristbands(wristbands: WristbandModel[]){
    this.wristbands=wristbands;
    console.log(this.wristbands);
  }
}
