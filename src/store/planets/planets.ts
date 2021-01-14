import {Reducer} from 'redux';
import {put, takeEvery} from 'redux-saga/effects';

import {IPlanet, IPlanetRaw, IResponse} from '~/types';
import {swapi} from '~/store';
import {compareByProp} from '~/services/utils';
import {setError, setLoaded, setLoading} from '../common';

// Actions
export enum PlanetsActions {
  PLANETS_GET = 'planets/GET',
  PLANETS_GET_SUCCESS = 'planets/GET_SUCCESS',
  PLANETS_GET_BY_IDX = 'planets/GET_BY_IDX',
  PLANETS_SET_SELECTED = 'planets/PLANETS_SET_SELECTED',
  PLANETS_RESET = 'planets/RESET',
}

export type PlanetsLoadableT =
  | typeof PlanetsActions.PLANETS_GET
  | typeof PlanetsActions.PLANETS_GET_BY_IDX;

export interface IPlanetGetAction {
  type: typeof PlanetsActions.PLANETS_GET;
  payload?: {page: number} & Record<string, string | number>;
}

export interface IPlanetGetSuccessAction {
  type: typeof PlanetsActions.PLANETS_GET_SUCCESS;
  payload: IResponse<IPlanet> & {page: number | null};
}

export interface IPlanetGetByIdxAction {
  type: typeof PlanetsActions.PLANETS_GET_BY_IDX;
  payload: number;
}

export interface IPlanetSetSelectedAction {
  type: typeof PlanetsActions.PLANETS_SET_SELECTED;
  payload: IPlanet | null;
}

export interface IResetPlanetsAction {
  type: typeof PlanetsActions.PLANETS_RESET;
}

type PlanetsActionsT =
  | IPlanetGetAction
  | IPlanetGetSuccessAction
  | IPlanetGetByIdxAction
  | IPlanetSetSelectedAction
  | IResetPlanetsAction;

export const getPlanetsAction = (
  payload?: {page: number} & Record<string, string | number>,
): IPlanetGetAction => ({
  type: PlanetsActions.PLANETS_GET,
  payload,
});

export const getPlanetsSuccessAction = (
  payload: IResponse<IPlanet> & {page: number | null},
): IPlanetGetSuccessAction => ({
  type: PlanetsActions.PLANETS_GET_SUCCESS,
  payload,
});

export const getPlanetsByIdxAction = (payload: number): IPlanetGetByIdxAction => ({
  type: PlanetsActions.PLANETS_GET_BY_IDX,
  payload,
});

export const setSelectedPlanetAction = (payload: IPlanet | null): IPlanetSetSelectedAction => ({
  type: PlanetsActions.PLANETS_SET_SELECTED,
  payload,
});

export const resetPlanetsAction = (): IResetPlanetsAction => ({
  type: PlanetsActions.PLANETS_RESET,
});

//Reducer
export interface IPlanetState {
  page: number | null;
  count: number;
  next: string | null;
  previous: string | null;
  list: IPlanet[];
  selected: IPlanet | null;
}

export type PlanetsStateT = Readonly<IPlanetState>;

const initialState: IPlanetState = {
  page: null,
  count: 0,
  next: null,
  previous: null,
  list: [],
  selected: null,
};

const reducer: Reducer<PlanetsStateT> = (
  state: IPlanetState = initialState,
  action: PlanetsActionsT,
) => {
  switch (action.type) {
    case PlanetsActions.PLANETS_GET_SUCCESS: {
      const {count, results, ...rest} = action.payload;
      const length = state.list.length;
      const newList: IPlanet[] = results.map((val, idx) => ({...val, idx: length + idx}));
      const list: IPlanet[] = [...state.list, ...newList].sort((a, b) =>
        compareByProp(a, b, 'name'),
      );
      return {
        ...state,
        count: state.count + count,
        list,
        ...rest,
      };
    }

    case PlanetsActions.PLANETS_SET_SELECTED: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case PlanetsActions.PLANETS_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

function* sagaGetPlanets({payload}: IPlanetGetAction) {
  const actionType = PlanetsActions.PLANETS_GET;
  try {
    yield put(setLoading({actionType}));
    const res: IResponse<IPlanet> = yield swapi.planetsApi.getPlanets(payload); // todo
    if (res) {
      yield put(getPlanetsSuccessAction({...res, page: payload?.page || null}));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

function* sagaSetSelectedPlanets({payload}: IPlanetGetByIdxAction) {
  const actionType = PlanetsActions.PLANETS_GET_BY_IDX;
  try {
    yield put(setLoading({actionType}));
    const res: IPlanetRaw = yield swapi.planetsApi.getPlanetByIdx(payload); // todo
    if (res) {
      yield put(setSelectedPlanetAction({...res, idx: payload}));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

export function* saga(): Generator {
  yield takeEvery(PlanetsActions.PLANETS_GET, sagaGetPlanets);
  yield takeEvery(PlanetsActions.PLANETS_GET_BY_IDX, sagaSetSelectedPlanets);
}
