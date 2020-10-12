import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { momentLocalizer } from 'react-big-calendar';
import Basic from './calendar/calendar';
import DisplayHeader from './header/header';
import displayLogin from './authentification/login'
import displayRegister from './authentification/register'
import 'bootstrap/dist/css/bootstrap.min.css';

function routingMethod(){
    const localizer = momentLocalizer(moment)


    if(window.location.pathname === '/'){
        return (
        <div> 
            <DisplayHeader/>
            <Basic localizer={localizer}/>
        </div>
        )
    }
    else if(window.location.pathname === '/login'){
        return (
            <div>
                <DisplayHeader/>
                {displayLogin()}
            </div>
        )
    } 
    else if(window.location.pathname === '/register'){
        return (
            <div>
                <DisplayHeader/>
                {displayRegister()}
            </div>
        )
    } 
}

const App = () => {
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
        
            <body>
                {routingMethod()}
            </body>
        </html>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);