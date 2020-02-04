import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

let docl
const PROVIDER_ID = "metas-7b01d";
export default class SignInScreen extends React.Component {
    firebaseAuth = () => {
        firebase.auth().signInWithEmailAndPassword().then((res) => {
            console.log("res", res);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.warn("error",errorMessage, errorCode)
            // ...
        });
    };

    editData = () => {
        const firestoreRef = firebase.firestore();

        const collection = firestoreRef.collection('basic');
        const document = collection.doc('docrules').get();
        const document1 = collection.doc('docrules');

        document1.update({
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        })



    }

    render() {
        console.warn("ADMIN", firebase)
        var user = firebase.auth().currentUser;
        console.error("user", user);
        docl && docl.update({
            isArchived: true,
        })
        return (
            <div>
                <p>Please sign-in:</p>
                <button style={{height: '50px', width: '50px'}} onClick={this.firebaseAuth}>LOGIN</button>
                {<div>
                    <button style={{height: '50px', width: '50px'}} onClick={this.editData}>MODIFICATE</button>
                </div>}
            </div>
        );
    }
}