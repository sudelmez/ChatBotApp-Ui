import React from "react";
import "./NavBar.css";

interface NavBarProps {
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ title }) => {
  return (
    <div className="bar">
      <div className="socialIcons">
        <h1 className="drawerItem"><span className="text">{title}</span></h1>
      </div>
    </div>
  );
}

export default NavBar;
