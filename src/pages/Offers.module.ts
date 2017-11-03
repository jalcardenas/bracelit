import { ProductModel } from "./Product.model";

export class OffersModel{
  public products: ProductModel[];
  public amounts: number[];
  constructor(products:ProductModel[],amounts:number[]){
    this.products=products;
    this.amounts=amounts;
  }
}
