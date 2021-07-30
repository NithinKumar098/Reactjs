import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import classes from "./MainHeader.module.css";
import MenuIcon from "../../svg/Menu";
import SidePanel from "../sidePanel/SidePanel";
import AuthContext from "../../store/auth-context";

function MainHeader(props) {
  const [openSidepanel, setOpenSidepanel] = useState(false);

  const authCtx = useContext(AuthContext);

  const handleSidePanel = () => {
    setOpenSidepanel(true);
  }

  const handleClosePanel = () => {
    setOpenSidepanel(false);
  }

  const handleLogout = () => {
    setOpenSidepanel(false);
    authCtx.onLogout();
  }

  return (
    <div className={classes.header}>
      {openSidepanel && authCtx.isLoggedIn && (
        <SidePanel closeSidepanel={handleClosePanel}>
          {authCtx.isLoggedIn &&
            <nav>
              <NavLink activeClassName={classes.active} to="/home" onClick={handleClosePanel}> Home </NavLink>
              <NavLink activeClassName={classes.active} to="/profile" onClick={handleClosePanel}> Profile </NavLink>
              <NavLink activeClassName={classes.active} to="/to-do" onClick={handleClosePanel}> Add ToDo </NavLink>
              <NavLink to="/" onClick={handleLogout}> Logout </NavLink>
            </nav>
          }
        </SidePanel>
      )}

      {authCtx.isLoggedIn && <MenuIcon onClick={handleSidePanel} />}
    </div >
  )
}

export default MainHeader;