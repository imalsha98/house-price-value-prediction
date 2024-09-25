import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        mobile: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.mobile === '0773352058' && formData.password === 'admin123') {
                navigate('/admindashboard');
            } else {
                const response = await axios.post('http://127.0.0.1:5000/login', formData);
            
                localStorage.setItem('mobile', response.data.user.mobile);
                alert('Login successful');
                navigate('/home');
            }
            
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                        value={formData.mobile}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.loginButton}>Login</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <p style={styles.orText}>or</p>
                <button onClick={() => navigate('/register')} style={styles.registerButton}>
                    Register
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
        color: '#333333',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
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
        marginBottom: '10px', 
    },
    orText: {
        textAlign: 'center',
        margin: '10px 0',
        fontSize: '14px',
        color: '#2c3e50',
    },
    registerButton: {
        width: '100%', 
        padding: '10px',
        backgroundColor: '#ffffff', 
        color: '#2c3e50', 
        border: '2px solid #2c3e50', // Blue border
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    }
};

export default Login;
