import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDlr036eluLIVMpo777awwyqu3YXvf1szA",
    authDomain: "hope-5ccfc.firebaseapp.com",
    databaseURL: "https://hope-5ccfc.firebaseio.com",
    projectId: "hope-5ccfc",
    storageBucket: "hope-5ccfc.appspot.com",
    messagingSenderId: "867986276265",
    appId: "1:867986276265:web:23ba0ef349a935f0050eb8",
    measurementId: "G-3R5LFT1FFY"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;