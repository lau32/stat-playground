import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationFacade } from '../../+state/navigation.facade';
import { NavigationEntity } from '../../+state/navigation.models';

@Component({
  selector: 'stat-playground-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  loaded$: Observable<boolean> = this.navigationFacade.loaded$;
  countriesCount$: Observable<number> = this.navigationFacade.countriesCount$;
  countries$: Observable<NavigationEntity[]> = this.navigationFacade.allCountries$;
  selectedCountry$: Observable<string> = this.navigationFacade.selectedCountry$;

  constructor(private navigationFacade: NavigationFacade) {
  }
}
