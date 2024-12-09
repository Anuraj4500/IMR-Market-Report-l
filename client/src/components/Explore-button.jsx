import React from 'react';
import { Link } from 'react-router-dom';
const ExploreButton = ({ name, to }) => {
  return (
    <Link to={to} className="btn">
      &nbsp;&nbsp;<i className="bx bx-chevron-right"></i> {name}
    </Link>
  );
}

export default ExploreButton;