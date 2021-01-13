import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {IAppState} from '~/store';
import {getPeopleAction, getPeopleByIdxAction} from '~/store/people';
import MainView from './MainView';
import {IPeople, ListType} from '~/types';

export interface IListBlock {
  title: string;
  type: ListType;
  data: string[];
}

const Main = () => {
  const dispatch = useDispatch();

  const peopleList = useSelector((state: IAppState) => state.people?.list);

  const [list, setList] = useState<IListBlock[]>([]);
  const [searchedValue, setSearchedValue] = useState<string>('');

  useEffect(() => {
    const data: string[] = peopleList.map((val: IPeople) => val.name || '');
    const newList: IListBlock = {title: 'People', type: ListType.People, data};
    setList([newList]);
  }, [peopleList]);

  useEffect(() => {
    dispatch(getPeopleAction());
    dispatch(getPeopleByIdxAction(1));
  }, []);

  const onItemPress = (type: ListType, idx: number) => {
    console.log('onItemPress39', type, '/', idx);
  };

  const search = (val: string) => {
    setSearchedValue(val);
    const data: string[] = peopleList
      .map((val: IPeople) => val.name || '')
      .filter((str) => str.toLowerCase().includes(val.toLowerCase()));
    const newPeopleList: IListBlock = {title: 'People', type: ListType.People, data};
    setList([newPeopleList]);
  };

  return (
    <MainView list={list} searchedValue={searchedValue} search={search} onItemPress={onItemPress} />
  );
};

export default Main;
