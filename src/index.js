import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

// Setup Firebase
const config = {
    apiKey: "AIzaSyBMbOcZ7egI9aZ7ZfFezrb_Tmof_kYCuvA",
    authDomain: "routes-9cee1.firebaseapp.com",
    databaseURL: "https://routes-9cee1.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "642114885858"
};
firebase.initializeApp(config);

// Touch Tap Plugin
injectTapEventPlugin();

ReactDOM.render(<App firebaseRef={firebase.database().ref('routes')}/>, document.getElementById('root'));
