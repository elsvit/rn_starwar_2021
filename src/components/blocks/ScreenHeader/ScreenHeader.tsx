import React from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity, ViewStyle} from 'react-native';

import {COLOR, SIZE} from '~/constants/style';
import {DEVICE} from '~/constants/device';
import {SvgButton} from '~/components/ui';
import {ArrowLeftIcon} from '~/assets/icons';
import {SvgProps} from 'react-native-svg';

export interface IScreenHeaderProps {
  TitleIcon?: React.FC<SvgProps>;
  bgColor?: string;
  color?: string;
  leftLabel?: string;
  SvgIcon?: React.FC<SvgProps>;
  onLeftPress?: () => void;
  leftColor?: string;
  style?: ViewStyle;
  insideWrapperStyle?: any;
}

export default function ScreenHeader({
  TitleIcon,
  bgColor,
  color = COLOR.white,
  leftLabel,
  onLeftPress,
  SvgIcon = ArrowLeftIcon,
  leftColor,
  style,
  insideWrapperStyle,
}: IScreenHeaderProps) {
  return (
    <Wrapper
      style={{
        backgroundColor: bgColor,
        ...style,
      }}>
      <InsideWrapper style={insideWrapperStyle}>
        {onLeftPress ? (
          <StyledButton activeOpacity={0} onPress={onLeftPress}>
            <SvgButton
              SvgIcon={SvgIcon}
              onPress={onLeftPress}
              title={leftLabel || ''}
              color={leftColor || color}
            />
          </StyledButton>
        ) : (
          <BtnsEmptyContainer />
        )}

        <TitleWrapper style={{flex: 1}}>
          <TitleIcon width={150} height={35} />
        </TitleWrapper>

        <StyledButton activeOpacity={0} style={{alignItems: 'flex-end'}} />
      </InsideWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  width: 100%;
  padding: 49px 16px 16px;
  padding-top: ${DEVICE.statusBarHeight + 12}px;
`;

const InsideWrapper = styled(View)`
  width: 100%;
  height: ${SIZE.screenHeaderHeight}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled(View)`
  flex: 1;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const BtnsEmptyContainer = styled(View)`
  flex: 1;
  width: 56px;
  max-width: 15%;
`;
const StyledButton = styled(TouchableOpacity)`
  flex: 1;
  width: 60px;
  max-width: 15%;
  height: ${SIZE.screenHeaderHeight}px;
  opacity: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
