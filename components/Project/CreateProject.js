import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import Auth from "../../auth";

function CreateProject(props) {
  const [form, setValues] = useState({
    projectName: "",
    projectDescription: "",
    projectNameOrId: ""
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
      projectName: "",
      projectDescription: "",
      projectNameOrId: ""
    });
  };

  const submit = e => {
    e.preventDefault();

    let data = {
      name: form.projectName,
      description: form.projectDescription
    };

    if (isNaN(form.projectNameOrId)) {
      data.teamName = form.projectNameOrId;
    } else data.teamId = form.projectNameOrId;

    return axios
      .post("http://localhost:8080/createproject", data)
      .then(function(res) {
        alert(res.data.msg + " project id: " + res.data.id);
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
      <h1>Create Project</h1>
      <hr className="style-one" />
      <Form onSubmit={submit}>
        <FormGroup row>
          <Label sm={1}>Name</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="projectName"
              placeholder="(required)"
              onChange={updateField}
              value={form.projectName}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Description</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="projectDescription"
              placeholder="(optional)"
              onChange={updateField}
              value={form.projectDescription}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Team ID</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="projectNameOrId"
              placeholder="(required) Team Name/ID"
              onChange={updateField}
              value={form.projectNameOrId}
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

export default withRouter(CreateProject);
