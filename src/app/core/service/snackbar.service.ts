import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {
  constructor(
    private mdSnackBar: MdSnackBar
  ) { }

  public openSnackBar(message: string, action?: string, duration?: number) {
    action = action || 'OK';
    duration = duration || 8000;
    return this.mdSnackBar.open(message, action, {
      duration
    });
  }
}
