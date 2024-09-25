import './HouseValuePredictor.css';

import React, { useState } from 'react';
import axios from 'axios';
import './HouseValuePredictor.css'; 
import { useNavigate } from 'react-router-dom';

function HouseValuePredictor() {
    const [formData, setFormData] = useState({
        OverallQual: '',
        YearBuilt: '',
        YearRemodAdd: '',
        TotalBsmtSF: '',
        stFlrSF: '',
        GrLivArea: '',
        FullBath: '',
        TotRmsAbvGrd: '',
        GarageCars: '',
        GarageArea: ''
    });

    const navigate = useNavigate();

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            setPrediction(response.data.SalePrice);
        } catch (error) {
            console.error('Error fetching the prediction:', error);
        }
    };

    const handleSave = async () => {
        const cusMobile = localStorage.getItem('mobile')
        console.log("ff",cusMobile);
        
        if (prediction === null) {
            console.error('Prediction is not available.');
            return;
        }
        console.log("data::",formData);
        
        try {
            await axios.post('http://127.0.0.1:5000/save', {
                ...formData,
                SalePrice: prediction,
                mobile: cusMobile
                
            });
            console.log("new data",formData);
            
            alert('Data saved successfully!');
            navigate("/home")
        } catch (error) {
            console.error('Error saving the data:', error);
        }
    };

    return (
        <div style={{margin:-20}}>
            <header style={styles.header}>
                <h1 style={styles.title}>ValueVisor</h1>
                <button 
                        onClick={() => navigate('/home')} 
                        style={styles.homeButton}
                    >
                        Home
                    </button>
                <button onClick={() => navigate('/')} style={styles.logoutButton}>
                    Logout
                </button>
            </header>
                <div style={styles.predictionContainer}>
                <h2>House Value Prediction</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: '40%' }}>
                    <input type="text" name="OverallQual" placeholder="Overall Quality" onChange={handleChange} />
                    <input type="text" name="YearBuilt" placeholder="Year Built" onChange={handleChange} />
                    <input type="text" name="YearRemodAdd" placeholder="Year Remodeled" onChange={handleChange} />
                    <input type="text" name="TotalBsmtSF" placeholder="Total Basement Area" onChange={handleChange} />
                    <input type="text" name="stFlrSF" placeholder="1st Floor Area" onChange={handleChange} />
                    <input type="text" name="GrLivArea" placeholder="Ground Living Area" onChange={handleChange} />
                    <input type="text" name="FullBath" placeholder="Full Bathrooms" onChange={handleChange} />
                    <input type="text" name="TotRmsAbvGrd" placeholder="Total Rooms Above Grade" onChange={handleChange} />
                    <input type="text" name="GarageCars" placeholder="Garage Cars" onChange={handleChange} />
                    <input type="text" name="GarageArea" placeholder="Garage Area" onChange={handleChange} />
                    <button type="submit" style={{background:"#2c3e50"}}>Predict</button>
                </form>
            </div>
          
        </div>

    {prediction && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <h3>Predicted Sale Price: ${prediction}</h3>
            <button 
                onClick={handleSave} 
                style={{
                    width: '20%', 
                    padding: '10px', 
                    backgroundColor: '#2c3e50', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'center',
                    fontSize: '16px',
                    marginTop: '10px'
                }}
            >
                Save
            </button>
        </div>
    )}
</div>

    
    );
}

const styles = {
    // container: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     height: '80vh',
    //     overflow: 'hidden',
    //     margin: -20
    // },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10vh', // 10% of viewport height
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
    
};

export default HouseValuePredictor;
