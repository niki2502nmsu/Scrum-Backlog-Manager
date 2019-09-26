import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Auth from "../../auth";
import ReactPaginate from "react-paginate";
import { Table, Spinner, Label } from "reactstrap";

const kLimit = 10;

const TeamTableRow = ({ row }) => (
  <tr>
    <td key={row.id}>{row.id}</td>
    <td key={"name" + row.id}>{row.name}</td>
    <td key={"desc" + row.id}>{row.descrption}</td>
    <td key={"own" + row.id}>{row.ownerId}</td>
    <td key={"tca" + row.id}>{new Date(row.createdAt).toLocaleDateString()}</td>
    <td key={"tua" + row.id}>{new Date(row.updatedAt).toLocaleDateString()}</td>
  </tr>
);

const TeamTable = ({ data }) => (
  <Table hover size="lg">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Owner ID</th>
        <th>Created At</th>
        <th>Last Update</th>
      </tr>
    </thead>
    <tbody>
      {data.map(row => {
        return <TeamTableRow row={row} key={"ptr" + row.id} />;
      })}
    </tbody>
  </Table>
);

class GetTeams extends React.Component {
  constructor(props) {
    super();

    this.state = {
      loading: true,
      teams: []
    };

    this.loadTable.bind(this);
  }

  loadTable() {
    const data = {
      allTeams: true,
      paging: {
        limit: kLimit,
        offset: this.state.offset ? this.state.offset : 0
      }
    };
    axios
      .post("http://localhost:8080/getteams", data)
      .then(res => {
        this.setState({
          loading: false,
          teams: res.data.teams,
          numTeams: res.data.numTeams,
          numPages: res.data.numTeams
            ? Math.ceil(res.data.numTeams / kLimit)
            : 1
        });
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

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Teams List</h1>
          <hr className="style-one" />
          <div>
            <Label>Fetching Team's data&nbsp;&nbsp;&nbsp;</Label>
            <Spinner size="lg" color="primary" />
          </div>
        </div>
      );
    } else if (this.state.numTeams === 0) {
      return (
        <div>
          <h1>Teams List</h1>
          <hr className="style-one" />
          <div>
            <h4>There are no teams.</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Teams List</h1>
          <hr className="style-one" />
          <div>
            <TeamTable data={this.state.teams} />
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

export default withRouter(GetTeams);
