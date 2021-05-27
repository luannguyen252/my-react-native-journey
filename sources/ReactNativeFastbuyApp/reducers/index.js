import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ProductReducer from './ProductReducer';
import ProductsReducer from './ProductsReducer';

export default combineReducers({
  login: LoginReducer,
  product: ProductReducer,
  products: ProductsReducer
});
