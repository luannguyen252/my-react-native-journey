import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { Platform, AsyncStorage } from 'react-native';

import { authToken } from '../utils/constants';

/* Connect to graphql server */
const url =
  Platform.OS === 'ios' ? 'http://127.0.0.1:4000/api/graphql' : 'http://10.0.2.2:4000/api/graphql';
const httpLink = new HttpLink({ uri: url });

/* Create cache */
const cache = new InMemoryCache();

/* Auth middleware */
let token;
const getToken = async () => {
  if (token != null) {
    return token;
  }
  token = await AsyncStorage.getItem(authToken);
  return token;
};
const authLink = setContext(async (_, { headers }) => {
  await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});
const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
    token = null;
  }
});
const authFlowLink = authLink.concat(resetToken);
const link = authFlowLink.concat(httpLink);

/* Client */
export const client = new ApolloClient({
  link: from([link]),
  cache
});
