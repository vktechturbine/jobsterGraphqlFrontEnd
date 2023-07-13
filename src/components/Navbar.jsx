import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaCircle, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/Logo";
import { logoutUser, toggleSidebar } from "../features/user/userSlice";
import { clearStore } from "../features/user/userSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    
     <main className="navbar">
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <FaCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore(`Logout Successful...`));
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
     </main>
    
  );
};

export default Navbar;
