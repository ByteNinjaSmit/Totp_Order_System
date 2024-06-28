import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [user, setUser] = useState({
    email: "",
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
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      // console.log("Login Form", response);
      const res_data = await response.json();
      if (response.ok) {
        
        toast.success("Login Successful");
        //  save token to local sto rage and redirect to dashboard
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token",res_data);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(user);
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
            <h1 className="mt-3 mb-1 ">Login Page</h1>
            <Form
              className="mt-3"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
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
                Login Now
              </Button>
              <Button variant="secondary" type="reset" className="btn mx-2">
                Reset
              </Button>
            </Form>
            <h5 className="mt-4">Don't have an account? <NavLink to="/register">Sign Up</NavLink></h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
