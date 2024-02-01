import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends BaseComponent {

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
    navCtrl: NavController
  ) {
    super(storage, router, alertController, loadingController, navCtrl);

   }

  //  ngOnInit() {
    
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

  //   console.log('doneeee');

  //   // this.router.navigateByUrl('home');
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
