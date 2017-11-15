import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { ShoppingCartProduct} from "./ShoppingCartProduct.model";


@Injectable()
export class ShoppingCartService {
  shoppingcart: ShoppingCartProduct[] = [
  ];
  shoppingcartproduct: ShoppingCartProduct;
  productin: boolean=false;
  price:number=0;
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
        }
      }
    }
    console.log(this.shoppingcart);
  }

  patchShoppingCart(product: string, type: boolean){
    for (let item in this.shoppingcart) {
      if (this.shoppingcart[item].name == product) {
        if(type==true) {
          this.shoppingcart[item].amount = this.shoppingcart[item].amount + 1;
        }else{
          if(this.shoppingcart[item].amount==0){
            this.deleteShoppingCartProduct(product);
          }else {
            this.shoppingcart[item].amount = this.shoppingcart[item].amount - 1;
          }
        }
      }
    }
  }
  deleteShoppingCartProduct(product: string){
    for (let item1 in this.shoppingcart) {
      if (this.shoppingcart[item1].name == product) {
        this.shoppingcart.splice(parseInt(item1),1);
      }
    }
  }

  deleteShoppingCart(){
    this.shoppingcart = [];
  }

  calculatePrice(){
    this.price=0;
    for(let item1 in this.shoppingcart){
      this.price=this.price+this.shoppingcart[item1].price*this.shoppingcart[item1].amount;
    }
  }
  getPrice(){
    this.calculatePrice();
    return this.price;
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
