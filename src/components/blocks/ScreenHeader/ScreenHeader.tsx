import React from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity, ViewStyle, Text} from 'react-native';

import {COLOR, SIZE, FONT} from '~/constants/styles';
import {DEVICE} from '~/constants/device';
import {SvgButton} from '~/components/ui';
import {ArrowLeftIcon} from '~/assets/icons';
import {SvgProps} from 'react-native-svg';

export interface IScreenHeaderProps {
  title?: string;
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
  title = '',
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
          <TitleLabel>{title}</TitleLabel>
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

const TitleLabel = styled(Text)`
  color: ${COLOR.black};
  line-height: ${FONT.SIZE.fs16 * 1.2}px;
  font-size: ${FONT.SIZE.fs16}px;
  font-weight: bold;
  text-align: center;
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
