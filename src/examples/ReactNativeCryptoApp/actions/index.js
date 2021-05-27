import { bindActionCreators } from 'redux';
import { transformSymbolsFormat } from '../helpers/responseTransformers';
import store from '../store';

export const showNotification = message => ({
  type: 'SHOW_NOTIFICATION',
  message,
});

export const fetchSymbols = ids => ({
  type: 'FETCH_SYMBOLS',
  uri: '/v2/assets',
  label: 'symbols',
  ids,
  onSuccess: symbols => [
    { type: 'SET_SYMBOLS', symbols },
  ],
  transformResponse: transformSymbolsFormat,
})

export const subscribeSymbolsPrice = ids => ({
  type: 'SUBSCRIBE',
  uri: `/prices?assets=${ids}`,
  channel: 'symbols_price',
  onMessage: prices => [
    { type: 'UPDATE_SYMBOLS_PRICE', prices },
  ],
  onConnected: () => showNotification('Websocket Connected'),
  onDisconnected: () => showNotification('Websocket Disconnected'),
});

export default bindActionCreators({
  fetchSymbols,
  subscribeSymbolsPrice,
}, store.dispatch);

