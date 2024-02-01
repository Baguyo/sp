import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomePage],
  providers: [CallNumber],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
