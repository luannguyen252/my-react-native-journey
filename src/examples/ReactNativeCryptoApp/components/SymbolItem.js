import React from 'react';
import { Label3 } from 'react-native-base-components/src/text';
import { ListItem, ListItemLabel } from 'react-native-base-components/src/list';

import LineSeries from './LineSeries';

const MemoSymbolItem = React.memo(({ item: symbol }) => (
  <ListItem
    overrides={{
      Content: {
        style: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 30,
          height: 80,
          alignItems: 'center',
        },
      }
    }}
  >
    <ListItemLabel
      description={(
        <Label3 color="contentSecondary">{symbol.vwap24Hr}</Label3>
      )}
    >
      {symbol.symbol} - USD
    </ListItemLabel>
    <LineSeries
      data={symbol.histories}
      width={120}
      height={45}
      contentInset={{ top: 2, bottom: 2 }}
      stroke={symbol.changePercent24Hr < 0 ? '#ed4369' : '#47fb9b'}
    />
    <ListItemLabel
      description={(
        <Label3 color={symbol.changePercent24Hr < 0 ? 'contentNegative' : 'contentPositive' }>
          {symbol.changePercent24Hr}%
        </Label3>
      )}
      overrides={{
        Root: { style: { alignItems: 'flex-end' } }
      }}
    >
      ${symbol.priceUsd}
    </ListItemLabel>
  </ListItem>
), (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});

export default MemoSymbolItem;