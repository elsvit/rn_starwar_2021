import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {IAppState} from '~/store';
import {getPeopleAction, getPeopleByIdxAction, PeopleActions} from '~/store/people';
import {getPlanetsAction, getPlanetsByIdxAction, PlanetsActions} from '~/store/planets';
import {getVehiclesAction, VehiclesActions} from '~/store/vehicles';
import {useCommonByAction} from '~/services/utils';
import MainView from './MainView';
import {IPeople, IPlanet, IVehicle, ListType} from '~/types';

export interface IListBlock {
  title: string;
  type: ListType;
  data: string[];
}

const Main = () => {
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

  useEffect(() => {
    const peopleData: string[] = peopleList.map((val: IPeople) => val.name || '');
    const newPeopleList: IListBlock = {title: 'People', type: ListType.People, data: peopleData};
    const planetsData: string[] = planetsList.map((val: IPlanet) => val.name || '');
    const newPlanetsList: IListBlock = {
      title: 'Planets',
      type: ListType.Planets,
      data: planetsData,
    };
    const vehiclesData: string[] = vehiclesList.map((val: IVehicle) => val.name || '');
    const newVehiclesList: IListBlock = {
      title: 'Vehicles',
      type: ListType.Vehicles,
      data: vehiclesData,
    };
    setList([newPeopleList, newPlanetsList, newVehiclesList]);
  }, [peopleList]);

  useEffect(() => {
    dispatch(getPeopleAction({page: 1}));
    dispatch(getPlanetsAction({page: 1}));
    dispatch(getVehiclesAction({page: 1}));
    dispatch(getPeopleByIdxAction(1));
  }, []);

  const onItemPress = (type: ListType, idx: number) => {
    console.log('onItemPress39', type, '/', idx);
  };

  const onLoadMorePress = (type: ListType) => {
    switch (type) {
      case ListType.People: {
        if (!isPeopleLoading) {
          dispatch(getPeopleAction({page: (peoplePage || 0) + 1}));
        }
      }
      case ListType.Planets: {
        if (!isPlanetsLoading) {
          dispatch(getPlanetsAction({page: (planetsPage || 0) + 1}));
        }
      }
      case ListType.Vehicles: {
        if (!isVehiclesLoading) {
          dispatch(getVehiclesAction({page: (vehiclesPage || 0) + 1}));
        }
      }
    }
  };

  const search = (val: string) => {
    setSearchedValue(val);
    const peopleData: string[] = peopleList
      .map((val: IPeople) => val?.name || '')
      .filter((str) => str.toLowerCase().includes(val.toLowerCase()));
    const newPeopleList: IListBlock = {title: 'People', type: ListType.People, data: peopleData};
    const planetsData: string[] = planetsList
      .map((val: IPlanet) => val?.name || '')
      .filter((str) => str.toLowerCase().includes(val.toLowerCase()));
    const newPlanetsList: IListBlock = {
      title: 'Planets',
      type: ListType.Planets,
      data: planetsData,
    };
    const vehiclesData: string[] = vehiclesList
      .map((val: IVehicle) => val?.name || '')
      .filter((str) => str.toLowerCase().includes(val.toLowerCase()));
    const newVehiclesList: IListBlock = {
      title: 'Vehicles',
      type: ListType.Vehicles,
      data: vehiclesData,
    };
    setList([newPeopleList, newPlanetsList, newVehiclesList]);
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
