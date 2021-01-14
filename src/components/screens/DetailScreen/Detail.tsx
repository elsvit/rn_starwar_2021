import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

import {IAppState} from '~/store';
import {getPeopleByIdxAction, PeopleActions, setSelectedPeopleAction} from '~/store/people';
import {getPlanetsByIdxAction, PlanetsActions, setSelectedPlanetAction} from '~/store/planets';
import {getVehiclesByIdxAction, setSelectedVehicleAction, VehiclesActions} from '~/store/vehicles';
import {useCommonByAction} from '~/services/utils';
import DetailView from './DetailView';
import {
  IPeople,
  IPlanet,
  IVehicle,
  ListType,
  RootStackNavigation,
  Screen,
  RootStackParamList,
} from '~/types';

type Props = {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, Screen.Detail>;
};

const Detail = ({navigation, route}: Props) => {
  const dispatch = useDispatch();

  const {type, index, name} = route?.params || {};

  const details: IPeople | IPlanet | IVehicle | null = useSelector((state: IAppState) => {
    switch (type) {
      case ListType.People: {
        return state.people?.selected || null;
      }
      case ListType.Planets: {
        return state.planets?.selected || null;
      }
      case ListType.Vehicles: {
        return state.vehicles?.selected || null;
      }
      default:
        return null;
    }
  });

  const {loading: isPeopleLoading, apiErrorMessage: errorGetPeople} = useCommonByAction(
    PeopleActions.PEOPLE_GET_BY_IDX,
  );
  const {loading: isPlanetsLoading, apiErrorMessage: errorGetPlanet} = useCommonByAction(
    PlanetsActions.PLANETS_GET_BY_IDX,
  );
  const {loading: isVehiclesLoading, apiErrorMessage: errorGetVehicle} = useCommonByAction(
    VehiclesActions.VEHICLES_GET_BY_IDX,
  );

  useEffect(() => {
    switch (type) {
      case ListType.People: {
        dispatch(getPeopleByIdxAction(index));
        break;
      }
      case ListType.Planets: {
        dispatch(getPlanetsByIdxAction(index));
        break;
      }
      case ListType.Vehicles: {
        dispatch(getVehiclesByIdxAction(index));
        break;
      }
    }
    return () => {
      switch (type) {
        case ListType.People: {
          dispatch(setSelectedPeopleAction(null));
          break;
        }
        case ListType.Planets: {
          dispatch(setSelectedPlanetAction(null));
          break;
        }
        case ListType.Vehicles: {
          dispatch(setSelectedVehicleAction(null));
          break;
        }
      }
    };
  }, [type, index]);

  const onBackPress = () => {
    navigation.goBack();
  };

  return <DetailView type={type} data={details} name={name} onBackPress={onBackPress} />;
};

export default Detail;
