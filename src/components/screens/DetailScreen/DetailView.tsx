import * as React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

import {COLOR, FONT} from '~/constants/styles';
import {Typography, ItemButton} from '~/components/ui';
import {SafeScrollView} from '~/components/blocks';
import {onLinkPress} from '~/services/utils';
import {ListType, IPeople, IPlanet, IVehicle} from '~/types';

type DataType = IPeople | IPlanet | IVehicle;

interface IMainViewProps {
  type: ListType;
  data: DataType | null;
  name: string;
  onBackPress: () => void;
}

const DetailView = ({type, data, name: propName, onBackPress}: IMainViewProps) => {
  if (data === null) {
    return (
      <SafeScrollView
        bgColor="transparent"
        screenHeaderProps={{
          title: propName || '',
          color: COLOR.black,
          onLeftPress: onBackPress,
          leftColor: COLOR.darkGrey,
        }}>
        <Wrapper>
          <Typography>Unknown details</Typography>
        </Wrapper>
      </SafeScrollView>
    );
  }
  const {name, url, idx, created, edited, ...rest} = data;
  const title = `${name || propName || 'Unknown'} (${type})`.substr(0, 40);

  const renderItem = (key: string) => {
    // @ts-ignore
    const value: string | string[] = data[key];
    const renderVal = (val: string) => {
      if (val.trim().substr(0, 4).toLowerCase() === 'http') {
        return (
          <ItemButtonWrapper>
            <ItemButton
              label={'web'}
              onPress={() => onLinkPress(val)}
              bgColor={COLOR.lavenderBlue}
              style={{marginLeft: 8}}
            />
          </ItemButtonWrapper>
        );
      }
      return (
        <Typography fontSize={FONT.SIZE.fs15} color={COLOR.darkGrey}>
          {val}
        </Typography>
      );
    };

    const renderArrayItems = (value: string[]) => value.map((val: string) => renderVal(val));

    const Label = Array.isArray(value) ? renderArrayItems(value) : renderVal(value);

    return (
      <ItemWrapper>
        <LabelWrapper>
          <Typography fontSize={FONT.SIZE.fs16} color={COLOR.lavenderBlue}>
            {key}
          </Typography>
        </LabelWrapper>
        <ValueWrapper>{Label}</ValueWrapper>
      </ItemWrapper>
    );
  };

  return (
    <SafeScrollView
      bgColor="transparent"
      screenHeaderProps={{
        title,
        color: COLOR.black,
        onLeftPress: onBackPress,
        leftColor: COLOR.darkGrey,
      }}>
      <Wrapper>{Object.keys(rest).map((key: string) => renderItem(key))}</Wrapper>
    </SafeScrollView>
  );
};

const Wrapper = styled(View)`
  flex: 1;
  min-height: 300px;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemWrapper = styled(View)`
  flex-direction: row;
  overflow: hidden;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  align-items: center;
`;

const LabelWrapper = styled(View)`
  width: 40%;
  padding-right: 4px;
  margin-right: 4px;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ValueWrapper = styled(View)`
  width: 60%;
  padding-left: 4px;
  margin-left: 4px;
  flex-direction: row;
`;

const ItemButtonWrapper = styled(View)`
  margin: 4px;
`;

export default DetailView;
