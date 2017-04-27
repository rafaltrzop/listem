import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './service/auth.service';
import { SnackBarService } from './service/snackbar.service';
import { LoggedInGuard } from './service/logged-in-guard.service';
import { LoggedOutGuard } from './service/logged-out-guard.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ],
  exports: [ ],
  providers: [
    AuthService,
    SnackBarService,
    LoggedInGuard,
    LoggedOutGuard
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        SnackBarService,
        LoggedInGuard,
        LoggedOutGuard
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
