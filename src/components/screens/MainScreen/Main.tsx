import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {IAppState} from '~/store';
import {getPeopleAction, PeopleActions} from '~/store/people';
import {getPlanetsAction, PlanetsActions} from '~/store/planets';
import {getVehiclesAction, VehiclesActions} from '~/store/vehicles';
import {useCommonByAction} from '~/services/utils';
import MainView from './MainView';
import {IPeople, IPlanet, IVehicle, ListType, RootStackNavigation, Screen} from '~/types';

export interface INameIdx {
  name: string;
  idx: number;
}

export interface IListBlock {
  title: string;
  type: ListType;
  data: INameIdx[];
}

type Props = {
  navigation: RootStackNavigation;
};

const Main = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const peopleList = useSelector((state: IAppState) => state.people?.list);
  const peoplePage = useSelector((state: IAppState) => state.people?.page);
  const planetsList = useSelector((state: IAppState) => state.planets?.list);
  const planetsPage = useSelector((state: IAppState) => state.planets?.page);
  const vehiclesList = useSelector((state: IAppState) => state.vehicles?.list);
  const vehiclesPage = useSelector((state: IAppState) => state.vehicles?.page);
  const {loading: isPeopleLoading, apiErrorMessage: errorGetPeople} = useCommonByAction(
    PeopleActions.PEOPLE_GET,
  );
  const {loading: isPlanetsLoading, apiErrorMessage: errorGetPlanets} = useCommonByAction(
    PlanetsActions.PLANETS_GET,
  );
  const {loading: isVehiclesLoading, apiErrorMessage: errorGetVehicles} = useCommonByAction(
    VehiclesActions.VEHICLES_GET,
  );

  const [list, setList] = useState<IListBlock[]>([]);
  const [searchedValue, setSearchedValue] = useState<string>('');

  const filteredList = (val: string) => {
    const peopleData: INameIdx[] = peopleList
      .map((el: IPeople) => ({name: el?.name || '', idx: el.idx}))
      .filter((el) => el.name.toLowerCase().includes(val.toLowerCase()));
    const newPeopleList: IListBlock = {title: 'People', type: ListType.People, data: peopleData};

    const planetsData: INameIdx[] = planetsList
      .map((el: IPlanet) => ({name: el?.name || '', idx: el.idx}))
      .filter((el) => el.name.toLowerCase().includes(val.toLowerCase()));
    const newPlanetsList: IListBlock = {
      title: 'Planets',
      type: ListType.Planets,
      data: planetsData,
    };

    const vehiclesData: INameIdx[] = vehiclesList
      .map((el: IVehicle) => ({name: el?.name || '', idx: el.idx}))
      .filter((el) => el.name.toLowerCase().includes(val.toLowerCase()));
    const newVehiclesList: IListBlock = {
      title: 'Vehicles',
      type: ListType.Vehicles,
      data: vehiclesData,
    };
    setList([newPeopleList, newPlanetsList, newVehiclesList]);
  };

  useEffect(() => {
    filteredList(searchedValue);
  }, [peopleList, planetsList, vehiclesList]);

  useEffect(() => {
    dispatch(getPeopleAction({page: 1}));
    dispatch(getPlanetsAction({page: 1}));
    dispatch(getVehiclesAction({page: 1}));
  }, []);

  const onItemPress = (type: ListType, idx: number, name: string) => {
    navigation.navigate(Screen.Detail, {type, index: idx + 1, name});
  };

  const onLoadMorePress = (type: ListType) => {
    switch (type) {
      case ListType.People: {
        if (!isPeopleLoading) {
          dispatch(getPeopleAction({page: (peoplePage || 0) + 1}));
        }
        break;
      }
      case ListType.Planets: {
        if (!isPlanetsLoading) {
          dispatch(getPlanetsAction({page: (planetsPage || 0) + 1}));
        }
        break;
      }
      case ListType.Vehicles: {
        if (!isVehiclesLoading) {
          dispatch(getVehiclesAction({page: (vehiclesPage || 0) + 1}));
        }
        break;
      }
    }
  };

  const search = (val: string) => {
    setSearchedValue(val);
    filteredList(val);
  };

  return (
    <MainView
      list={list}
      searchedValue={searchedValue}
      search={search}
      onItemPress={onItemPress}
      onLoadMorePress={onLoadMorePress}
    />
  );
};

export default Main;
