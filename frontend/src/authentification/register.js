import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import "./register.css";

export default function DisplayRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmationPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && confirmPassword.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/user",
        data: {email, password, confirmPassword}
    });
    console.log(res)
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
          <label>Password</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <label>Confirm Password</label>
          <FormControl
            value={confirmPassword}
            onChange={e => setConfirmationPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
