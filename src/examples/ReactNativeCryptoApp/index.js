import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-base-components/src/header';
import { withStyled } from 'react-native-base-components/';
import SymbolList from './components/SymbolList';

const App = withStyled(({ theme }) => (
  <View style={{ backgroundColor: theme.colors.background }}>
    <Header
      title="Crypto"
      overrides={{
        Root: { style: { position: 'relative' } },
        Content: { style: { paddingHorizontal: 24 } },
        TitleText: { style: { fontSize: 30 } },
        LeftItem: { component: () => null }
      }}
    />
    <SymbolList />
  </View>
));

export default App;