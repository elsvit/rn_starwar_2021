import React from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {getPeopleAction, getPeopleByIdxAction} from '~/store/people';

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPeopleAction());
    dispatch(getPeopleByIdxAction(1));
  }, []);

  return (
    <View>
      <Text>Main Screen</Text>
    </View>
  );
};

export default Main;
