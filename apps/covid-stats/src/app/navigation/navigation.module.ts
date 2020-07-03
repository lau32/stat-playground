import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NavigationComponent } from './components/navigation/navigation.component';
import * as fromNavigation from './+state/navigation.reducer';
import { NavigationEffects } from './+state/navigation.effects';
import { NavigationFacade } from './+state/navigation.facade';
import { NavigationService } from './providers/navigation.service';
import { NavigationApi } from './providers/navigation.api';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromNavigation.NAVIGATION_FEATURE_KEY,
      fromNavigation.reducer
    ),
    EffectsModule.forFeature([NavigationEffects]),
    RouterModule,
    SharedModule
  ],
  providers: [NavigationFacade, NavigationService, NavigationApi],
  exports: [NavigationComponent]
})
export class NavigationModule {}
