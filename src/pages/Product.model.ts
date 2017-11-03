export class ProductModel{
  public name:string;
  public stock: number;
  public imagePath: string;
  public price: number;
  public nbonds: number;

  constructor(name:string, stock: number, imagePath: string, price: number, nbonds:number){
    this.name= name;
    this.stock=stock;
    this.imagePath=imagePath;
    this.price=price;
    this.nbonds=nbonds;
  }
}
