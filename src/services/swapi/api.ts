import BaseApi from './BaseApi';
import PeopleApi from './PeopleApi';

export interface ISwapiServices {
  baseApi: BaseApi;
  peopleApi: PeopleApi;
}

export function initSwapiServices(baseURL: string): ISwapiServices {
  const baseApi = new BaseApi(baseURL);
  const peopleApi = new PeopleApi(baseApi);

  return {
    baseApi,
    peopleApi,
  };
}
