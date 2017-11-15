import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingCartService } from "../ShoppingCart.service";
import { ShoppingCartProduct} from "../ShoppingCartProduct.model";
import {ProductModel} from "../Product.model";
import {WristbandService} from "../Wristband.service";
import { OnInit} from "@angular/core";
import {CoverPage} from "../cover/cover";

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
export class ShoppingCartPage implements OnInit{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
             private shoppingcartservice: ShoppingCartService,
              private wristbandservice: WristbandService){

  }

  shoppingcart: ShoppingCartProduct[];
  productswristband: ProductModel[];
  amountswristband: number[];
  nBonds:number;
  ngOnInit() {
    this.initialization();
  }




  price: number;
  discountedofferproducts: ShoppingCartProduct[]=[];
  discountedbondsproducts: ShoppingCartProduct[]=[];
  discountedbonds:number;
  indexoffers:number;
  indexbonds:number;
  offerproduct:boolean[]=[];

  initialization(){
    this.shoppingcart= this.shoppingcartservice.getShoppingCart();
    this.productswristband=this.wristbandservice.getProductsWristband(
      this.wristbandservice.getSelectedWristband());
    this.amountswristband=this.wristbandservice.getAmountsWristband(
      this.wristbandservice.getSelectedWristband());
    this.nBonds=this.wristbandservice.getBondsWristband(
      this.wristbandservice.getSelectedWristband()
    );
    this.discountedbondsproducts=[];
    this.discountedbonds=0;
    this.discountedofferproducts=[];
    this.indexbonds=0;
    this.indexoffers=0;
    this.offerproduct=[];
    this.calculatePrice();
  }

  calculatePrice() {
    this.price = this.shoppingcartservice.getPrice();
    this.indexoffers = 0;
    this.indexbonds = 0;
    this.discountedbonds=0;
    //OFERTAS
    for (let item1 in this.shoppingcart) {
      for (let item2 in this.productswristband) {
        if (this.shoppingcart[item1].name == this.productswristband[item2].name) {
          if (this.shoppingcart[item1].amount <= this.amountswristband[item2]) {
            this.discountedofferproducts.push(this.shoppingcart[item1]);
            this.indexoffers = this.indexoffers + 1;
            //esto habría que hacerlo cuando se confirme la compra
            //this.amountswristband[item2]=this.amountswristband[item2]-this.shoppingcart[item1].amount;
          } else if(this.amountswristband[item2]>0){

            this.discountedofferproducts[this.indexoffers]=JSON.parse(JSON.stringify(this.shoppingcart[item1]));
            this.discountedofferproducts[this.indexoffers].amount = this.amountswristband[item2];
            this.indexoffers = this.indexoffers + 1;

          }
        }
      }
    }

    //Bonos (por orden)
    for (let item1 in this.shoppingcart) {
      this.offerproduct[item1] = false;
      for (let item2 in this.discountedofferproducts) {
        if (this.shoppingcart[item1].name == this.discountedofferproducts[item2].name) {
          this.offerproduct[item1] = true;
        //}
          if ((this.shoppingcart[item1].amount > this.discountedofferproducts[item2].amount)){ //&& (this.offerproduct)) {
            if (((this.shoppingcart[item1].amount
                - this.discountedofferproducts[item2].amount)
                * this.shoppingcart[item1].bonds) <= (this.nBonds-this.discountedbonds)) {
              this.discountedbondsproducts[this.indexbonds] = JSON.parse(JSON.stringify(this.shoppingcart[item1]));
              this.discountedbondsproducts[this.indexbonds].amount =
                this.shoppingcart[item1].amount - this.discountedofferproducts[item2].amount;
              this.discountedbonds=this.discountedbonds+this.discountedbondsproducts[this.indexbonds].bonds*
                this.discountedbondsproducts[this.indexbonds].amount;
              this.indexbonds = this.indexbonds + 1;
            } else if(this.nBonds>=this.discountedbonds) {
              this.discountedbondsproducts[this.indexbonds] = JSON.parse(JSON.stringify(this.shoppingcart[item1]));
                this.discountedbondsproducts[this.indexbonds].amount =
                  (this.nBonds - this.discountedbonds) / this.shoppingcart[item1].bonds;
                this.discountedbonds = this.discountedbonds + this.discountedbondsproducts[this.indexbonds].bonds *
                  this.discountedbondsproducts[this.indexbonds].amount;
                this.indexbonds = this.indexbonds + 1;

            }
          }
        }
      }
      for(let item1 in this.shoppingcart) {
        if (((this.shoppingcart[item1].amount
            * this.shoppingcart[item1].bonds) <= (this.nBonds - this.discountedbonds)) && (this.offerproduct[item1] == false)) {
          this.discountedbondsproducts[this.indexbonds] = JSON.parse(JSON.stringify(this.shoppingcart[item1]));
          this.discountedbonds = this.discountedbonds + this.discountedbondsproducts[this.indexbonds].bonds *
            this.discountedbondsproducts[this.indexbonds].amount;
          this.indexbonds = this.indexbonds + 1;
        } else if ((this.nBonds >= this.discountedbonds) && (this.offerproduct[item1]==false)) {
          this.discountedbondsproducts[this.indexbonds] = JSON.parse(JSON.stringify(this.shoppingcart[item1]));
          this.discountedbondsproducts[this.indexbonds].amount =
            ~~((this.nBonds - this.discountedbonds) / this.shoppingcart[item1].bonds);
          this.discountedbonds = this.discountedbonds + this.discountedbondsproducts[this.indexbonds].bonds *
            this.discountedbondsproducts[this.indexbonds].amount;
          this.indexbonds = this.indexbonds + 1;
        }
      }
    }
    //Precio final
    for(let item1 in this.discountedofferproducts){
      this.price=this.price-this.discountedofferproducts[item1].amount
        *this.discountedofferproducts[item1].price;
    }
    for(let item1 in this.discountedbondsproducts){
      this.price=this.price-this.discountedbondsproducts[item1].amount
        *this.discountedbondsproducts[item1].price;
    }
  }



  payShoppingCart(){
    //En realidad no sé si se puede llegar aquí sin funcionar con selectedWristband
    //this.discountedbonds=0;
    //for(let item1 in this.discountedbondsproducts){
     // this.discountedbonds=this.discountedbonds+this.discountedbondsproducts[item1].bonds*
      //  this.discountedbondsproducts[item1].amount;
    //}
    for(let item1 in this.discountedofferproducts){
      for(let item2 in this.productswristband){
        if(this.discountedofferproducts[item1].name==this.productswristband[item2].name){
          this.amountswristband[item2]=this.amountswristband[item2]-this.discountedofferproducts[item1].amount;
        }
      }
    }
   if (this.wristbandservice.getMoneyWristband(
        this.wristbandservice.getSelectedWristband())>=this.price){
      this.wristbandservice.patchWristband(this.wristbandservice.getSelectedWristband(),
        this.wristbandservice.getMoneyWristband(
          this.wristbandservice.getSelectedWristband())-this.price,
        this.wristbandservice.getBondsWristband(this.wristbandservice.getSelectedWristband())
        -this.discountedbonds,
        this.wristbandservice.getProductsWristband(this.wristbandservice.getSelectedWristband()),
        this.amountswristband);
      this.discountedofferproducts=[];
      this.discountedbondsproducts=[];
      console.log("Compra realizada correctamente");
      this.shoppingcartservice.deleteShoppingCart();
      this.price=0;
      this.navCtrl.push(CoverPage,{
      });
    }else{
      console.log("No money baby");
    }
  }
  modifyShoppingCart(productname:string, type:boolean){
    if(type==true){
      this.shoppingcartservice.patchShoppingCart(productname, type);
    }else{
      this.shoppingcartservice.patchShoppingCart(productname, type);
    }
    this.initialization();
  }
}
