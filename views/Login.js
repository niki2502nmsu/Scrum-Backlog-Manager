import React, { useState } from "react";
import axios from "axios";
import auth from "../auth";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
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

function LogIn(props) {
  const [form, setValues] = useState({
    username: "",
    password: ""
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
    const data = {
      username: form.username,
      password: form.password
    };

    return axios
      .post("http://localhost:8080/auth/login", data)
      .then(function(response) {
        if (response.data.auth) {
          auth.logIn(response.data.user);
          props.history.push("/Home");
        } else {
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
        <ModalHeader toggle={toggleModal}>Login Error</ModalHeader>
        <ModalBody>{form.error ? form.error : "Unknown error"}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
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
            <CardSubtitle tag="h3">Please Sign In</CardSubtitle>
            <CardBody>
              <Form onSubmit={submit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    onChange={updateField}
                    placeholder="Username or Email"
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
                  <Button color="info" type="submit" block>
                    Sign In
                  </Button>
                </FormGroup>
                <ButtonGroup size="sm">
                  <Button href="/Register">Register</Button>
                  <Button href="/Forgot">Forgot Password?</Button>
                </ButtonGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(LogIn);
