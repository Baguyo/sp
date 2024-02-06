import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { IonModal, NavController, ToastController, ViewDidEnter } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProvinceService } from 'src/app/services/province.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends BaseComponent implements ViewDidEnter {

  // public provinces: any;
  // public provinceId: any = null;
  // public municipalities: any = null;
  // public municipalityId: any = null;
  // public isConnected: boolean = false;
  public storedMunicipalities: any = [];
  public storedMunicipalityId: any = null;
  @ViewChild('locationSlide') locationSlide: ElementRef;

  constructor(
    storage: StorageService,
    router: Router,
    alertController: AlertService,
    loadingController: LoadingService,
    navCtrl: NavController,
    toastCtrl: ToastService,
    provinceService: ProvinceService
  ) {
    super(storage, router, alertController, loadingController, navCtrl, toastCtrl, provinceService);

  }

  async ionViewDidEnter() {
    this.locationSlide.nativeElement.swiper.allowTouchMove = false;
    let data: any = await this.storage.get('contacts');
    data = JSON.parse(data.value);
    data.municipality.forEach((element: any) => {
      this.storedMunicipalities.push({ "id": element.id, "municipality_name": element.municipality_name });
      console.log(element);
    });
  }

  async changeMunicipality() {
    console.log(this.storedMunicipalityId);
    await this.storage.set('municipalityId', this.storedMunicipalityId);
    window.location.reload();
  }

  handleChangeStoredMunicipality(ev: any) {
    this.storedMunicipalityId = ev.target.value;
    console.log(this.storedMunicipalityId);
  }

  changeType(ev: any) {
    let type = ev.target.value;
    switch (type) {
      case 'province':
        this.locationSlide.nativeElement.swiper.slideTo(1, 500);
        super.load();
        break;

      default:
        this.locationSlide.nativeElement.swiper.slideTo(0, 500);
        break;
    }
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
