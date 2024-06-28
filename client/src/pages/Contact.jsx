import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "./../store/auth";

const defaultContactFormData={
  username: "",
  email: "",
  message: "",
}

const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }
  // handle input
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });

    // setContact((prev)=>({
    //   ...prev,
    //   [name]:value,
    // }));
  };

  // Handle form GetFormSubissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/form/contact",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(contact)
      });
      if(response.ok){
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        alert("Form Submitted Successfully");
      }
    } catch (error) {
      alert("Form Submission Failed");
      console.log(error);
    }

  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="registration-image"></div>
          </Col>
          <Col>
            <h1 className="mt-3 mb-1 ">Contact Page</h1>
            <Form className="mt-2" onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  value={contact.username}
                  placeholder="Enter Username"
                  onChange={handleInput}
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={contact.email}
                  name="email"
                  onChange={handleInput}
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={contact.message}
                  type="message"
                  onChange={handleInput}
                  name="message"
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="btn mx-2">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
