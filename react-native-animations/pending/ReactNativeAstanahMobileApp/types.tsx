import { ReactNode } from 'react';
import { ImageRequireSource } from 'react-native';

// SVG Params
export type SvgParams = {
  color?: string;
  width?: number;
  height?: number;
  stroke?: number;
};

// Navigators
export type RootParamList = {
  AppNav: undefined;
  AuthNav: undefined;
};

export type AuthParamList = {
  Welcome: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type HomeNavParamList = {
  Home: undefined;
  Favorites: undefined;
  Notifications: undefined;
  ProductDetail: { product: Product };
  CategoryDetail: { category: Category };
  Categories: undefined;
  Sale: undefined;
};

export type ExploreNavParamList = {
  Explore: undefined;
  CategoryDetail: { category: Category };
  Favorites: undefined;
  Notifications: undefined;
};

export type AppNavParamList = {
  Home: undefined;
  Explore: undefined;
  Cart: undefined;
  Offer: undefined;
  Account: undefined;
};

export type CartNavParamList = {
  Cart: undefined;
  ShipTo: undefined;
  Payment: undefined;
  ChooseCard: undefined;
  Success: undefined;
};

export type AccountNavParamList = {
  Profile: undefined;
  BasicInfo: undefined;
  AddressInfo: undefined;
  PaymentInfo: undefined;
  Password: undefined;
  AddCard: undefined;
  AddAddress: undefined;
};

export type OfferNavParamList = {
  Offer: undefined;
  OfferDetail: undefined;
};

// Context
export interface User {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface AppContext {
  isLoggedIn: boolean;
  setUserState: (state: boolean) => void;
  user: User;
  addUserDetails: (userDetails: User) => void;
  cart: Product[];
  isProductInCart: (product: Product) => boolean;
  manageCart: (actions: ACTIONS, product?: Product) => void;
  cartTotal: number;
}

export type ACTIONS =
  | 'ADD_TO_CART'
  | 'REMOVE_FROM_CART'
  | 'INCREASE_COUNT'
  | 'DECREASE_COUNT'
  | 'EMPTY_CART';

// Product
export interface Product {
  id: number;
  image: ImageRequireSource; // We can use ImageRequireSource from react-native (Test it out later)
  title: string;
  description?: string;
  price: number;
  discountPrice?: number;
  ratings?: number;
  count: number;
}

// Address Content
export interface DeliveryAddress {
  id: number;
  name: string;
  addressDetail: string;
  phone: string;
}

// banner
export interface BannerProps {
  image: number;
  id: number;
}

// variant
export interface Variant {
  value: number | string;
}

// category
export interface Category {
  id: number;
  icon?: ReactNode;
  label: string;
}

// notifications

export interface NotificationProp {
  id: number;
  title: string;
  body: string;
  date: string;
}

// Customer Card Details

export interface CustomerCardDetailsProp {
  id: number;
  cardNumber: string;
  cardHolder: string;
  date: string;
}

// Offer Card

export interface OfferCardProp {
  id: number;
  image: ImageRequireSource;
}
