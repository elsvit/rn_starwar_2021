import {Reducer} from 'redux';
import {put, takeEvery} from 'redux-saga/effects';

import {IVehicle, IVehicleRaw, IResponse} from '~/types';
import {swapi} from '~/store';
import {compareByProp} from '~/services/utils';
import {setError, setLoaded, setLoading} from '../common';

// Actions
export enum VehiclesActions {
  VEHICLES_GET = 'vehicles/GET',
  VEHICLES_GET_SUCCESS = 'vehicles/GET_SUCCESS',
  VEHICLES_GET_BY_IDX = 'vehicles/GET_BY_IDX',
  VEHICLES_SET_SELECTED = 'vehicles/VEHICLES_SET_SELECTED',
  VEHICLES_RESET = 'vehicles/RESET',
}

export type VehiclesLoadableT =
  | typeof VehiclesActions.VEHICLES_GET
  | typeof VehiclesActions.VEHICLES_GET_BY_IDX;

export interface IVehicleGetAction {
  type: typeof VehiclesActions.VEHICLES_GET;
  payload?: {page: number} & Record<string, string | number>;
}

export interface IVehicleGetSuccessAction {
  type: typeof VehiclesActions.VEHICLES_GET_SUCCESS;
  payload: IResponse<IVehicle> & {page: number | null};
}

export interface IVehicleGetByIdxAction {
  type: typeof VehiclesActions.VEHICLES_GET_BY_IDX;
  payload: number;
}

export interface IVehicleSetSelectedAction {
  type: typeof VehiclesActions.VEHICLES_SET_SELECTED;
  payload: IVehicle;
}

export interface IResetVehiclesAction {
  type: typeof VehiclesActions.VEHICLES_RESET;
}

type VehiclesActionsT =
  | IVehicleGetAction
  | IVehicleGetSuccessAction
  | IVehicleGetByIdxAction
  | IVehicleSetSelectedAction
  | IResetVehiclesAction;

export const getVehiclesAction = (
  payload?: {page: number} & Record<string, string | number>,
): IVehicleGetAction => ({
  type: VehiclesActions.VEHICLES_GET,
  payload,
});

export const getVehiclesSuccessAction = (
  payload: IResponse<IVehicle> & {page: number | null},
): IVehicleGetSuccessAction => ({
  type: VehiclesActions.VEHICLES_GET_SUCCESS,
  payload,
});

export const getVehiclesByIdxAction = (payload: number): IVehicleGetByIdxAction => ({
  type: VehiclesActions.VEHICLES_GET_BY_IDX,
  payload,
});

export const setSelectedVehicleAction = (payload: IVehicle): IVehicleSetSelectedAction => ({
  type: VehiclesActions.VEHICLES_SET_SELECTED,
  payload,
});

export const resetVehiclesAction = (): IResetVehiclesAction => ({
  type: VehiclesActions.VEHICLES_RESET,
});

//Reducer
export interface IVehicleState {
  page: number | null;
  count: number;
  next: string | null;
  previous: string | null;
  list: IVehicle[];
  selected: IVehicle | null;
}

export type VehiclesStateT = Readonly<IVehicleState>;

const initialState: IVehicleState = {
  page: null,
  count: 0,
  next: null,
  previous: null,
  list: [],
  selected: null,
};

const reducer: Reducer<VehiclesStateT> = (
  state: IVehicleState = initialState,
  action: VehiclesActionsT,
) => {
  switch (action.type) {
    case VehiclesActions.VEHICLES_GET_SUCCESS: {
      const {count, results, ...rest} = action.payload;
      const list: IVehicle[] = [...state.list, ...results].sort((a, b) =>
        compareByProp(a, b, 'name'),
      );
      return {
        ...state,
        count: state.count + count,
        list,
        ...rest,
      };
    }

    case VehiclesActions.VEHICLES_SET_SELECTED: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case VehiclesActions.VEHICLES_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

function* sagaGetVehicles({payload}: IVehicleGetAction) {
  const actionType = VehiclesActions.VEHICLES_GET;
  try {
    yield put(setLoading({actionType}));
    const res: IResponse<IVehicle> = yield swapi.vehiclesApi.getVehicles(payload); // todo
    if (res) {
      yield put(getVehiclesSuccessAction({...res, page: payload?.page || null}));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

function* sagaSetSelectedVehicles({payload}: IVehicleGetByIdxAction) {
  const actionType = VehiclesActions.VEHICLES_GET_BY_IDX;
  try {
    yield put(setLoading({actionType}));
    const res: IVehicle = yield swapi.vehiclesApi.getVehicleByIdx(payload); // todo
    if (res) {
      yield put(setSelectedVehicleAction(res));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

export function* saga(): Generator {
  yield takeEvery(VehiclesActions.VEHICLES_GET, sagaGetVehicles);
  yield takeEvery(VehiclesActions.VEHICLES_GET_BY_IDX, sagaSetSelectedVehicles);
}
