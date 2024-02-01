import { Component, Input, OnInit, input } from '@angular/core';
import { SmsManager } from '@byteowls/capacitor-sms';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
@Component({
  selector: 'app-sms-modal',
  templateUrl: './sms-modal.component.html',
  styleUrls: ['./sms-modal.component.scss'],
})
export class SmsModalComponent implements OnInit {
  @Input() type: any;
  @Input() title: any;
  @Input() smart: any;
  @Input() globe: any;

  constructor(
    private callNumber : CallNumber
  ) { }

  ngOnInit() {
    console.log(this.smart);
  }

  sms(contact: any) {
    contact = contact.toString();
    SmsManager.send({
      numbers: [contact],
      text: ' ',
    }).then(() => {
      // success
    }).catch(error => {
      console.error('msg_error', error);
    });
  }


  call(contact:any){
    console.log('call number')
    this.callNumber.callNumber(contact, false);
  }

}
