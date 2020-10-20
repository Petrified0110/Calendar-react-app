import React from 'react';
import {Menu, Dropdown, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {logout, getLanguagePref, isLoggedIn as checkLogIn} from '../authentification/auth';
import {getUserEmail} from '../authentification/auth';
import Languages from '../header/language';
import {goToCalendar, createEvent, signIn, signUp, signedInAs, logoutText} from '../siteTexts';
import './header.css';

const language = getLanguagePref();

const trigger = (
    <span>
        <Icon name='user' /> {getUserEmail()}
    </span>
)
const options = [
    {
      key: 'user',
      text: (
        <span>
          {signedInAs[language.key]}<strong>{getUserEmail()}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'logout', text: (<Menu.Item as={Link} to="/">{logoutText[language.key]}</Menu.Item>), onClick: () => {
        logout();
        document.location.reload(true);
     }},
    ];



const Header = () => {
    const isLoggedIn = checkLogIn();

    return (
        <Menu secondary pointing>
            <Menu.Item as={Link} to="/">
                Calendar
            </Menu.Item>

            {isLoggedIn &&(
                <Menu.Item as={Link} to="/calendar">
                    {goToCalendar[language.key]}
                </Menu.Item>
            )}

            {isLoggedIn &&(
                <Menu.Item as={Link} to="/createevent">
                    {createEvent[language.key]}
                </Menu.Item>
            )}

            {!isLoggedIn &&
                <Menu.Item as={Link} to="/login" position="right">
                    {signIn[language.key]}
                </Menu.Item>
            }

            {!isLoggedIn &&
                <Menu.Item as={Link} to="/register">
                    {signUp[language.key]}
                </Menu.Item>
            }

            <Menu.Item>
                <Languages/>
            </Menu.Item>

            {isLoggedIn &&(
                <Menu.Menu position="right">
                    <Dropdown trigger={trigger} options={options}/>
                </Menu.Menu>
            )}
        </Menu>
    );
}

Header.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired
};
export default Header;