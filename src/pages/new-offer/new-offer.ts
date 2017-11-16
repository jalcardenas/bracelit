import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductModel } from "../Product.model";
import { ProductsService } from "../Products.service";
import { ShoppingCartPage } from "../shopping-cart/shopping-cart";
import { ShoppingCartService } from "../ShoppingCart.service";
import {EventsService} from "../Events.service";
import {OffersModel} from "../Offers.module";
import {CoverPage} from "../cover/cover";

/**
 * Generated class for the ProductoslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-offer',
  templateUrl: 'new-offer.html',
})
export class NewOfferPage implements OnInit {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private productsService: ProductsService,
              private shoppingcartservice:ShoppingCartService,
              private eventsservice:EventsService) {

  }

  ngOnInit(){
    this.offer=new OffersModel([],[]);
    this.products = this.eventsservice.getProducts();
  }
  products: ProductModel[];
  offer:OffersModel;
  productin:boolean;
  onClick(){
    console.log(this.offer.products);
    console.log(this.offer.amounts);

    if(this.offer!=null) {
      this.eventsservice.addOfferEvent(this.eventsservice.getSelectedEvent(), this.offer);
    }
    else {
      alert('No hay oferta wey!')
    }
    console.log("Oferta guardada");
    this.navCtrl.push(CoverPage,{
    });
  }
  addProduct(product:ProductModel){
    console.log(product);
    this.productin=false;
    for(let item in this.offer.products){

      if(this.offer.products[item].name==product.name){
        this.offer.amounts[item]=this.offer.amounts[item]+1;
        this.productin=true;
      }

    }
    console.log(this.productin);
    if(this.productin==false){
      if(this.offer.products!=null) {
        this.offer.products.push(product);
        this.offer.amounts.push(1);
      }else{
        this.offer.products[0]=product;
        this.offer.amounts[0]=1;
      }

    }
  }
}
