import React from "react";
import "./NavBar.css";
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bar">
      <div className="socialIcons">
        <h1 className="drawerItem"><span className="text">{title}</span></h1>
        {/* <span className="material-icons">star</span> */}
      </div>
    </div>
  );
}

export default NavBar;
