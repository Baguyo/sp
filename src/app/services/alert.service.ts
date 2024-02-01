import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alert: any;
  constructor(
    private alertController: AlertController
  ) { }

  async showAlert(header: any, subheader: any = null, message: any = null) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['Ok'],
    });

    this.alert = alert;

    await alert.present();
  }

  isOpen() {
    return this.alert;
    // return this.alert.isOpen;
  }

  dismiss() {
    return this.alert.dismiss();
  }
}
