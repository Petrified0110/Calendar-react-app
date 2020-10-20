import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getLanguagePref} from '../authentification/auth';
import {mainPageHeader1, mainPageHeader2, signUp, signIn} from '../siteTexts'
import '../mainpage/mainpage.css';

import {
    Button,
    Container,
    Header,
    Icon,
  } from 'semantic-ui-react'

  const language = getLanguagePref();


const MainPage = () => {
        return (
            <div className='mainpage'>
                <Container text>
                    <Header
                    as='h1'
                    content={mainPageHeader1[language.key]}
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '3em',
                    }}
                    />
                    <Header
                    as='h2'
                    content={mainPageHeader2[language.key]}
                    style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                    }}
                    />
                    <Button primary size='huge' as={Link} to="/register">
                    {signUp[language.key]}
                    <Icon name='right arrow' />
                    </Button>

                    <Button primary size='huge' as={Link} to="/login">
                    {signIn[language.key]}
                    <Icon name='right arrow' />
                    </Button>
                </Container>
            </div>
        
        );
}

MainPage.propTypes = {
    mobile: propTypes.bool,
  }

export default MainPage;