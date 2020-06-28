import { NavigationEntity } from './navigation.models';
import { initialState, navigationAdapter } from './navigation.reducer';
import { getCount, getNavigationError, getNavigationLoaded } from './navigation.selectors';

describe('Navigation Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNavigationId = (model) => model.countryCode;
  const createNavigationEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      countryCode: name || `name-${id}`
    } as NavigationEntity);

  let state;

  beforeEach(() => {
    state = {
      navigation: navigationAdapter.addAll(
        [
          createNavigationEntity('PRODUCT-AAA'),
          createNavigationEntity('PRODUCT-BBB'),
          createNavigationEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: getNavigationId,
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  it('getNavigationLoaded() should return loaded', () => {
    const result: boolean = getNavigationLoaded(state);

    expect(result).toBe(true);
  });

  it('getNavigationError() should return error', () => {
    const result: string = getNavigationError(state);

    expect(result).toBe(ERROR_MSG);
  });

  it('getCount() should return count', () => {
    const result: number = getCount(state);

    expect(result).toBe(3);
  });
});
