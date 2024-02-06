import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastController
  ) { }

  async presentToast(message:string ,  duration: number = 3000){
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: duration
    });
    await toast.present();
  }
}
