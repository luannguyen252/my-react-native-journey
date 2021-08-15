/* eslint-disable @typescript-eslint/no-unsafe-return */
import firebase from 'firebase';
import firebaseInit from '../firebase';

const db = firebaseInit();

const getAllAgents = async () => {
  const data: any[] = [];
  const querySnapshot = await db.collection('user').get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
};

const getAllAgentListings = async (user_id: string) => {
  try {
    const data: any[] = [];
    const querySnapshot = await db.collection('listing').where('agent_id', '==', user_id).get();
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAgent = async (agent_id: string) => {
  const data: any[] = [];
  const querySnapshot = await db.collection('user').where('id', '==', agent_id).get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
};

export default {
  getAllAgents,
  getAllAgentListings,
  getAgent,
};
