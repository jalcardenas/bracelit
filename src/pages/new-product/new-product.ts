import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup } from "@angular/forms";
import {CoverPage} from "../cover/cover";
import {EventsService} from "../Events.service";
import {ProductModel} from "../Product.model";
import {NewOfferPage} from "../new-offer/new-offer";

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage implements OnInit {
  product: ProductModel;
  signupForm : FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eventsservice: EventsService
  ) {
  }
  ngOnInit(){
    this.signupForm = new FormGroup({
      'name': new FormControl(null),
      'stock': new FormControl(null),
      'price': new FormControl(null),
      'bonds': new FormControl(null)
    })
    console.log(this.signupForm.value.name);
  }
  onSubmit(){
    this.product= new ProductModel(this.signupForm.value.name,this.signupForm.value.stock,
      '../../assets/imgs/cocacola.jpg',this.signupForm.value.price,this.signupForm.value.bonds);
    this.eventsservice.addProductEvent(this.eventsservice.getSelectedEvent(),this.product);
    this.signupForm.reset();
  }

  goToCoverPage(){
    this.navCtrl.push(CoverPage,{
    });
  }


  goToOfferPage(){
    this.navCtrl.push(NewOfferPage,{
    });
  }

}
