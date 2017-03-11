import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate() {
    console.log('AuthGuard#canActivate called'); // TODO: remove
    return true;
  }
}
