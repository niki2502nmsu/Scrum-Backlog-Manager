import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import Auth from "../../auth";

function CreateTask(props) {
  const [form, setValues] = useState({
    categoryID: "10",
    statusID: "20",
    projectID: "",
    logDescription: ""
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
      categoryID: "",
      statusID: "",
      projectID: "",
      logDescription: ""
    });
  };

  const submit = e => {
    e.preventDefault();

    const data = {
      log: form.logDescription,
      categoryId: form.categoryID,
      projectId: form.projectID,
      statusId: form.statusID
    };

    return axios
      .post("http://localhost:8080/createtask", data)
      .then(function(res) {
        alert(res.data.msg + " task id: " + res.data.id);
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
      <h2>Create Task</h2>
      <hr className="style-one" />
      <Form onSubmit={submit}>
        <FormGroup row>
          <Label sm={1}>Category</Label>
          <Col sm={5}>
            <Input
              type="select"
              name="categoryID"
              placeholder="(required)"
              onChange={updateField}
              value={form.categoryID}
              required
            >
              <option value={10}>User Story</option>
              <option value={11}>Bug</option>
              <option value={12}>Refactoring</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Status</Label>
          <Col sm={5}>
            <Input
              type="select"
              name="statusID"
              placeholder="(required)"
              onChange={updateField}
              value={form.statusID}
              required
            >
              <option value={20}>Created</option>
              <option value={21}>Sprint</option>
              <option value={22}>Returned</option>
              <option value={23}>Completed</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>ProjectID</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="projectID"
              placeholder="(required)"
              onChange={updateField}
              value={form.projectID}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Task Description</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="logDescription"
              placeholder="(optional)"
              onChange={updateField}
              value={form.logDescription}
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
              Add
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default withRouter(CreateTask);
