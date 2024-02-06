import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ContactItemSkeletonComponent } from './contact-item-skeleton/contact-item-skeleton.component';
import { SmsModalComponent } from './sms-modal/sms-modal.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';



@NgModule({
  declarations: [
    ContactItemComponent,
    ModalComponent,
    ContactItemSkeletonComponent,
    SmsModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ContactItemComponent,
    ModalComponent,
    ContactItemSkeletonComponent,
    SmsModalComponent
  ],
  providers: [CallNumber],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
