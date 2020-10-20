import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import Basic from './calendar/calendar';
import Header from './header/header';
import DisplayLogin from './authentification/login';
import DisplayRegister from './authentification/register';
import MainPage from '../src/mainpage/mainpage'
import CreateEvent from '../src/event/createEvent'
import ModifyEvent from '../src/event/modifyEvent'
import ViewEvent from '../src/event/viewEvent'
import 'semantic-ui-css/semantic.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    
    render() {
        let localizer = momentLocalizer(moment);

    return (
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css"/>
                <script
                src="https://code.jquery.com/jquery-3.1.1.min.js"
                integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
                crossorigin="anonymous"></script>
                <script src="semantic/dist/semantic.min.js"></script>
            </head>
        
            <body style={{'overflow':'visible !important'}}>
                <Switch>
                    <Route exact path="/">
                        <Header/>
                        <MainPage />
                    </Route>
                    <Route path="/modifyevent">
                        <Header/>
                        <ModifyEvent/>
                    </Route>
                    <Route path="/createevent">
                        <Header/>
                        <CreateEvent />
                    </Route>
                    <Route path="/calendar">
                        <Header/>
                        <Basic localizer={localizer} />
                    </Route>
                    <Route path="/login">
                        <Header/>
                        <DisplayLogin/>
                    </Route>
                    <Route path="/register">
                        <Header/>
                        <DisplayRegister/>
                    </Route>
                    <Route path="/viewevent">
                        <Header/>
                        <ViewEvent/>
                    </Route>
                </Switch>
            </body>
        </html>
    );}
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#root')
);