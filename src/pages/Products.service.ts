import { Injectable } from '@angular/core';
//import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';
//import { Pulseras } from "./pulseras.model";
import { ProductModel } from "./Product.model";


@Injectable()
export class ProductsService {
  products: ProductModel[] = [
    new ProductModel('Coca Cola',1000,'../../assets/imgs/cocacola.jpg',2,1),
    new ProductModel('Pepsi Cola',666,'../../assets/imgs/cocacola.jpg',1,1),
    new ProductModel('Fanta',66,'../../assets/imgs/cocacola.jpg',1.5,2),
    new ProductModel('Seven Up',786,'../../assets/imgs/cocacola.jpg',2,2),
    new ProductModel('Otra cosa',1,'../../assets/imgs/cocacola.jpg',4,3)
  ];


  getProducts() {
    return this.products;
  }
  //postProducts(username: string, id:string, money:number, age:number){
  // this.productos.push(new Productos(username,id,money,age));
  //}
  //patchProducts(id:string, money:number){
  // for (var item in this.pulseras) {
  //  if(this.pulseras[item].identificador==id  ){
  //   this.pulseras[item].dinero=money
  //  console.log(this.pulseras[item]);
  // }
  //}
  //}
}
