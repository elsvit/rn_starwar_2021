import {Reducer} from 'redux';
import {put, takeEvery} from 'redux-saga/effects';

import {IPeople, IPeopleRaw, IResponse} from '~/types';
import {swapi} from '~/store';
import {setError, setLoaded, setLoading} from '../common';

// Actions
export enum PeopleActions {
  PEOPLE_GET = 'people/GET',
  PEOPLE_GET_SUCCESS = 'people/GET_SUCCESS',
  PEOPLE_GET_BY_IDX = 'people/GET_BY_IDX',
  PEOPLE_SET_SELECTED = 'people/PEOPLE_SET_SELECTED',
  PEOPLE_RESET = 'people/RESET',
}

export type PeopleLoadableT =
  | typeof PeopleActions.PEOPLE_GET
  | typeof PeopleActions.PEOPLE_GET_BY_IDX;

export interface IPeopleGetAction {
  type: typeof PeopleActions.PEOPLE_GET;
}

export interface IPeopleGetSuccessAction {
  type: typeof PeopleActions.PEOPLE_GET_SUCCESS;
  payload: IResponse<IPeople>;
}

export interface IPeopleGetByIdxAction {
  type: typeof PeopleActions.PEOPLE_GET_BY_IDX;
  payload: number;
}

export interface IPeopleSetSelectedAction {
  type: typeof PeopleActions.PEOPLE_SET_SELECTED;
  payload: IPeople;
}

export interface IResetPeopleAction {
  type: typeof PeopleActions.PEOPLE_RESET;
}

type PeopleActionsT =
  | IPeopleGetAction
  | IPeopleGetSuccessAction
  | IPeopleGetByIdxAction
  | IPeopleSetSelectedAction
  | IResetPeopleAction;

export const getPeopleAction = (): IPeopleGetAction => ({
  type: PeopleActions.PEOPLE_GET,
});

export const getPeopleSuccessAction = (payload: IResponse<IPeople>): IPeopleGetSuccessAction => ({
  type: PeopleActions.PEOPLE_GET_SUCCESS,
  payload,
});

export const getPeopleByIdxAction = (payload: number): IPeopleGetByIdxAction => ({
  type: PeopleActions.PEOPLE_GET_BY_IDX,
  payload,
});

export const setSelectedPeopleAction = (payload: IPeople): IPeopleSetSelectedAction => ({
  type: PeopleActions.PEOPLE_SET_SELECTED,
  payload,
});

export const resetPeopleAction = (): IResetPeopleAction => ({
  type: PeopleActions.PEOPLE_RESET,
});

//Reducer
export interface IPeopleState {
  page: number | null;
  count: number;
  next: string | null;
  previous: string | null;
  list: IPeople[];
  selected: IPeople | null;
}

export type PeopleStateT = Readonly<IPeopleState>;

const initialState: IPeopleState = {
  page: null,
  count: 0,
  next: null,
  previous: null,
  list: [],
  selected: null,
};

const reducer: Reducer<PeopleStateT> = (
  state: IPeopleState = initialState,
  action: PeopleActionsT,
) => {
  switch (action.type) {
    case PeopleActions.PEOPLE_GET_SUCCESS: {
      const {count, results, ...rest} = action.payload;
      return {
        ...state,
        count: state.count + count,
        list: [...state.list, ...results],
        ...rest,
      };
    }

    case PeopleActions.PEOPLE_SET_SELECTED: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case PeopleActions.PEOPLE_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

function* sagaGetPeople() {
  const actionType = PeopleActions.PEOPLE_GET;
  try {
    yield put(setLoading({actionType}));
    const res: IResponse<IPeople> = yield swapi.peopleApi.getPeople(); // todo
    if (res) {
      yield put(getPeopleSuccessAction(res));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

function* sagaSetSelectedPeople({payload}: IPeopleGetByIdxAction) {
  const actionType = PeopleActions.PEOPLE_GET_BY_IDX;
  try {
    yield put(setLoading({actionType}));
    const res: IPeople = yield swapi.peopleApi.getPeopleByIdx(payload); // todo
    if (res) {
      yield put(setSelectedPeopleAction(res));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

export function* saga(): Generator {
  yield takeEvery(PeopleActions.PEOPLE_GET, sagaGetPeople);
  yield takeEvery(PeopleActions.PEOPLE_GET_BY_IDX, sagaSetSelectedPeople);
}
