import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

function Register(props) {
  const [form, setValues] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
    firstName: "",
    lastName: "",
    error: ""
  });

  let [modal, toggle] = useState(false);

  const toggleModal = () => {
    toggle((modal = !modal));
  };

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = e => {
    e.preventDefault();
    if (form.password !== form.repassword) {
      setValues({
        ...form,
        error: "Password and Password Confirm do not match!"
      });
      toggleModal();
      return;
    }

    const data = {
      username: form.username,
      email: form.email,
      password: form.password,
      confirm: form.repassword,
      firstName: form.firstName,
      lastName: form.lastName
    };

    axios
      .post("http://localhost:8080/register", data)
      .then(function(response) {
        if (response.status === 200) {
          // Resgistration Successful! Send user to Login
          setValues({ ...form, error: "" });
          toggleModal();
        } else {
          // Let user know what went wrong
          setValues({ ...form, error: response.data.msg });
          toggleModal();
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 302) {
          // redirect to /home
          props.history.push(err.response.data || "/Home");
        } else {
          setValues({
            ...form,
            error: err.response ? err.response.data.msg : "Server unreachable"
          });
          toggleModal();
        }
      });
  };

  return (
    <Container className="auth-container">
      <Modal isOpen={modal} size="sm">
        <ModalHeader toggle={toggleModal}>
          {form.error ? "Error" : "Success"}
        </ModalHeader>
        <ModalBody>
          {form.error ? form.error : "Successfully Registered!"}
        </ModalBody>
        <ModalFooter>
          {form.error ? (
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          ) : (
            <Button color="success" href="/LogIn">
              Log In
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <Row>
        <Col>
          <Card
            inverse
            style={{ backgroundColor: "#333", borderColor: "#333" }}
          >
            <CardTitle tag="h3" style={{ paddingTop: "15px" }}>
              <FontAwesomeIcon icon="spider" size="3x" />
            </CardTitle>
            <CardSubtitle tag="h3">Registration</CardSubtitle>
            <CardBody>
              <Form onSubmit={submit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    onChange={updateField}
                    placeholder="Username"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    onChange={updateField}
                    placeholder="Email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    onChange={updateField}
                    placeholder="Password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="repassword"
                    onChange={updateField}
                    placeholder="Confirm Password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="firstName"
                    onChange={updateField}
                    placeholder="First Name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="lastName"
                    onChange={updateField}
                    placeholder="Last Name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Button color="info" type="submit" block>
                    Register
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
