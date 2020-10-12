import React from 'react';
import './activeUser.css';

function displayUser() {
    return (
        <div>
            <div className="activeUser">
            <div class="user">
                    Darth Vader
                </div>
                <div className="icon">
                    <img src={require('./usericon.png')} height="30px" width="30px"/>
                </div>
            </div>
        </div>
    )
}

export default displayUser