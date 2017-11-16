import {WristbandModel} from "./Wristband.model";
import {WorkersModel} from "./Workers.model";
import {ProductModel} from "./Product.model";
import {OffersModel} from "./Offers.module";

export class EventsModel{
  public name:string;
  public id: string;
  public wristbands: WristbandModel[];
  public workers: WorkersModel[];
  public menu: ProductModel[];
  public offers: OffersModel[];

  constructor(name:string, id:string, wristbands: WristbandModel[], workers:WorkersModel[], menu:ProductModel[],offers:OffersModel[]){
    this.name= name;
    this.id=id;
    this.wristbands=wristbands;
    this.workers=workers;
    this.menu=menu;
    this.offers=offers;
  }
}
