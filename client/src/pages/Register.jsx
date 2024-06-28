import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // handle input user value
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // handeling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);
      if (response.ok) {
        //  save token to local storage and redirect to dashboard
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successfull");
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      console.log(response);
    } catch (error) {
      console.log("Register", error);
    }
  };
  // reset form
  const handleReset = () => {
    setUser({ email: "", password: "" });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="registration-image"></div>
          </Col>
          <Col>
            <h1 className="mt-3 mb-1 ">Registration Page</h1>
            <Form
              className="mt-3"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  value={user.username}
                  placeholder="username"
                  required
                  autoComplete="off"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="Enter email"
                  required
                  autoComplete="off"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="phone"
                  name="phone"
                  value={user.phone}
                  placeholder="Phone Number"
                  required
                  autoComplete="off"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Password"
                  required
                  autoComplete="off"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="success" type="submit" className="btn mx-2">
                Register
              </Button>
              <Button variant="secondary" type="reset" className="btn mx-2">
                Reset
              </Button>
            </Form>
            <h5 className="mt-4">Already Have account? <NavLink to="/login">Login</NavLink></h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
