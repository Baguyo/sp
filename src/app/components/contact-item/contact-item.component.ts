import { Component, Input, OnInit, input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SmsModalComponent } from '../sms-modal/sms-modal.component';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
})
export class ContactItemComponent implements OnInit {

  @Input() municipalityName: string;
  @Input() provinceName: string;
  @Input() title: string;
  @Input() location: string;
  @Input() contact_number_smart: string;
  @Input() contact_number_globe: string;
  @Input() image: string;


  constructor(
    private modalCtrl: ModalController
  ) { 
  }

  ngOnInit() {
    
   }

  async openModal(type:string, title:string, smart: any, globe:any) {
    const smsModal = await this.modalCtrl.create({
      component: SmsModalComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps:{
        type: type,
        title: title,
        smart: smart,
        globe: globe
      }
    });
    await smsModal.present();
  }

  openLocation(street:any, city: string, state: string){
    StartNavigation.launchMapsApp({
      address: {
        state: state,
        street: street,
        city: city,
        postalCode: "",
        country: "Philippines"
      },
    });
  }


}
