export interface IResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IBoolDict {
  [key: string]: boolean | null | undefined;
}

export enum ListType {
  People = 'People',
}
