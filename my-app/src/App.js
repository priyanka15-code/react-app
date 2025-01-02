import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCogs, faUser, faUserCircle, faSignOutAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prevState) => !prevState);
  };

  const handleMenuClick = (action) => {
    alert(`${action} action executed`);
    setShowProfileMenu(false);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-header">
          <img src={logo} alt="logo" className="navbar-logo" />
          <h1>My App</h1>
        </div>

        {/* Profile Button */}
        <div className="profile-container">
          <button className="profile-button" onClick={toggleProfileMenu}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </button>
          {showProfileMenu && (
            <div className="profile-menu">
              <button onClick={() => handleMenuClick('View Profile')}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                View Profile
              </button>
              <button onClick={() => handleMenuClick('Settings')}>
                <FontAwesomeIcon icon={faUserCog} style={{ marginRight: '10px' }} />
                Settings
              </button>
              <button onClick={() => handleMenuClick('Logout')}>
                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Wrapper */}
      <div className="wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>
              <button onClick={() => alert('Dashboard action executed')}>
                <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '10px' }} />
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => alert('Settings action executed')}>
                <FontAwesomeIcon icon={faCogs} style={{ marginRight: '10px' }} />
                Settings
              </button>
            </li>
            <li>
              <button onClick={() => alert('Profile action executed')}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                Profile
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Dashboard */}
        <main className="dashboard">
          <div className="dashboard-content">
            <p>WELCOME</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
