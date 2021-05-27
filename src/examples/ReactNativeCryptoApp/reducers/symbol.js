import produce from 'immer';
import { handleActions } from 'redux-actions';

const initialState = {
  symbols: [],
  // mock
  watchlist: [
    'bitcoin',
    'cosmos',
    'tezos',
    'stellar',
    'tron',
    'cardano',
    'monero',
    'huobi',
    'chainlink',
    'neo',
    'usd',
    'ethereum',
    'iota',
    'maker',
    'dash',
    'ontology',
    'vechain',
    'nem',
    'basic',
    'dogecoin',
    'paxos',
    'zcash',
    'decred',
    'trueusd',
    'qtum',
    'ravencoin',
    'algorand',
    '0x',
    'seele',
    'waves',
    'holo',
    'dai',
    'augur',
    'nano',
    'omisego',
    'abbc',
    'lisk',
    'bytom',
    'zencash',
    'crypto',
    'enjin',
    'theta',
    'komodo',
    'icon',
    'iostoken',
    'verge',
    'siacoin',
    'nexo',
    'v',
    'monacoin',
    'hypercash',
    'dxchain',
    'zilliqa',
    'steem',
    'bitshares',
    'aeternity',
    'digixdao',
    'decentraland',
    'rlc',
    'status',
    'kyber',
    'stratis',
    'tomochain',
    'enigma',
    'crypterium',
    'grin',
    'golem',
    'metaverse',
    'zcoin',
    'aelf',
    'elastos',
    'gxchain',
    'ripio',
    'funfair',
    'ethlend',
    'loopring',
    'tierion',
    'populous',
    'aion',
    'nebulas',
    'iotex',
    'wanchain',
    'nuls',
    'truechain',
    'ark',
    'bancor',
    'telcoin',
    'power',
    'loom',
    'waltonchain',
  ],
};

export default handleActions({
  SET_SYMBOLS: (state, action) => {
    return produce(state, draftState => {
      draftState.symbols = action.symbols;
    });
  },
  UPDATE_SYMBOLS_PRICE: (state, action) => {
    const prices = action.prices;
    return produce(state, draftState => {
      draftState.symbols.forEach(symbol => {
        symbol.priceUsd = prices[symbol.id]
          ? Number(prices[symbol.id]).toFixed(2)
          : symbol.priceUsd;
      });
    });
  },
}, initialState);