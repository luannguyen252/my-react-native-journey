/* eslint-disable @typescript-eslint/no-unsafe-return */
import firebase from '../firebase';
import { IListingFavorite } from '../types/listing.type';

const db = firebase();

const getUserFavorites = async (user_id: string) => {
  const data: any[] = [];
  const querySnapshot = await db.collection('favorite').where('user_id', '==', user_id).get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
};

const addFavorite = async (favorite: Omit<IListingFavorite, 'id'>) => {
  const fav = await db.collection('favorite').add(favorite);
  return fav.id;
};

const deleteFavorite = async (favorite_id: string) => {
  await db.collection('favorite').doc(favorite_id).delete();
};

export default {
  getUserFavorites,
  addFavorite,
  deleteFavorite,
};
