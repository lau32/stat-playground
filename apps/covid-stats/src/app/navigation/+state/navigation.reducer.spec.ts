import { NavigationEntity } from './navigation.models';
import * as NavigationActions from './navigation.actions';
import { State, initialState, reducer } from './navigation.reducer';

describe('Navigation Reducer', () => {
  const createNavigationEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NavigationEntity);

  describe('valid Navigation actions', () => {
    it('loadNavigationSuccess should return set the list of known Navigation', () => {
      const navigation = [
        createNavigationEntity('PRODUCT-AAA'),
        createNavigationEntity('PRODUCT-zzz'),
      ];
      const action = NavigationActions.loadNavigationSuccess({ navigation });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.ids.length).toBe(0);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
