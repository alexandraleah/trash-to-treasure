import firebase from 'firebase';
import 'firebase/auth';
var config = {
  apiKey: 'AIzaSyB9fXFRJIQnXFP_8NhZXgeGxEs5UgYYdW8',
  authDomain: 'trash-to-treasur-1533175223809.firebaseapp.com',
  databaseURL: 'https://trash-to-treasur-1533175223809.firebaseio.com',
  projectId: 'trash-to-treasur-1533175223809',
  storageBucket: 'trash-to-treasur-1533175223809.appspot.com',
  messagingSenderId: '607714836865',
};
var fire = firebase.initializeApp(config);
export default fire;

const auth = firebase.auth();
export { auth };
