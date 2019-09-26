import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import Auth from "../../auth";

function CreateTeam(props) {
  const [form, setValues] = useState({
    teamName: "",
    teamDescription: "",
    teamMembers: [""]
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = e => {
    if (e) e.preventDefault();

    setValues({
      teamName: "",
      teamDescription: "",
      teamMembers: []
    });
  };

  const submit = e => {
    e.preventDefault();

    const data = {
      name: form.teamName,
      description: form.teamDescription,
      members: Array.isArray(form.teamMembers)
        ? form.teamMembers.splice("\n")
        : [form.teamMembers]
    };

    return axios
      .post("http://localhost:8080/createteam", data)
      .then(function(res) {
        alert(res.data.msg + " team id: " + res.data.teamId);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.msg);
        } else if (err.response && err.response.status === 302) {
          Auth.logOut();
          props.history.push("/Login");
        } else {
          // unknown error
          if (err.response && err.response.data)
            alert(err.response.data.msg || "Unknown Error");
        }
      })
      .finally(() => {
        resetForm();
      });
  };

  return (
    <div>
      <h1>Create Team</h1>
      <hr className="style-one" />
      <Form onSubmit={submit}>
        <FormGroup row>
          <Label sm={1}>Name</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="teamName"
              placeholder="(required)"
              onChange={updateField}
              value={form.teamName}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Description</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="teamDescription"
              placeholder="(optional)"
              onChange={updateField}
              value={form.teamDescription}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Members</Label>
          <Col sm={5}>
            <Input
              type="textarea"
              name="teamMembers"
              placeholder="(optional) member username/email per line"
              onChange={updateField}
              value={form.teamMembers}
              style={{ height: 180 }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1} />
          <Col sm={5}>
            <Button
              color="secondary"
              size="sm"
              onClick={resetForm}
              style={{ width: "100px" }}
            >
              Clear
            </Button>{" "}
            <Button
              color="success"
              size="sm"
              type="submit"
              style={{ width: "120px" }}
            >
              Create
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default withRouter(CreateTeam);
