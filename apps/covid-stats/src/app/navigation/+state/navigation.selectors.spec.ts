import { NavigationEntity } from './navigation.models';
import { navigationAdapter, initialState } from './navigation.reducer';
import * as NavigationSelectors from './navigation.selectors';

describe('Navigation Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNavigationId = (it) => it['id'];
  const createNavigationEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      countryCode: name || `name-${id}`,
    } as NavigationEntity);

  let state;

  beforeEach(() => {
    state = {
      navigation: navigationAdapter.addAll(
        [
          createNavigationEntity('PRODUCT-AAA'),
          createNavigationEntity('PRODUCT-BBB'),
          createNavigationEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: (model) => model.countryCode,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Navigation Selectors', () => {
    it('getAllNavigation() should return the list of Navigation', () => {
      const results = NavigationSelectors.getAllNavigation(state);
      const selId = getNavigationId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });
});
