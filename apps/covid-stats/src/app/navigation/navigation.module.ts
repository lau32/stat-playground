import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNavigation from './+state/navigation.reducer';
import { NavigationEffects } from './+state/navigation.effects';
import { NavigationFacade } from './+state/navigation.facade';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromNavigation.NAVIGATION_FEATURE_KEY,
      fromNavigation.reducer
    ),
    EffectsModule.forFeature([NavigationEffects])
  ],
  providers: [NavigationFacade],
  exports: [NavigationComponent]
})
export class NavigationModule {}
