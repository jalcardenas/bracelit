import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingCartService } from "../ShoppingCart.service";
import { ShoppingCartProduct} from "../ShoppingCartProduct.model";
import {ProductsService} from "../Products.service";
import {ProductModel} from "../Product.model";
import {WristbandService} from "../Wristband.service";
import { MenuPage} from "../menu/menu";
import {OffersService} from "../Offers.service";
import {WristbandModel} from "../Wristband.model";

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
             private shoppingcartservice: ShoppingCartService,
              private wristbandservice: WristbandService,
              private productsservice: ProductsService,
              private offersservice: OffersService){  }

  shoppingcart: ShoppingCartProduct[]= this.shoppingcartservice.getShoppingCart();
  productswristband: ProductModel[]=this.wristbandservice.getProductsWristband(
    this.wristbandservice.getSelectedWristband());
  amountswristband: number[]=this.wristbandservice.getAmountsWristband(
    this.wristbandservice.getSelectedWristband())
  nBonds=this.wristbandservice.getBondsWristband(
    this.wristbandservice.getSelectedWristband()
  );
  price: number;

  calculatePrice(){
    this.price=0;
    //OFERTAS
    for (let item1 in this.shoppingcart) {
      for(let item2 in this.productswristband) {
        if(this.shoppingcart[item1].name==this.productswristband[item2].name){
          if(this.shoppingcart[item1].amount>=this.amountswristband[item2]){
            this.shoppingcart[item1].amount=this.shoppingcart[item1].amount-this.amountswristband[item2];
            this.amountswristband[item2]=0;
          }else{
            this.amountswristband[item2]=this.amountswristband[item2]-this.shoppingcart[item1].amount;
            this.shoppingcart[item1].amount=0;
          }
        }
      }
    }
    //Bonos (por orden)
    for(let item1 in this.shoppingcart) {
      if (this.shoppingcart[item1].bonds <= this.nBonds) {
        this.nBonds = this.nBonds - this.shoppingcart[item1].bonds;
        this.shoppingcart[item1].price = 0;
      }
    }
    //Precio final
    for(let item1 in this.shoppingcart) {
      this.price = this.price + this.shoppingcart[item1].price * this.shoppingcart[item1].amount;

    }




  }


  payShoppingCart(){
    //En realidad no sé si se puede llegar aquí sin funcionar con selectedWristband
   if (this.wristbandservice.getMoneyWristband(
        this.wristbandservice.getSelectedWristband())>=this.price){
      this.wristbandservice.patchWristband(this.wristbandservice.getSelectedWristband(),
        this.wristbandservice.getMoneyWristband(
          this.wristbandservice.getSelectedWristband())-this.price,
        this.wristbandservice.getBondsWristband(this.wristbandservice.getSelectedWristband()),
        this.wristbandservice.getProductsWristband(this.wristbandservice.getSelectedWristband()),
        this.wristbandservice.getAmountsWristband(this.wristbandservice.getSelectedWristband()));
      console.log("Compra realizada correctamente");
      this.shoppingcartservice.deleteShoppingCart();
      this.price=0;
      this.navCtrl.push(MenuPage,{
      });
    }else{
      console.log("No money baby");
    }
  }
}
