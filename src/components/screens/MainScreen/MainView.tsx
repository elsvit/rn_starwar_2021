import * as React from 'react';
import {View, SectionList, TouchableOpacity, Text, SectionListProps} from 'react-native';
import styled from 'styled-components';
// import {IAdvanceStat} from 'types';

import {COLOR, FONT} from '~/constants/styles';
import {SafeAreaBackground, ScreenHeader} from '~/components/blocks';
import {Typography, Button, SvgButton, SearchInput} from '~/components/ui';
import {IListBlock} from './Main';
import {ListType} from '~/types';

interface IMainViewProps {
  list: IListBlock[];
  searchedValue: string;
  search: (val: string) => void;
  onItemPress: (type: ListType, idx: number) => void;
  onLoadMorePress: (type: ListType) => void;
}

const MainView = ({list, searchedValue, search, onItemPress, onLoadMorePress}: IMainViewProps) => {
  const renderItem = ({
    item,
    index,
    section: {type},
  }: {
    item: string;
    index: number;
    section: {type: ListType};
  }) => {
    return (
      <ItemWrapper>
        <Typography fontSize={FONT.SIZE.fs16} color={COLOR.grey}>
          {item}
        </Typography>
        <ItemButton onPress={() => onItemPress(type, index)}>
          <Typography fontSize={FONT.SIZE.fs10} color={COLOR.white}>
            VIEW
          </Typography>
        </ItemButton>
      </ItemWrapper>
    );
  };

  const renderSectionTitle = ({
    section: {type, title},
  }: {
    section: {type: ListType; title: string};
  }) => {
    return (
      <ItemWrapper>
        <Typography fontSize={FONT.SIZE.fs20} color={COLOR.lavenderBlue}>
          {title}
        </Typography>
        <ItemButton
          onPress={() => onLoadMorePress(type)}
          style={{backgroundColor: COLOR.lavenderBlue}}>
          <Typography fontSize={FONT.SIZE.fs10} color={COLOR.white}>
            LOAD MORE
          </Typography>
        </ItemButton>
      </ItemWrapper>
    );
  };

  return (
    <SafeAreaBackground>
      <ScreenHeader title={'Star Wars List'} color={COLOR.white} />

      <SearchWrapper>
        <StyledSearch value={searchedValue} onChangeText={search} />
      </SearchWrapper>

      <ListWrapper>
        <SectionList
          sections={list}
          keyExtractor={(item, index) => item + index}
          renderItem={(props) => renderItem(props)}
          renderSectionHeader={(props) => renderSectionTitle(props)}
        />
      </ListWrapper>
    </SafeAreaBackground>
  );
};

const StyledSearch = styled(SearchInput)`
  margin-horizontal: 16px;
`;
const SearchWrapper = styled(View)`
  margin-horizontal: 16px;
`;
const ListWrapper = styled(View)`
  flex: 1;
  min-height: 300px;
  width: 100%;
  padding: 16px;
`;

const ItemWrapper = styled(View)`
  flex-direction: row;
  overflow: hidden;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  align-items: center;
`;

const ItemButton = styled(TouchableOpacity)`
  height: 16px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-width: 1px;
  background-color: ${COLOR.red};
  margin-left: 8px;
`;

export default MainView;
