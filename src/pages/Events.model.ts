import {WristbandModel} from "./Wristband.model";
import {WorkersModel} from "./Workers.model";

export class EventsModel{
  public name:string;
  public id: string;
  public wristbands: WristbandModel[];
  public workers: WorkersModel[];

  constructor(name:string, id:string, wristbands: WristbandModel[], workers:WorkersModel[]){
    this.name= name;
    this.id=id;
    this.wristbands=wristbands;
    this.workers=workers;
  }
}
