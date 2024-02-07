import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { NavController, ViewDidEnter, ViewDidLeave, ViewWillLeave } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { ToastService } from '../services/toast.service';
import { ProvinceService } from './../services/province.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements ViewWillLeave {

  public provinces: any = null;
  public provinceId: any = null;
  public municipalities: any = null;
  public municipalityId: any = null;
  public isConnected: boolean = false;

  public provinceSub: Subscription;

  constructor(
    public storage: StorageService,
    public router: Router,
    public alertController: AlertService,
    public loadingController: LoadingService,
    public navCtrl: NavController,
    public toastCtrl: ToastService,
    public provinceService: ProvinceService,
    public changeRef: ChangeDetectorRef

  ) {
    // this.load();
    this.provinceSub = this.provinceService.province.subscribe(provinces => {
      this.provinces = provinces;
    })
  }

  ionViewWillLeave() {
    Network.removeAllListeners();
    this.provinceSub.unsubscribe();
    console.log('remove')
  }

  // async ionViewDidEnter() {
  //   // await this.loadingController.showLoading('Fetching Records.');

  // }

  // async ngOnInit() {
  // }

  async load() {
    let isConnected = await this.netWorkStatus();
    this.setData(isConnected);

    Network.addListener('networkStatusChange', async (status: any) => {
      if (this.isConnected !== status.connected) {
        console.log('Network status changed', status);
        console.log(status.connected);
        this.setData(status.connected);
      }
    });

  }

  public async handleProvinceChange(ev: any) {
    this.provinceId = ev.target.value;
    await this.loadingController.showLoading('Fetching Records.');
    // const response = await this.getRequest(`/municipality/${this.provinceId}`);
    this.getRequest(`/municipality/${this.provinceId}`).then((response) => {
      this.municipalities = response.data.data;
      this.loadingController.dismiss();
    }).catch(e => {
      console.log(e);
      this.toastCtrl.presentToast('Connection error. Please select Province again.');
      this.loadingController.dismiss();
    });

  }

  public handleMunicipalityChange(ev: any) {
    this.municipalityId = ev.target.value;
  }

  public async handleSubmit() {
    console.log('province', this.provinceId);
    console.log('municipality', this.municipalityId);

    // let response = await this.getRequest(`/contact/${this.provinceId}`);
    await this.loadingController.showLoading('Fetching Records');
    this.getRequest(`/contact/${this.provinceId}`).then(async (response) => {
      let contacts = JSON.stringify(response.data.data);
      await this.storage.set('contacts', contacts);
      await this.storage.set('municipalityId', this.municipalityId);
      this.loadingController.dismiss();
      this.router.navigateByUrl('/home');
      // this.navCtrl.navigateForward
      console.log('redirect to home');
    }).catch(e => {
      this.toastCtrl.presentToast('Connection error. Please try again.');
      console.log(e);
    })



  }

  public async handleDataChange() {
    console.log('province', this.provinceId);
    console.log('municipality', this.municipalityId);

    // let response = await this.getRequest(`/contact/${this.provinceId}`);
    await this.loadingController.showLoading('Fetching Records');
    this.getRequest(`/contact/${this.provinceId}`).then(async (response) => {
      let contacts = JSON.stringify(response.data.data);
      console.log(contacts);
      await this.storage.set('contacts', contacts);
      await this.storage.set('municipalityId', this.municipalityId);
      this.loadingController.dismiss();
      window.location.reload();
      // this.router.navigateByUrl('/login');
      // this.navCtrl.navigateForward
      console.log('redirect to home via change');
    }).catch(e => {
      console.log(e);
      this.toastCtrl.presentToast('Connection error. Please try again.');
      this.loadingController.dismiss();
    });
  }

  public getRequest(route: any) {
    return CapacitorHttp.get({
      url: environment.api + route,
    });
  }

  async netWorkStatus() {
    const status = await Network.getStatus();
    return status.connected;
  }

  async setData(connection: any) {
    if (!connection) {
      console.log('no connection run');
      this.isConnected = false;
      // this.provinces = null;
      this.provinceService.setProvince(null);
      this.municipalities = null;
      console.log('not connected');
      await this.alertController.showAlert('Please connect to internet to fetch the latest record', null, 'The app will be free for offline use once you get the contacts. ');

    } else {

      console.log('with connection run');
      if (this.alertController.isOpen()) {
        this.alertController.dismiss();
      }

      this.isConnected = true;
      await this.loadingController.showLoading('Fetching Records');
      this.getRequest('/province').then((response) => {
        // this.provinces = response.data.data;
        this.provinceService.setProvince(response.data.data);
        this.loadingController.dismiss();
      }).catch((e) => {
        console.log('error')
        console.log(e);
        this.toastCtrl.presentToast('Connection error. Please try again.');
        this.loadingController.dismiss();
      });

      console.log('connected');

    }
    this.changeRef.detectChanges();



  }

}
