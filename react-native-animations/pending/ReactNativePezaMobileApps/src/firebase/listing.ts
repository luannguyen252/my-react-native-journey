/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import firebaseInit from '../firebase';

// import IListing, { IAddListing } from '../types/listing.type';

const db = firebaseInit();

const addListing = async (listing: any) => {
  await db.collection('listing').add(listing);
};

const getAllListings = async () => {
  const data: any[] = [];
  const querySnapshot = await db.collection('listing').where('verified', '==', 'verified').get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
};

const getUserListings = async (user_id: string) => {
  const data: any[] = [];
  const querySnapshot = await db.collection('listing').where('agent_id', '==', user_id).get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
};

const deleteUserListing = async (user_id: string, listing_id: string) => {
  const data: any[] = [];
  const querySnapshot = await db.collection('listing').where('agent_id', '==', user_id).get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  await db.collection('listing').doc(listing_id).delete();
};

export default {
  addListing,
  getAllListings,
  getUserListings,
  deleteUserListing,
};
