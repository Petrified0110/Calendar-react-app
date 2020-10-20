import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../authentification/auth';
import { useHistory } from 'react-router-dom';
import {getLanguagePref} from '../authentification/auth';
import {passwordText, loginText} from '../siteTexts'
import "./login.css";

const language = getLanguagePref();


export default function DisplayLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    login({email, password});
    history.push('/');
 }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <label>Email</label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label>{passwordText[language.key]}</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
        {loginText[language.key]}
        </Button>
      </form>
    </div>
  );
}
