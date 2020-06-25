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
          selectedId: 'PRODUCT-BBB',
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

    it('getSelected() should return the selected Entity', () => {
      const result = NavigationSelectors.getSelected(state);
      const selId = getNavigationId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getNavigationLoaded() should return the current 'loaded' status", () => {
      const result = NavigationSelectors.getNavigationLoaded(state);

      expect(result).toBe(true);
    });

    it("getNavigationError() should return the current 'error' state", () => {
      const result = NavigationSelectors.getNavigationError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
