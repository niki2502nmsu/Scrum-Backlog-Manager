import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import Auth from "../../auth";
import SprintTasks from "./SprintTasks";

function CreateSprint(props) {
  const [form, setValues] = useState({
    description: "",
    startDate: "",
    endDate: "",
    projectId: "",
    searchID: ""
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
      description: "",
      startDate: "",
      endDate: "",
      projectId: "",
      searchID: ""
    });
  };

  const fetch = () => {
    setValues({
      ...form,
      searchID: form.projectId
    });
  };

  const submit = e => {
    e.preventDefault();
    const data = {
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      projectId: form.projectUID
    };

    return axios
      .post("http://localhost:8080/createsprint", data)
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
      <h2>Create Sprint</h2>
      <hr className="style-one" />
      <Form onSubmit={submit}>
        <FormGroup row>
          <Label sm={1}>Description</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="description"
              placeholder="(optional)"
              onChange={updateField}
              value={form.description}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Start Date</Label>
          <Col sm={5}>
            <Input
              type="date"
              name="startDate"
              placeholder="(optional)"
              onChange={updateField}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>End Date</Label>
          <Col sm={5}>
            <Input
              type="date"
              name="endDate"
              placeholder="(optional)"
              onChange={updateField}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>ProjectID</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="projectId"
              placeholder="(required)"
              onChange={updateField}
              value={form.projectUID}
              required
            />
          </Col>
          <FormGroup>
            <Button
              color="success"
              size="sm"
              style={{ width: "120px" }}
              onClick={fetch}
            >
              Find
            </Button>
          </FormGroup>
        </FormGroup>
        <FormGroup row>
          <SprintTasks projectId={form.searchID} />
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

export default withRouter(CreateSprint);
