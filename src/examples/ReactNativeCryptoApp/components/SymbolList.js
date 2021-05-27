import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { List, ListSectionHeader } from 'react-native-base-components/src/list';
import { Label3 } from 'react-native-base-components/src/text';

import actions from '../actions';
import withLoadingView from '../helpers/withLoadingView';
import SymbolItem from './SymbolItem';

const ListWithLoadingView = withLoadingView(Animated.SectionList, { label: 'symbols' });

class SymbolList extends React.Component {
  componentDidMount() {
    actions.fetchSymbols(this.props.symbol.watchlist);
    actions.subscribeSymbolsPrice(this.props.symbol.watchlist);
  }

  render() {
    return (
      <List
        items={[{ data: this.props.symbol.symbols }]}
        overrides={{
          List: {
            component: ListWithLoadingView,
            props: {
              style: { height: '100%' },
              renderSectionHeader: ({ sction }) => (
                <ListSectionHeader
                  overrides={{
                    Root: { style: { justifyContent: 'space-between' } },
                  }}
                >
                  <Label3 color="contentTertiary">Watchlist</Label3>
                  <Label3 color="contentTertiary">24HR</Label3>
                </ListSectionHeader>
              )
            },
          },
          ListItem: {
            component: SymbolItem,
          },
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  symbol: state.symbol,
});

export default connect(mapStateToProps)(SymbolList);