// export interface ILoadableBooleanDict {
//   [actionType: string]: Maybe<boolean>;
// }
// export interface ILoadableStringDict {
//   [actionType: string]: Maybe<string>;
// }

export interface IId {
  id: string;
}

export interface IIdName extends IId {
  name: string;
}

export interface IResponse<T> {
  data: T;
}

export interface IOption {
  value: string;
  label: string;
}

export interface IBoolDict {
  [key: string]: boolean | null | undefined;
}
