import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading :any;
  constructor(
    private loadingCtrl: LoadingController
  ) { }


  async showLoading(message: any = null ) {
    const loading = await this.loadingCtrl.create({
      message: message,
    });

    this.loading = loading;
    loading.present();
  }

  async dismiss(){
    this.loading.dismiss();
  }
}
