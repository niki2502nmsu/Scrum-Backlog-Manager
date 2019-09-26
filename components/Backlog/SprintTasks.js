import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Auth from "../../auth";
import ReactPaginate from "react-paginate";
import { Table, Spinner, Label } from "reactstrap";

const kLimit = 10;
const TaskTableRow = ({ row }) => (
  <tr key={"tr" + row.id}>
    <td key={row.id}>{row.id}</td>
  </tr>
);

const TaskTable = ({ data }) => (
  <Table hover size="lg">
    <thead>
      <tr>
        <th>ID</th>
        <th>Assignee ID</th>
        <th>Estimate</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {data.map(row => {
        return <TaskTableRow row={row} key={"ttr" + row.id} />;
      })}
    </tbody>
  </Table>
);

class SprintTasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projectId: props.projectId,
      tasks: []
    };

    this.loadTable.bind(this);
  }

  loadTable() {
    const data = {
      projectId: this.state.projectId,
      paging: {
        limit: kLimit,
        offset: this.state.offset ? this.state.offset : 0
      }
    };
    axios
      .post("http://localhost:8080/gettasks", data)
      .then(res => {
        this.setState({
          loading: false,
          tasks: res.data.tasks,
          numTasks: res.data.num
        });
        console.log(res);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.msg);
        } else if (err.response && err.response.status === 302) {
          Auth.logOut();
          this.props.history.push("/Login");
        } else {
          // unknown error
          if (err.response && err.response.data)
            alert(err.response.data.msg || "Unknown Error");
        }
      });
  }

  pageClicked = data => {
    let offset = data.selected;
    this.setState({ offset: offset }, () => {
      this.loadTable();
    });
  };

  componentDidMount() {
    this.loadTable();
  }

  componentDidUpdate() {
    this.loadTable();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ projectId: nextProps.projectId });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h4>Task List</h4>
          <hr className="style-one" />
          <div>
            <Label>Fetching Task data&nbsp;&nbsp;&nbsp;</Label>
            <Spinner size="lg" color="primary" />
          </div>
        </div>
      );
    } else if (this.state.numTasks === 0) {
      return (
        <div>
          <h3>Task List</h3>
          <hr className="style-one" />
          <div>
            <h4>There are no projects.</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Task List</h4>
          <hr className="style-one" />
          <div>
            <TaskTable data={this.state.tasks} />
          </div>
          <div style={{ textAlign: "center" }}>
            {this.state.numPages > 0 && (
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.numPages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.pageClicked}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(SprintTasks);
