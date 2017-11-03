import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { OffersModel} from "./Offers.module";
import {ProductModel} from "./Product.model";

@Injectable()
export class OffersService {
  products: ProductModel[] = [
    new ProductModel('Coca Cola',1000,'../../assets/imgs/cocacola.jpg',2,1),
    new ProductModel('Pepsi Cola',666,'../../assets/imgs/cocacola.jpg',1,1),
    new ProductModel('Fanta',66,'../../assets/imgs/cocacola.jpg',1.5,2),
    new ProductModel('Seven Up',786,'../../assets/imgs/cocacola.jpg',2,2),
    new ProductModel('Otra cosa',1,'../../assets/imgs/cocacola.jpg',4,3)
  ];

  offers: OffersModel[] = [
    new OffersModel([this.products[0], this.products[1]],[3,2]),
    new OffersModel([this.products[0], this.products[2]],[1,3])];

  getOffers() {
    return this.offers;
  }



}
