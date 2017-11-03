import { Injectable } from '@angular/core';
//import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';
//import { Pulseras } from "./pulseras.model";
//import { Productos } from "./productos.model";
import { ShoppingCartProduct} from "./ShoppingCartProduct.model";


@Injectable()
export class ShoppingCartService {
  shoppingcart: ShoppingCartProduct[] = [
  ];
  shoppingcartproduct: ShoppingCartProduct;
  productin: boolean=false;

  getShoppingCart() {
    return this.shoppingcart;
  }

  postShoppingCart(newproduct: string, price:number, bonds:number) {
    this.shoppingcartproduct = new ShoppingCartProduct(newproduct, 1, price, bonds);
    this.productin=false;
    if (this.shoppingcart.length == 0) {
      this.shoppingcart.push(this.shoppingcartproduct);
    } else {
      for (let item in this.shoppingcart) {
        if (this.shoppingcart[item].name == this.shoppingcartproduct.name) {
          this.shoppingcart[item].amount = this.shoppingcart[item].amount+1;
          this.productin=true;
        } else if ((this.shoppingcart.length==(+item+1)&&(this.productin==false))) {
          this.shoppingcart.push(this.shoppingcartproduct);
          console.log(this.shoppingcart[this.shoppingcart.length-1]);
        }
      }

    }
  }
  deleteShoppingCart(){
    this.shoppingcart = [];
  }
  //patchProducts(id:string, money:number){
  // for (var item in this.pulseras) {
  //  if(this.pulseras[item].identificador==id  ){
  //   this.pulseras[item].dinero=money
  //  console.log(this.pulseras[item]);
  // }
  //}
  //}
}
