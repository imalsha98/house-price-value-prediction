import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Redirect to login page
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>ValueVisor</h1>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </header>
            <div style={styles.imageContainer}>
                <img
                    src="https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg"
                    alt="Beautiful House"
                    style={styles.image}
                />
            </div>
            <div style={styles.buttonSection}>
                <button onClick={() => handleNavigate('/predict')} style={styles.button}>
                    Value New Property
                </button>
                <button onClick={() => handleNavigate('/mypredictions')} style={styles.button}>
                    My Properties
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        margin: -20,
        padding: 0,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10vh', 
        padding: '10px 20px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 1,
        margin: 0,
    },
    title: {
        margin: 0,
        fontSize: '24px',
        flex: 1, 
        textAlign: 'center',
    },
    logoutButton: {
        marginRight: '5%',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    imageContainer: {
        flex: 1, 
        width: '100%',
        overflow: 'hidden',
        margin: 0, 
        padding: 0, 
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block', 
        margin: 0,
        padding: 0,
    },
    buttonSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15vh', 
        width: '100%',
        backgroundColor: '#f7f9fc',
        margin: 0,
    },
};

export default Home;
