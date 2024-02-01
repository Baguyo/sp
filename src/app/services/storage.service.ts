import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set(key:any, value: any){
    return Preferences.set({
      key: key,
      value: value,
    });
  }

  public get(key:any){
    return Preferences.get({
      key: key,
    });
  }

  public remove(key:any){
    return Preferences.remove({
      key: key,
    });
  }
}
