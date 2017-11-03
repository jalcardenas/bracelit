import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsListPage } from "../products-list/products-list";
import { RechargePage } from "../recharge/recharge";
import { ReturnPage } from "../return/return";
import {RechargeBondsPage} from "../recharge-bonds/recharge-bonds";
import {BuyOffersPage} from "../buy-offers/buy-offers";


/**
 * Generated class for the BracelitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  opciones: string[] = ["Comprar", "Recargar", "Recargar bonos", "Ofertas", "Devolver"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClick(variable: number){
    switch(variable) {
      case 0: this.navCtrl.push(ProductsListPage,{

      });
        break;
      case 1: this.navCtrl.push(RechargePage,{

      });
        break;
      case 2: this.navCtrl.push(RechargeBondsPage,{

      });
        break;
      case 3: this.navCtrl.push(BuyOffersPage,{

      });
        break;
      case 4: this.navCtrl.push(ReturnPage,{

      });
        break;
    }

  }
}
