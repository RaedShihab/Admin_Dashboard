import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";
import axios from 'axios'
import i18n from "./i18n";
import { store } from './auth/Helpers/store';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';

// setup fake backend
import { configureFakeBackend } from './auth/Helpers/fakeBackend';
configureFakeBackend();



const options = {
    method: 'GET',
    url: 'https://api.glowyhan.com/locations/countries',
    headers: {},
  };
  console.log('hhggf')
 axios(options, function(error, response) {
     console.log('hh')
    if (error) throw new Error(error);
    console.log(response.body);
  });

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<I18nextProvider i18n={i18n}><Provider store={store}><App /></Provider></I18nextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
