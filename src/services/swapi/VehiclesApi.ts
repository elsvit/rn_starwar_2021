import BaseApi from './BaseApi';

export default class VehiclesApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getVehicles = (value?: Record<string, string | number>) =>
    this.baseApi.get('vehicles/', value);

  public getVehicleByIdx = (idx: number) => this.baseApi.get(`vehicles/${idx}`);
}
