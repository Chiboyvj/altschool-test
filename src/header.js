import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h3>
        <Link to="/">My Github Repository List</Link>
      </h3>
    </div>
  );
};

export default Header;
