import React, { useState } from "react";
import { withRouter } from "react-router";
import FetchTasks from "./FetchTasks";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";

function GetTasks() {
  const [form, setValues] = useState({
    projectID: "",
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
      projectID: "",
      searchID: ""
    });
  };

  const fetch = () => {
    setValues({
      ...form,
      searchID: form.projectID
    });
  };

  return (
    <div>
      <h2>Find Task</h2>
      <hr className="style-one" />
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
            style={{ width: "120px" }}
            onClick={fetch}
          >
            Find
          </Button>
        </Col>
      </FormGroup>
      <FetchTasks projectId={form.searchID} />
    </div>
  );
}

export default withRouter(GetTasks);
