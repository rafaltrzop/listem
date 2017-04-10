import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './service/auth.service';
import { SnackBarService } from './service/snackbar.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ],
  exports: [ ],
  providers: [
    AuthService,
    SnackBarService
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        SnackBarService
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
