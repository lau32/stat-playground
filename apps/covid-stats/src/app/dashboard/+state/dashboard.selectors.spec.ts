import { DashboardEntity } from './dashboard.models';
import { dashboardAdapter, initialState } from './dashboard.reducer';
import {
  getConfirmed,
  getDailyInfected,
  getDashboardError,
  getDashboardLoaded,
  getLatestForCountry, getLatestTimeSeries
} from './dashboard.selectors';

const latestForCountryData = {};
const latestTimeSeriesData = [];
const dailyInfectedData = { dates: [], infected: [] };
const confirmedData = { dates: [], confirmed: [] };

describe('Dashboard Selectors', () => {
  const getDashboardId = (model) => model.countryCode;
  const ERROR_MSG = 'No Error Available';
  const createDashboardEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      countryCode: name || `name-${id}`
    } as DashboardEntity);

  let state;

  beforeEach(() => {
    state = {
      dashboard: dashboardAdapter.addAll(
        [
          createDashboardEntity('PRODUCT-AAA'),
          createDashboardEntity('PRODUCT-BBB'),
          createDashboardEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: getDashboardId,
          latestForCountry: latestForCountryData,
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  it('getDashboardLoaded() should return loaded', () => {
    const result: boolean = getDashboardLoaded(state);

    expect(result).toBe(true);
  });

  it('getDashboardError() should return error', () => {
    const result: string = getDashboardError(state);

    expect(result).toBe(ERROR_MSG);
  });

  it('getLatestForCountry() should return error', () => {
    const result = getLatestForCountry(state);

    expect(result).toBe(latestForCountryData);
  });

  it('getLatestTimeSeries() should return error', () => {
    const result = getLatestTimeSeries(state);

    expect(result).toStrictEqual(latestTimeSeriesData);
  });

  it('getDailyInfected() should return error', () => {
    const result = getDailyInfected(state);

    expect(result).toStrictEqual(dailyInfectedData);
  });

  it('getConfirmed() should return confirmed', () => {
    const result = getConfirmed(state);

    expect(result).toStrictEqual(confirmedData);
  });
});
