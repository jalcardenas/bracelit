import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MenuPage } from '../pages/menu/menu';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductsListPage } from '../pages/products-list/products-list';
import { RechargePage } from '../pages/recharge/recharge';
import { RegisterPage } from '../pages/register/register';
import { WristbandService } from "../pages/Wristband.service";
import { ReturnPage } from "../pages/return/return";
import { ProductsService } from "../pages/Products.service";
import { ShoppingCartPage } from "../pages/shopping-cart/shopping-cart"
import { ShoppingCartService} from "../pages/ShoppingCart.service";
import { RechargeBondsPage } from "../pages/recharge-bonds/recharge-bonds";
import { BuyOffersPage } from "../pages/buy-offers/buy-offers";
import { HttpModule } from "@angular/http";
import { CoverPage} from "../pages/cover/cover";
import {NewEventPage} from "../pages/new-event/new-event";
import { EventsService} from "../pages/Events.service";
import {NewProductPage} from "../pages/new-product/new-product";
import {NewOfferPage} from "../pages/new-offer/new-offer";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsListPage,
    RechargePage,
    RegisterPage,
    ReturnPage,
    ShoppingCartPage,
    RechargeBondsPage,
    BuyOffersPage,
    CoverPage,
    NewEventPage,
    NewProductPage,
    NewOfferPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsListPage,
    RechargePage,
    RegisterPage,
    ReturnPage,
    ShoppingCartPage,
    RechargeBondsPage,
    BuyOffersPage,
    CoverPage,
    NewEventPage,
    NewProductPage,
    NewOfferPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WristbandService,
    ProductsService,
    ShoppingCartService,
    EventsService

  ]
})
export class AppModule {}
