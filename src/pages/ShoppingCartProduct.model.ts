export class ShoppingCartProduct{
  public name:string;
  public amount: number;
  public price: number;
  public bonds: number;



  constructor(name:string, amount: number, price:number, bonds:number){
    this.name= name;
    this.amount=amount;
    this.price=price;
    this.bonds=bonds;
  }
}
