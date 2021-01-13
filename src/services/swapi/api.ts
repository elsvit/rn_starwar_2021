import BaseApi from './BaseApi';
import PeopleApi from './PeopleApi';
import PlanetsApi from './PlanetsApi';
import VehiclesApi from './VehiclesApi';

export interface ISwapiServices {
  baseApi: BaseApi;
  peopleApi: PeopleApi;
  planetsApi: PlanetsApi;
  vehiclesApi: VehiclesApi;
}

export function initSwapiServices(baseURL: string): ISwapiServices {
  const baseApi = new BaseApi(baseURL);
  const peopleApi = new PeopleApi(baseApi);
  const planetsApi = new PlanetsApi(baseApi);
  const vehiclesApi = new VehiclesApi(baseApi);

  return {
    baseApi,
    peopleApi,
    planetsApi,
    vehiclesApi,
  };
}
