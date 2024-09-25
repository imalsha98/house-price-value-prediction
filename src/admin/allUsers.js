import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
            alert('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '1rem',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        marginTop: '20px'
    };

    const headerRowStyle = {
        backgroundColor: '#2c3e50', // Match the sidebar color
        color: '#ffffff',
        textAlign: 'left',
        fontWeight: 'bold'
    };

    const cellStyle = {
        padding: '12px 15px',
        border: '1px solid #ddd',
        textAlign: 'center'
    };

    const buttonStyle = {
        backgroundColor: '#dc3545',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        margin: '5px',
        outline: 'none'
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>All Users</h2>
            <table style={tableStyle}>
                <thead>
                    <tr style={headerRowStyle}>
                        <th style={cellStyle}>ID</th>
                        <th style={cellStyle}>Username</th>
                        <th style={cellStyle}>Full Name</th>
                        <th style={cellStyle}>Mobile</th>
                        <th style={cellStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={cellStyle}>{user._id}</td>
                            <td style={cellStyle}>{user.username}</td>
                            <td style={cellStyle}>{user.fullname}</td>
                            <td style={cellStyle}>{user.mobile}</td>
                            <td style={cellStyle}>
                                <button
                                    style={buttonStyle}
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;
