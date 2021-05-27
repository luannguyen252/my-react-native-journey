import * as React from "react";
import { Image, Text, View, AsyncStorage, StyleSheet } from "react-native";
import firebase from "firebase";
import getGithubTokenAsync from "./getGithubTokenAsync";
import GithubButton from "./GithubButton";

const GithubStorageKey = "@Expo:GithubToken"; //lolz whatever you want.

// Get this at: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "AIzaSyAfgPq82VdNqEZ8hqnOvYdD7kSPiFK9W1k",
  authDomain: "keira-knightley-51df6.firebaseapp.com",
  databaseURL: "https://keira-knightley-51df6.firebaseio.com",
  projectId: "keira-knightley-51df6",
  storageBucket: "keira-knightley-51df6.appspot.com",
  messagingSenderId: "628588079444",
};

function initializeFirebase() {
  // Prevent reinitializing the app in snack.
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}

async function signInAsync(token) {
  try {
    if (!token) {
      const token = await getGithubTokenAsync();
      if (token) {
        await AsyncStorage.setItem(GithubStorageKey, token);
        return signInAsync(token);
      } else {
        return;
      }
    }
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  } catch ({ message }) {
    alert(message);
  }
}

async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert("Error: " + message);
  }
}

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey);
  if (token) {
    console.log("Sign in with token", token);
    return signInAsync(token);
  }
}

export default class App extends React.Component {
  state = { isSignedIn: false };

  componentDidMount() {
    this.setupFirebaseAsync();
  }

  setupFirebaseAsync = async () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(async (auth) => {
      const isSignedIn = !!auth;
      this.setState({ isSignedIn });
      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  };

  render() {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};

      return (
        <View style={styles.container}>
          <Image source={{ uri: user.photoURL }} style={styles.image} />
          <Text style={styles.paragraph}>Welcome {user.displayName}</Text>
          <Text style={styles.paragraph} onPress={signOutAsync}>
            Logout
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <GithubButton onPress={() => signInAsync()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});
