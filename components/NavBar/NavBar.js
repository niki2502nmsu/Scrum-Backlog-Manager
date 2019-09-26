import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import Dashboard from "../Dashboard/Dashboard";
import DeleteTeam from "../Team/DeleteTeam";
import CreateTeam from "../Team/CreateTeam";
import CreateProject from "../Project/CreateProject";
import DeleteProject from "../Project/DeleteProject";
import styled from "styled-components";
import Auth from "../../auth";
import GetTeams from "../Team/GetTeams";
import GetProjects from "../Project/GetProjects";
import GetTasks from "../Backlog/GetTasks";
import CreateTask from "../Backlog/CreateTask";
import DeleteTask from "../Backlog/DeleteTask";
import CreateSprint from "../Backlog/CreateSprint";
import DeleteSprint from "../Backlog/DeleteSprint";

const navWidthCollapsed = 64;
const navWidthExpanded = 280;

const NavHeader = styled.div`
  display: ${props => (props.expanded ? "block" : "none")};
  white-space: nowrap;
  background-color: #6b6869;
  font-weight: bold;
  font-style: italic;
  width: 100%;
  padding: 10px 10px;
  > * {
    color: inherit;
    background-color: inherit;
  }
`;

const NavTitle = styled.div`
  font-size: 1em;
  line-height: 20px;
  padding: 12px 0;
`;

const Separator = styled.div`
  clear: both;
  position: relative;
  margin: 0.8rem 0;
  background-color: #ddd;
  height: 2px;
`;

class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: "home",
      expanded: true
    };

    this.onSelect = this.onSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  pageTitle = {
    home: "Home",
    "admin/teams": ["Administrative", "Team Management"],
    "admin/projects": ["Administrative", "Project Management"]
  };

  onSelect = selected => {
    this.setState({ selected: selected });
  };

  onToggle = expanded => {
    this.setState({ expanded: expanded });
  };

  render() {
    const { expanded, selected } = this.state;
    return (
      <div>
        <div
          style={{
            maxWidth: "1000px",
            marginLeft: expanded ? navWidthExpanded : navWidthCollapsed,
            paddingLeft: "40px",
            paddingTop: "40px"
          }}
        >
          {selected === "home" && (
            <div>
              <Dashboard />
            </div>
          )}
          {selected === "backlogs/logs" && (
            <div>
              <GetTasks />
            </div>
          )}
          {selected === "teams" && (
            <div>
              <GetTeams />
            </div>
          )}
          {selected === "projects" && (
            <div>
              <GetProjects />
            </div>
          )}
          {selected === "admin/teams" && (
            <div>
              <CreateTeam />
              <br />
              <br />
              <DeleteTeam />
            </div>
          )}
          {selected === "admin/projects" && (
            <div>
              <CreateProject />
              <br />
              <br />
              <DeleteProject />
            </div>
          )}
          {selected === "admin/tasks" && (
            <div>
              <CreateTask />
              <br />
              <br />
              <DeleteTask />
            </div>
          )}
          {selected === "admin/sprints" && (
            <div>
              <CreateSprint />
              <br />
              <br />
              <DeleteSprint />
            </div>
          )}
        </div>
        <div>
          <SideNav
            style={{
              minWidth: expanded ? navWidthExpanded : navWidthCollapsed,
              marginTop: "75px"
            }}
            onSelect={this.onSelect}
            onToggle={this.onToggle}
            expanded={expanded}
          >
            <SideNav.Toggle />

            <NavHeader expanded={expanded}>
              <NavTitle>
                <div>Welcome {Auth.getUsername()}</div>
              </NavTitle>
            </NavHeader>

            <SideNav.Nav selected={selected}>
              <NavItem eventKey="home">
                <NavIcon>
                  <FontAwesomeIcon
                    icon="home"
                    style={{ fontSize: "1.75em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Home</NavText>
              </NavItem>

              <NavItem eventKey="backlogs">
                <NavIcon>
                  <FontAwesomeIcon
                    icon="book"
                    style={{ fontSize: "1.75em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Backlogs</NavText>
                <NavItem eventKey="backlogs/logs">
                  <NavText>Logs</NavText>
                </NavItem>
                <NavItem eventKey="backlogs/sprints">
                  <NavText>Sprints</NavText>
                </NavItem>
              </NavItem>

              <NavItem eventKey="teams">
                <NavIcon>
                  <FontAwesomeIcon
                    icon="user-friends"
                    style={{ fontSize: "1.75em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Teams</NavText>
              </NavItem>

              <NavItem eventKey="projects">
                <NavIcon>
                  <FontAwesomeIcon
                    icon="archive"
                    style={{ fontSize: "1.75em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Projects</NavText>
              </NavItem>

              <NavItem eventKey="admin">
                <NavIcon>
                  <FontAwesomeIcon
                    icon="users-cog"
                    style={{ fontSize: "1.75em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Administrative Tasks</NavText>
                <NavItem eventKey="admin/teams">
                  <NavText title="Teams">Team Management</NavText>
                </NavItem>
                <NavItem eventKey="admin/projects">
                  <NavText title="Projects">Project Management</NavText>
                </NavItem>
                <NavItem eventKey="admin/tasks">
                  <NavText title="Projects">Task Management</NavText>
                </NavItem>
                <NavItem eventKey="admin/sprints">
                  <NavText title="Projects">Sprint Management</NavText>
                </NavItem>
              </NavItem>

              <Separator />
              <NavItem
                eventKey="logout"
                onSelect={() => {
                  Auth.logOut();
                  this.props.history.replace("/");
                }}
              >
                <NavIcon>
                  <FontAwesomeIcon
                    icon="power-off"
                    style={{ fontSize: "1.75em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText style={{ paddingRight: 32 }} title="Logout">
                  Logout
                </NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
