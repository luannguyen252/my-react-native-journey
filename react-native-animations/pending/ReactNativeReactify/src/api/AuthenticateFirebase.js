import React, { Component } from 'react'
import config, { printLog } from '../config'
import firebase from 'react-native-firebase'

export default class AuthenticateFirebase {
 
    signInFirebase (username, password) {
        firebase.auth.signInWithEmailAndPassword(username, password)
        .then(() => {

        }).catch((error) => {
            
        })
    }

}  