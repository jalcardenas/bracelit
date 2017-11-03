import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingCartService} from "../ShoppingCart.service";
import { ProductModel } from "../Product.model";
import { ShoppingCartPage} from "../shopping-cart/shopping-cart";
import {OffersModel} from "../Offers.module";
import { OffersService } from "../Offers.service";
import {WristbandService} from "../Wristband.service";

/**
 * Generated class for the BuyOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-offers',
  templateUrl: 'buy-offers.html',
})
export class BuyOffersPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private offersService: OffersService,
              private shoppingcart:ShoppingCartService,
              private wristbandservice: WristbandService) {
  }
  offers: OffersModel[] = this.offersService.getOffers();
  products: ProductModel[];
  amounts: number[];
  new: boolean=false;
  onClick(){
    this.navCtrl.push(ShoppingCartPage,{

    });
  }

  addProducts(products: ProductModel[], amounts:number[]){
    this.products=this.wristbandservice.getProductsWristband(
      this.wristbandservice.getSelectedWristband());
    this.amounts=this.wristbandservice.getAmountsWristband(
      this.wristbandservice.getSelectedWristband());
    console.log(this.amounts);
    for (let item1 in products) {
      this.new=true;
      for (let item2 in this.products) {
        if(this.products[item2].name==products[item1].name){
          this.new=false;
        }
      }
      if(this.new==true){
        this.products.push(products[item1]);
        this.amounts.push(0);
      }
    }
    for (let item1 in this.products) {
      for (let item2 in products) {
        if(this.products[item1].name==products[item2].name){
          this.amounts[item1]=this.amounts[item1]+amounts[item2];
        }
      }
    }
  }
  addOffer(products: ProductModel[],amounts:number[]){
    this.addProducts(products,amounts);
    this.wristbandservice.patchWristband(this.wristbandservice.getSelectedWristband(),
      this.wristbandservice.getMoneyWristband(this.wristbandservice.getSelectedWristband()),
      this.wristbandservice.getBondsWristband(this.wristbandservice.getSelectedWristband()),
      this.products,this.amounts);
  }
}

