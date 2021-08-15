/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IListingFavorite } from '../types/listing.type';
import { ADD_FAVORITE_ITEM, REMOVE_FAVORITE_ITEM } from './actions';

const initialState = {
  favorites: [],
};

function favoriteReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_FAVORITE_ITEM:
      return { ...state, favorites: [...state.favorites, action.payload] };

    case REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favorites: state.favorites.filter((f: IListingFavorite) => f.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export default favoriteReducer;
