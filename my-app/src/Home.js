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
        return (
            <div className='app'>
                <div className='navigation'>
                    <div className='buttons'>
                        <div className='button-wrapper'>
                            {admin && <EditButton type='text' id={`nav_button_1`}/>}
                            <div onClick={() => {this.onButtonClick(1)}} className={`nav-button button-index-1 ${!selected || selected === 1 ? 'selected' : ''}`}>
                                <span>HELLO</span>
                            </div>
                        </div>
                        <div onClick={() => {this.onButtonClick(2)}} className={`nav-button  button-index-2 ${selected === 2 ? 'selected' : ''}`}><span>PORTFOLIO</span></div>
                        <div onClick={() => {this.onButtonClick(3)}} className={`nav-button button-index-3 ${selected === 3 ? 'selected' : ''}`}><span>CONTACT</span></div>
                    </div>
                </div>
                <div className="content">
                    <div className='hello'>
                        <div className='content-title'>
                            {admin && <EditButton type='text' id={`nav_button_1`}/>}
                            Taras Kukharets
                        </div>
                        <div className='hello-description'>
                            An experienced web developer, proficient in innovative front-end approaches
                            based on an advanced stack of solutions for ReactJS applications:
                            <br/><br/>
                            - Strong native JS<br/>
                            - EcmaScript 6, 7<br/>
                            - ReactJS advanced<br/>
                            - Redux (Saga, Thunk) advanced<br/>
                            - Webpack<br/>
                            - Sass<br/>
                            - Mobile-first development<br/>
                            - SVG<br/>
                            <br/><br/>
                            I have experience in real solutions in the development of sites that users need
                            in 2020: website loading speed, responsive markup, full cross-browser and
                            cross-platform compatibility, integration with social networks and messengers.
                            <br/><br/>
                            I worked with a variety of media content, graphs and maps, complex finance
                            calculations, a variety of APIs, simple vector graphics and more. I can cover the
                            code with full and necessary tests and develop a basic back-end.
                        </div>
                    </div>
                    <div ref={this.portRef} className='portfolio'>
                        <div className='content-title'>
                            Portfolio
                        </div>
                        <div className='portfolio-images'>
                            <div className='portfolio-item'>
                                <div className='portfolio-title'>Dmatcher - furniture site from Israel</div>
                                <div style={{backgroundImage: `url(${Dmat})`}} className='portfolio-image'></div>
                            </div>
                            <div className='portfolio-item'>
                                <div className='portfolio-title'>My own open-source website</div>
                                <div style={{backgroundImage: `url(${Weather})`}} className='portfolio-image'></div>
                            </div>
                            <div className='portfolio-item'>
                                <div className='portfolio-title'>Dmatcher - furniture site from Israel</div>
                                <div style={{backgroundImage: `url(${Dmat})`}} className='portfolio-image'></div>
                            </div>
                            <div className='portfolio-item'>
                                <div className='portfolio-title'>My own open-source website My own open-source website My own open-source website</div>
                                <div style={{backgroundImage: `url(${Weather})`}} className='portfolio-image'></div>
                            </div>
                        </div>
                    </div>
                    <div ref={this.contRef} className='contact'>
                        <div className='content-title'>
                            Contact
                        </div>
                        <div className='contact-wrapper'>
                            <div className='contact-item'>
                                Skype: taras.kukharets
                            </div>
                            <div className='contact-item'>
                                LinkedIn: <Link className='link-unstyled' to={'https://linked.in/kukharets'}>https://linked.in/kukharets</Link>
                            </div>
                            <div className='contact-item'>
                                Phone: +38 068 7924081
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Home;
