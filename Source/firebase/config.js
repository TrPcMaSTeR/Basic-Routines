import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAYiuBiKYgGwtTIoAdGxxMICtAjsTJEXSo",
	authDomain: "basic-routines.firebaseapp.com",
	projectId: "basic-routines",
	storageBucket: "basic-routines.appspot.com",
	messagingSenderId: "749027034911",
	appId: "1:749027034911:web:c25ee6eb686bcec229d22a",
};
// Initialize Firebase

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
