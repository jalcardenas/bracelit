import { ProductModel } from "./Product.model";

export class WristbandModel{
  public name:string;
  public id: string;
  public money: number;
  public age: number;
  public bonds: number;
  public products: ProductModel[];
  public amounts: number[];
  public shoppingcart: ProductModel[];

  constructor(name:string, id: string, money: number,
              age: number, bonds:number, products: ProductModel[],
              amounts: number[], shoppingcart: ProductModel[]){
    this.name= name;
    this.id=id;
    this.money=money;
    this.age=age;
    this.bonds = bonds;
    this.products = products;
    this.amounts=amounts;
    this.shoppingcart=shoppingcart;
  }
}
