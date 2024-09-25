import React, { useState } from 'react';
import Users from './allUsers';
import Predictions from './allPredictions';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('users'); // Default to 'users'

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Dashboard</h2>
        <button
          onClick={() => setSelectedTab('users')}
          style={selectedTab === 'users' ? styles.activeButton : styles.button}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedTab('predictions')}
          style={selectedTab === 'predictions' ? styles.activeButton : styles.button}
        >
          Predictions
        </button>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </nav>
      <main style={styles.content}>
        {selectedTab === 'users' && <Users />}
        {selectedTab === 'predictions' && <Predictions />}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f2f5',
    margin: -20
  },
  sidebar: {
    width: '250px',
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin : -20,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  sidebarTitle: {
    fontSize: '24px',
    marginBottom: '30px',
    fontWeight: 'bold',
    color : "white"
  },
  button: {
    width: '200px', // Reduced width
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    textAlign: 'center'
  },
  activeButton: {
    width: '200px', // Reduced width
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#2980b9',
    color: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    textAlign: 'center'
  },
  logoutButton: {
    marginTop: 'auto',
    width: '200px', // Reduced width
    padding: '15px',
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#ecf0f1',
    overflowY: 'auto',
    margin: -20
  },
};

export default AdminDashboard;
