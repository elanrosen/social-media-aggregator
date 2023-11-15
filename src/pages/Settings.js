import React from 'react';
import './Settings.css';

function Settings() {
    return (
      <div>
        <h2>Settings</h2>
        <form>
          {/* Example setting: Email Address */}
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" />
          </div>
          {/* Add more settings here */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }

export default Settings;
