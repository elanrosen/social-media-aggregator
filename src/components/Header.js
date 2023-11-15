import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Social Aggregator</h1>
      <Link to="/settings">Settings</Link>
    </header>
  );
}

export default Header;
