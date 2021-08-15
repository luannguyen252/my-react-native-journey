// import firebase from 'firebase';
// import * as ImageManipulator from 'expo-image-manipulator';

// const imageUpload = async (uri: string) => {
//   const userData = firebase.auth().currentUser;

//   const actions = [];

//   actions.push({ resize: { width: 300 } });

//   const manipulatorResult = await ImageManipulator.manipulateAsync(uri, actions, {
//     compress: 0.8,
//   });

//   const localUri = await fetch(manipulatorResult.uri);

//   const localBlob = await localUri.blob();
//   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
//   const filename = userData && userData.uid + new Date().getTime();

//   const storageRef = firebase
//     .storage()
//     .ref()
//     // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
//     .child('avatar/' + filename);

//   const putTask = storageRef.put(localBlob);

//   // eslint-disable-next-line @typescript-eslint/await-thenable
//   putTask.on('state_changed', () => {
//     void putTask.snapshot.ref.getDownloadURL().then((URL) => {
//       avatar.push(URL);
//     });
//   });
// };

// export default imageUpload;
