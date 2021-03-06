import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './screens/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';
firebase.initializeApp(firebaseConfig);
export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: HomeScreen,
    },
    {
      initialRouteName: 'Auth'
    }
  )
);