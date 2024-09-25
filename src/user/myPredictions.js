import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPredictions() {
    const [predictions, setPredictions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const mobileNumber = localStorage.getItem('mobile');

        if (mobileNumber) {
            axios.get(`http://127.0.0.1:5000/predictions?mobile=${mobileNumber}`)
                .then(response => {
                    setPredictions(response.data);
                })
                .catch(error => {
                    console.error('Error fetching predictions:', error);
                });
        }
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>ValueVisor</h1>
                <div style={styles.headerButtons}>
                    <button 
                        onClick={() => navigate('/home')} 
                        style={styles.homeButton}
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        style={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>
            </header>
            <div style={styles.predictionContainer}>
                {predictions.length === 0 ? (
                    <p style={styles.noData}>No predictions available</p>
                ) : (
                    predictions.map((prediction, index) => (
                        <div key={prediction._id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <h2 style={styles.cardTitle}>Valuation {index + 1}</h2>
                                <p>Overall Quality: {prediction.OverallQual}</p>
                                <p>Year Built: {prediction.YearBuilt}</p>
                                <p>Living Area: {prediction.GrLivArea} sqft</p>
                                <p>Year Remodeled: {prediction.YearRemodAdd}</p>
                                <p>Total Basement Area: {prediction.TotalBsmtSF}</p>
                                <p>1st Floor Area: {prediction.stFlrSF}</p>
                                <p>Full Bathrooms: {prediction.FullBath}</p>
                                <p>Total Rooms Above Grade: {prediction.TotRmsAbvGrd}</p>
                                <p>Garage Cars: {prediction.GarageCars}</p>
                                <p>Garage Area: {prediction.GarageArea}</p>
                            </div>
                            <div style={styles.price}>
                                Sale Price: ${prediction.SalePrice}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        overflow: 'hidden',
        margin: -20,
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
        
    },
    title: {
        margin: 0,
        fontSize: '24px',
        flex: 1,
        textAlign: 'center',
    },
    headerButtons: {
        display: 'flex',
        alignItems: 'center',
        margin : 30
    },
    homeButton: {
        marginRight: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#3498db',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    logoutButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    predictionContainer: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '16px',
        overflowX: 'auto',
    },
    noData: {
        fontSize: '18px',
        color: '#888',
        textAlign: 'center',
        marginTop: '20px',
        width: '100%',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '280px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '250px',
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        marginTop: 0,
        fontSize: '18px',
        color: '#333',
    },
    price: {
        marginTop: '16px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#ffd700',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.1em',
        color: '#333',
    },
};

export default MyPredictions;
