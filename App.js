/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Screens from './src/screens/'
import configureStore from './src/redux/configureStore'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import RNFetchBlob from 'rn-fetch-blob'
const store = configureStore()
// TODO : Move this to BuildConfig
var config = {
  apiKey: "AIzaSyBQR_hz4BJQ00VhZ_MtURjxD5hn9ch1kko",
  authDomain: "justickets-android-staging.firebaseapp.com",
  databaseURL: "https://justickets-android-staging.firebaseio.com",
  projectId: "justickets-android-staging",
  storageBucket: "justickets-android-staging.appspot.com",
  messagingSenderId: "1042509216944"
};
firebase.initializeApp(config);

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
export const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class App extends Component<Props> {

  render () {
    return (
      <Provider store={store}>
        <Screens />
      </Provider>
    );
  }
}

