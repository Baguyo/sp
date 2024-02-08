import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { NavController, ViewDidLeave, ViewWillLeave } from '@ionic/angular';
import { BaseComponent } from '../base/base.component';
import { ToastService } from '../services/toast.service';
import { ProvinceService } from './../services/province.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent  {

  // public provinces: any;
  // public provinceId: any = null;
  // public municipalities: any = null;
  // public municipalityId: any = null;
  // public isConnected: boolean = false;

  constructor(
   storage: StorageService,
   router: Router,
   alertController: AlertService,
   loadingController: LoadingService,
   navCtrl: NavController,
   toastCtrl: ToastService,
   provinceService: ProvinceService,
   change: ChangeDetectorRef
  ) { 
    super(storage, router, alertController, loadingController, navCtrl, toastCtrl, provinceService, change);
    super.load();
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack){
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  }

  // async ngOnInit() {

  //   // await this.loadingController.showLoading('Fetching Records.');
  //   let isConnected = await this.netWorkStatus();
  //   this.setData(isConnected);

  //   Network.addListener('networkStatusChange', async (status) => {
  //     console.log('Network status changed', status);

  //     this.setData(status.connected);
  //   });

  // }

  // public async handleProvinceChange(ev: any) {
  //   this.provinceId = ev.target.value;
  //   await this.loadingController.showLoading('Fetching Records.');
  //   const response = await this.getRequest(`/municipality/${this.provinceId}`);
  //   this.municipalities = response.data.data;
  //   this.loadingController.dismiss();
  // }

  // public handleMunicipalityChange(ev: any) {
  //   this.municipalityId = ev.target.value;
  // }

  // public async handleSubmit() {
  //   console.log('province', this.provinceId);
  //   console.log('municipality', this.municipalityId);

  //   let response = await this.getRequest(`/contact/${this.provinceId}`);

  //   let contacts = JSON.stringify(response.data.data);

  //   await this.storage.set('contacts', contacts);
  //   await this.storage.set('municipalityId', this.municipalityId);

  //   this.router.navigateByUrl('/home');
  //   // this.navCtrl.navigateForward
  //   console.log('redirect to home');
  // }

  // public getRequest(route: any) {
  //   return CapacitorHttp.get({
  //     url: environment.api + route,
  //   });
  // }

  // async netWorkStatus() {
  //   const status = await Network.getStatus();
  //   return status.connected;
  // }

  // async setData(connection: any) {
  //   if (!connection) {
  //     this.loadingController.showLoading('Fetching Records');
  //     await this.alertController.showAlert('Please connect to internet to fetch the latest record', null, 'The app will be free for offline use once you get the contacts. ');
  //     this.isConnected = false;
  //     this.loadingController.dismiss();
  //   } else {

  //     if (this.alertController.isOpen()) {
  //       this.alertController.dismiss();
  //     }

  //     await this.loadingController.showLoading('Fetching Records');
  //     this.isConnected = true;
  //     const response = await this.getRequest('/province')
  //     this.provinces = response.data.data;
  //     this.loadingController.dismiss();
  //   }
  // }


}
