import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor() { }

  private _province = new BehaviorSubject<any>(null);

  get province(){
    return this._province.asObservable();
  }

  setProvince(province: any){
    this._province.next(province);
  }
}
