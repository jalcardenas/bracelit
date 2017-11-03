import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { WristbandModel } from "./Wristband.model";
import {ProductModel} from "./Product.model";

//import {Http, Headers, Response} from "@angular/http";
import { MenuPage } from "./menu/menu";




@Injectable()
export class WristbandService {
  wristbands: WristbandModel[]=[];
  constructor(public navCtrl: NavController,public navParams: NavParams) {}


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
   // this.storeWristband(this.getWristbands());

  }

  /*storeWristband(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});
    return this.http.put('https://bracelit-f0d14.firebaseio.com/data.json',
      servers,
      {headers: headers});
  }*/
    //https://bracelit-f0d14.firebaseio.com/


  patchWristband(id:string, money:number, bonds: number, products:ProductModel[], amounts:number[]){
   for (var item in this.wristbands) {
      if(this.wristbands[item].id==id  ){
        this.wristbands[item].money=money;
        this.wristbands[item].bonds=bonds;
        this.wristbands[item].products=products;
        this.wristbands[item].amounts=amounts;
        this.selectWristband(id);
        this.navCtrl.push(MenuPage,{

        });
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
}
