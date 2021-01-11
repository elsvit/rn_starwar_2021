import {Reducer} from 'redux';
import {put, takeEvery} from 'redux-saga/effects';

import {IData, IDataRaw} from '~/types';
import {setError, setLoaded, setLoading} from '../common';

// Actions
export enum DataActions {
  DATA_GET = 'data/GET',
  DATA_GET_SUCCESS = 'data/GET_SUCCESS',
  SET_SELECTED_DATA = 'data/SET_SELECTED_DATA',
  DATA_RESET = 'data/RESET',
}

export type DataLoadableT = typeof DataActions.DATA_GET;

export interface IDataGetAction {
  type: typeof DataActions.DATA_GET;
}

export interface IDataGetSuccessAction {
  type: typeof DataActions.DATA_GET_SUCCESS;
  payload: IDataRaw[];
}

export interface ISetSelectedDataAction {
  type: typeof DataActions.SET_SELECTED_DATA;
  payload: string[];
}

export interface IResetDataAction {
  type: typeof DataActions.DATA_RESET;
}

type DataActionsT =
  | IDataGetAction
  | IDataGetSuccessAction
  | ISetSelectedDataAction
  | IResetDataAction;

export const getDataAction = (): IDataGetAction => ({
  type: DataActions.DATA_GET,
});

export const getDataSuccessAction = (payload: IDataRaw[]): IDataGetSuccessAction => ({
  type: DataActions.DATA_GET_SUCCESS,
  payload,
});

export const setSelectedDataAction = (payload: string[]): ISetSelectedDataAction => ({
  type: DataActions.SET_SELECTED_DATA,
  payload,
});

export const resetDataAction = (): IResetDataAction => ({
  type: DataActions.DATA_RESET,
});

//Reducer
interface IDataState {
  data: IData[];
}

export type DataStateT = Readonly<IDataState>;

const initialState: IDataState = {
  data: [],
};

const reducer: Reducer<DataStateT> = (state: IDataState = initialState, action: DataActionsT) => {
  switch (action.type) {
    case DataActions.DATA_GET_SUCCESS: {
      return {...state, data: action.payload};
    }

    case DataActions.DATA_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

function* sagaGetData() {
  const actionType = DataActions.DATA_GET;
  try {
    yield put(setLoading({actionType}));
    // const res: IDataRaw[] = yield getStarWarList();
    // if (res) {
    //   yield put(getDataSuccessAction(res));
    // }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

export function* saga(): Generator {
  yield takeEvery(DataActions.DATA_GET, sagaGetData);
}
