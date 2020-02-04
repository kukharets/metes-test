import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyA-_Y78m59zmygHMX79JoTzJmtcqU79hvY",
	authDomain: "metas-7b01d.firebaseapp.com",
	databaseURL: "https://metas-7b01d.firebaseio.com",
	projectId: "metas-7b01d",
	storageBucket: "metas-7b01d.appspot.com",
	messagingSenderId: "318410216235",
	appId: "1:318410216235:web:7b8beac8ae792cf97f2b6e",
	measurementId: "G-VRP3G3VG9R"
};

const app = firebase.initializeApp(config);

export const firestore = firebase.firestore(app);

export default firebase;
