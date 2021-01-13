import {shallowEqual, useSelector} from 'react-redux';

import {IAppState} from '~/store';

export const useCommonByAction = (action: string) => {
  const loading = useSelector((state: IAppState) => state.common.loading, shallowEqual)[action];
  const loaded = useSelector((state: IAppState) => state.common.loaded, shallowEqual)[action];
  const apiErrorObj = useSelector((state: IAppState) => state.common.error, shallowEqual)[action];
  let apiErrorMessage = apiErrorObj?.message || '';
  return {loading, loaded, apiErrorMessage};
};
