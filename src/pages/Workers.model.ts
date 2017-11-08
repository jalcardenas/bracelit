export class WorkersModel{
  public name:string;
  public id: number;
  public role: number;

  constructor(name:string, id: number, role:number){
    this.name= name;
    this.id=id;
    this.role=role;
  }
}
