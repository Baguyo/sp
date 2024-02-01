import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    let data = await this.storage.get('contacts');


    if (data.value !== null) {
      this.router.navigateByUrl('/home');
      return false;
    } else {
      // this.router.navigateByUrl('/home');
      return true;
    }
  }

}
