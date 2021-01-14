import * as React from 'react';
import {View, SectionList} from 'react-native';
import styled from 'styled-components';

import {COLOR, FONT} from '~/constants/styles';
import {SafeAreaBackground, ScreenHeader} from '~/components/blocks';
import {Typography, ItemButton, SearchInput} from '~/components/ui';
import {IListBlock, INameIdx} from './Main';
import {ListType} from '~/types';

interface IMainViewProps {
  list: IListBlock[];
  searchedValue: string;
  search: (val: string) => void;
  onItemPress: (type: ListType, idx: number, name: string) => void;
  onLoadMorePress: (type: ListType) => void;
}

const MainView = ({list, searchedValue, search, onItemPress, onLoadMorePress}: IMainViewProps) => {
  const renderItem = ({item, section: {type}}: {item: INameIdx; section: {type: ListType}}) => {
    const onPress = () => onItemPress(type, item.idx, item.name);
    return (
      <ItemWrapper>
        <Typography fontSize={FONT.SIZE.fs16} color={COLOR.grey}>
          {item.name}
        </Typography>
        <ItemButton label={'VIEW'} onPress={onPress} />
      </ItemWrapper>
    );
  };

  const renderSectionTitle = ({
    section: {type, title},
  }: {
    section: {type: ListType; title: string};
  }) => {
    const onPress = () => onLoadMorePress(type);
    return (
      <ItemWrapper>
        <Typography fontSize={FONT.SIZE.fs20} color={COLOR.lavenderBlue}>
          {title}
        </Typography>
        <ItemButton label={'LOAD MORE'} onPress={onPress} bgColor={COLOR.lavenderBlue} />
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
          keyExtractor={(item, index) => item.name + index}
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

export default MainView;
