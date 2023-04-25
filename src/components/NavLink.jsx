import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ name, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link to={path}>
      <div
        className={`cursor-pointer hover:scale-105 transition-transform duration-300 ${
          isActive && "text-gradient"
        }`}
      >
        {name}
      </div>
    </Link>
  );
};

export default NavLink;
