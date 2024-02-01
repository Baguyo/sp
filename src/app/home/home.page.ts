import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, ViewDidEnter } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { App as CapacitorApp } from '@capacitor/app';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter {

  activeContact = "hospital";
  activeTheme = "sunny";
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('contactSlides') contactSlides: ElementRef;


  public data: any;
  public municipalityData: any;
  public provinceName: any;
  public municipalityName: any;
  public hospitalContacts: any;
  public fireContacts: any;
  public policeContacts: any;
  public ambulanceContacts: any;
  public isLoading: boolean;
  public contactSkeletonCount = [1, 2, 3, 4, 5];

  constructor(
    private storageService: StorageService,
    private modalCtrl: ModalController
    // MODAL FOR CHANGE LOCATION
  ) { }

  async ngOnInit() {
    // this.confBackButton();

    this.isLoading = true;

    setTimeout(async () => {
      let provinceInfo: any = await this.storageService.get('contacts');
      let municipalityId = await this.storageService.get('municipalityId');

      this.data = JSON.parse(provinceInfo.value);

      this.provinceName = this.data.province_name;

      let municipalityInfo = this.data.municipality.filter((x: any) => x.id == municipalityId.value);
      this.municipalityData = municipalityInfo;

      this.municipalityName = this.municipalityData[0].municipality_name;

      this.setHospitalContact();
      this.setPoliceContact();
      this.setFireContact();
      this.setAmbulanceContact();

      console.log('hospital', this.hospitalContacts);
      console.log('police', this.policeContacts);
      console.log('fire', this.fireContacts);
      console.log('ambulance', this.ambulanceContacts);

      this.isLoading = false;

    }, 2000);
  }



  ionViewDidEnter(): void {
    this.contactSlides.nativeElement.swiper.allowTouchMove = false;
    // this.contactSlides.nativeElement.swiper.slideTo(1, 500);
  }

  switchContact(type: string) {

    switch (type) {
      case "hospital":
        this.activeContact = "hospital";
        this.contactSlides.nativeElement.swiper.slideTo(0, 500);
        break;
      case "police":
        this.activeContact = "police";
        this.contactSlides.nativeElement.swiper.slideTo(1, 500);
        break;
      case "fire":
        this.activeContact = "fire";
        this.contactSlides.nativeElement.swiper.slideTo(2, 500);
        break;
      case "ambulance":
        this.activeContact = "ambulance";
        this.contactSlides.nativeElement.swiper.slideTo(3, 500);
        break;
      default:
        this.activeContact = "hospital";
        this.contactSlides.nativeElement.swiper.slideTo(0, 500);
    }
    this.content.scrollToTop(500);
  }

  async toggleTheme(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('color-scheme', 'dark');
      this.activeTheme = "moon";
    } else {
      document.body.setAttribute('color-scheme', 'light');
      this.activeTheme = "sunny";
    }
  }

  handleSearch(event: any) {
    this.isLoading = true;
    setTimeout(() => {
      let value = event.target.value;
      if (value && value.trim() != '') {
        this.searchContact(value);
      } else {
        this.searchContact(); 
      }
      this.isLoading = false;
    }, 2000)

  }

  public setHospitalContact() {
    this.hospitalContacts = this.municipalityData[0].contact.filter((element: any) => {
      return element.hospital;
    });

    console.log(this.hospitalContacts);
  }

  public setPoliceContact() {
    this.policeContacts = this.municipalityData[0].contact.filter((element: any) => {
      return element.police;
    });
  }

  public setFireContact() {
    this.fireContacts = this.municipalityData[0].contact.filter((element: any) => {
      return element.fire;
    });
  }

  public setAmbulanceContact() {
    this.ambulanceContacts = this.municipalityData[0].contact.filter((element: any) => {
      return element.ambulance;
    });
  }

  public searchContact(value: any = null) {
    if (this.activeContact === 'hospital') {
      if (value) {
        this.hospitalContacts = this.municipalityData[0].contact.filter((item: any) => {
          return ((item.hospital?.contact_name.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.hospital?.contact_location.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.hospital?.contact_number_smart.toLowerCase().indexOf(value.toLowerCase()) > -1)
          )
        });
      } else {
        this.setHospitalContact();
      }

    } else if (this.activeContact === 'police') {
      if (value) {
        this.policeContacts = this.municipalityData[0].contact.filter((item: any) => {
          return ((item.police?.contact_name.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.police?.contact_location.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.police?.contact_number_smart.toLowerCase().indexOf(value.toLowerCase()) > -1)
          )
        });
      } else {
        this.setPoliceContact();
      }
    } else if (this.activeContact === 'fire') {
      if (value) {
        this.fireContacts = this.municipalityData[0].contact.filter((item: any) => {
          return ((item.fire?.contact_name.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.fire?.contact_location.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.fire?.contact_number_smart.toLowerCase().indexOf(value.toLowerCase()) > -1)
          )
        });
      } else {
        this.setFireContact();
      }
    } else if (this.activeContact === 'ambulance') {
      if (value) {
        this.ambulanceContacts = this.municipalityData[0].contact.filter((item: any) => {
          return ((item.ambulance?.contact_name.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.ambulance?.contact_location.toLowerCase().indexOf(value.toLowerCase()) > -1) ||
            (item.ambulance?.contact_number_smart.toLowerCase().indexOf(value.toLowerCase()) > -1)
          )
        });
      } else {
        this.setAmbulanceContact();
      }
    }
  }

  async changeLocation(){
    const changeModal = await this.modalCtrl.create({
      component: ModalComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
    })

    await changeModal.present();
  }

  confBackButton()  {
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack){
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  }

}
