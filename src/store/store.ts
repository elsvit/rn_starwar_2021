import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import common, {CommonStateT} from './common';
import data, {DataStateT} from './data';

import sagas from './sagas';

export interface IAppState {
  common: CommonStateT;
  data: DataStateT;
}

const reducers = combineReducers<IAppState>({
  common,
  data,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export default store;
