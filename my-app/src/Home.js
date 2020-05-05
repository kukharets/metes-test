import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Dmat from './assets/Dmat.png';
import Weather from './assets/Weather.png';
import { Link } from "react-router-dom";
import EditButton from "./EditButton";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: 1,
        };
        this.portRef = React.createRef();
        this.contRef = React.createRef();
    }
    onButtonClick = (index) => {
        this.setState({selected: index});
        switch (index) {
            case 1:
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                break;
            case 2:
                window.scrollTo({
                    top: this.portRef.current.offsetTop,
                    left: 0,
                    behavior: 'smooth'
                });
                break;
            case 3:
                window.scrollTo({
                    top: this.contRef.current.offsetTop,
                    left: 0,
                    behavior: 'smooth'
                });
                break;
        }

    };
    render() {
        const admin = true;
        const {selected} = this.state;
        var user = firebase.auth().currentUser;
        console.error("user", user);
        return (
            <div className='app'>

            </div>
        )
    }

}
export default Home;
