import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductModel } from "../Product.model";
import { ProductsService } from "../Products.service";
import { ShoppingCartPage } from "../shopping-cart/shopping-cart";
import { ShoppingCartService } from "../ShoppingCart.service";
import {EventsService} from "../Events.service";

/**
 * Generated class for the ProductoslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products-list',
  templateUrl: 'products-list.html',
})
export class ProductsListPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private productsService: ProductsService,
              private shoppingcartservice:ShoppingCartService,
              private eventsservice:EventsService) {

  }
  products: ProductModel[] = this.eventsservice.getProducts();

  onClick(){
    this.navCtrl.push(ShoppingCartPage,{

    });
  }
  addProduct(name:string, price:number, nbonds:number){
    this.shoppingcartservice.postShoppingCart(name, price, nbonds);
  }
}
