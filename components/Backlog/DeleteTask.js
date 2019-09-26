import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import Auth from "../../auth";

function DeleteTask(props) {
  const [form, setValues] = useState({
    taskId: ""
  });

  const updateField = e => {
    setValues({
      taskId: e.target.value
    });
  };

  const resetForm = e => {
    if (e) e.preventDefault();

    setValues({
      taskId: ""
    });
  };

  const submit = e => {
    e.preventDefault();

    const data = {
      taskId: form.taskId
    };

    return axios
      .post("http://localhost:8080/deletetask", data)
      .then(function(res) {
        alert(res.data.msg);
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
      <h2>Delete Task</h2>
      <hr className="style-one" />
      <Form onSubmit={submit}>
        <FormGroup row>
          <Label sm={1}>ID</Label>
          <Col sm={5}>
            <Input
              type="text"
              name="taskId"
              placeholder="(Enter Task ID)"
              onChange={updateField}
              value={form.taskId}
              required
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
              color="danger"
              size="sm"
              type="submit"
              style={{ width: "120px" }}
            >
              Delete
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default withRouter(DeleteTask);
