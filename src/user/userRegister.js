import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        mobile: '',
        password: '',
        retypePassword: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Regular expressions for validation
    const mobileRegex = /^[0-9]+$/; // Only numbers
    const passwordMinLength = 6; // Minimum length for password

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (formData.password !== formData.retypePassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < passwordMinLength) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (!mobileRegex.test(formData.mobile)) {
            setError('Mobile number should contain only numbers');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/register', formData);
            alert('Registration successful');
            setFormData({
                username: '',
                fullname: '',
                mobile: '',
                password: '',
                retypePassword: ''
            });
            navigate('/'); // Navigate to login page
        } catch (error) {
            setError('Error registering user');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.title}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={formData.username}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        onChange={handleChange}
                        value={formData.fullname}
                        style={styles.input}
                    />
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                        value={formData.mobile}
                        style={styles.input}
                        pattern="[0-9]{10,15}" // Restrict input to 10-15 digits
                        maxLength="15" // Limit input length
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="retypePassword"
                        placeholder="Retype Password"
                        onChange={handleChange}
                        value={formData.retypePassword}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.registerButton}>Register</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <p style={styles.orText}>or</p>
                <button onClick={() => navigate('/')} style={styles.loginButton}>
                    Login
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
    },
    box: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    registerButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#ffffff', 
        color: '#2c3e50',
        border: '2px solid #2c3e50', 
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        marginBottom: '10px', 
    },
    loginButton: {
        width: '100%', 
        padding: '10px',
        backgroundColor: '#2c3e50', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    orText: {
        textAlign: 'center',
        margin: '10px 0',
        fontSize: '14px',
        color: '#2c3e50',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    }
};

export default UserRegister;
