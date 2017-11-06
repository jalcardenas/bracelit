import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { WristbandModel } from "./Wristband.model";
import {ProductModel} from "./Product.model";
import {Http, Headers, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class WristbandService {
  wristbands: WristbandModel[]=[];
  constructor(private http: Http) {}


  //Pulsera seleccionada se identifica con el id
  wristbandselected: string;
  selectWristband(id:string){
    for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        this.wristbandselected=id;
        console.log("Seleccionada: " + this.wristbandselected);
      }
    }
  }

  getWristbands() {
    return this.wristbands;
  }
  getSelectedWristband(){
    return this.wristbandselected;
  }
  postWristband(username: string, id:string, money:number, age:number,
                bonds:number, products: ProductModel[], amounts: number[]){
    this.wristbands.push(new WristbandModel(username,id,money,age,bonds,products,amounts));
    console.log(this.wristbands[this.wristbands.length-1]);
    this.selectWristband(id);
  }

  storeWristband(wristbands: WristbandModel[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});
    return this.http.put('https://bracelit-f0d14.firebaseio.com/data.json',
      wristbands,
      {headers: headers});
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
