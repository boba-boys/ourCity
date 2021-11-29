import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store/index';
// import Navbar from './components/Navbar';
import Routes from './Routes';

export default function App() {
  return (
    <Provider store={store}>
        <Routes />
    </Provider>
  )
}
