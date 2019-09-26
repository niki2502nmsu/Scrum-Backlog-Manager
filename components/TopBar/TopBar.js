import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import auth from "../../auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Shadow = styled.div`
  -webkit-box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.83);
  -moz-box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.83);
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.83);
`;

function TopBar(props) {
  const logOut = () => {
    auth.logOut();
    props.history.replace("/");
  };
  let [isOpen, toggle] = useState(false);

  const toggleSideBar = () => {
    toggle((isOpen = !isOpen));
  };

  return (
    <Shadow>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <FontAwesomeIcon icon="spider" /> Backlog Manager
        </NavbarBrand>
        <NavbarToggler onClick={toggleSideBar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                {auth.isAuthenticated() && <label>{auth.getName()}</label>}
              </NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    logOut();
                  }}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Shadow>
  );
}

export default withRouter(TopBar);
