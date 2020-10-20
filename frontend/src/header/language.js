import React from "react";
import {Flag, Dropdown} from 'semantic-ui-react';
import {getLanguagePref, setLanguagePref} from '../authentification/auth';

const languageOptions = [
    { key: "uk", text: "English", value: "EN" },
    { key: "ro", text: "Romanian", value: "RO" }
 ];

class Languages extends React.Component {
    
    constructor(props) {
        super(props);
        const lang = getLanguagePref();
        this.state = {
            value: lang !== undefined ? lang.value: languageOptions[0].value,
            key: lang !== undefined ? lang.key: languageOptions[0].key
        }
        if(lang === undefined)
            setLanguagePref(languageOptions[0]);
    }

    onValueChange = (lang) => {
        const value = lang.value;
        const key = lang.key;
        setLanguagePref(lang);
        this.setState({ value, key});
    };
   
    render () {       
        return( 
            <div>
                <span><Flag name={this.state.key}/></span>
                <Dropdown text={this.state.value} value={this.state.value}>
                        <Dropdown.Menu>
                        {languageOptions.map(lang => (            
                            <Dropdown.Item
                                key={lang.key}
                                flag={{ name: lang.key }}
                                value={lang.value}
                                text={lang.value}
                                onClick={() => this.onValueChange(lang)}
                            />
                        )
                        )}
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
        
    }
}
  
export default Languages;
