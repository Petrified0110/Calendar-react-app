import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import {getLanguagePref} from '../authentification/auth';
import {passwordText, confirmPasswordText, registerText} from '../siteTexts';
import "./register.css";

const language = getLanguagePref();

export default function DisplayRegister() {
  let history = useHistory();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmationPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && confirmPassword.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios({
        method: "POST",
        url: "http://localhost:8000/api/user",
        data: {email, password, confirmPassword}
    });
    history.push('/');
  }

  return (
    <div className="Register">
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <label>{confirmPasswordText[language.key]}</label>
          <FormControl
            value={confirmPassword}
            onChange={e => setConfirmationPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          {registerText[language.key]}
        </Button>
      </form>
    </div>
  );
}
