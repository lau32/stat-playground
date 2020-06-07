import { createAction, props } from '@ngrx/store';
import { DashboardEntity } from './dashboard.models';

export const loadDashboard = createAction('[Dashboard] Load Dashboard',
  props<{ payload: { countryCode: string } }>()
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: DashboardEntity[] }>()
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: any }>()
);
