import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllPredictions() {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/all-predictions')
            .then(response => {
                setPredictions(response.data);
            })
            .catch(error => {
                console.error('Error fetching all predictions:', error);
            });
    }, []);

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

    const highlightPriceStyle = {
        fontWeight: 'bold',
        color: '#ff6347' // Highlight the price in a strong color like tomato red
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>All Predictions</h2>
            <table style={tableStyle}>
                <thead>
                    <tr style={headerRowStyle}>
                        <th style={cellStyle}>Valuation ID</th>
                        <th style={cellStyle}>Overall Quality</th>
                        <th style={cellStyle}>Year Built</th>
                        <th style={cellStyle}>Living Area (sqft)</th>
                        <th style={cellStyle}>Year Remodeled</th>
                        <th style={cellStyle}>Total Basement Area</th>
                        <th style={cellStyle}>1st Floor Area</th>
                        <th style={cellStyle}>Full Bathrooms</th>
                        <th style={cellStyle}>Total Rooms Above Grade</th>
                        <th style={cellStyle}>Garage Cars</th>
                        <th style={cellStyle}>Garage Area</th>
                        <th style={cellStyle}>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((prediction, index) => (
                        <tr key={prediction._id}>
                            <td style={cellStyle}>{index + 1}</td>
                            <td style={cellStyle}>{prediction.OverallQual}</td>
                            <td style={cellStyle}>{prediction.YearBuilt}</td>
                            <td style={cellStyle}>{prediction.GrLivArea}</td>
                            <td style={cellStyle}>{prediction.YearRemodAdd}</td>
                            <td style={cellStyle}>{prediction.TotalBsmtSF}</td>
                            <td style={cellStyle}>{prediction.stFlrSF}</td>
                            <td style={cellStyle}>{prediction.FullBath}</td>
                            <td style={cellStyle}>{prediction.TotRmsAbvGrd}</td>
                            <td style={cellStyle}>{prediction.GarageCars}</td>
                            <td style={cellStyle}>{prediction.GarageArea}</td>
                            <td style={{ ...cellStyle, ...highlightPriceStyle }}>${prediction.SalePrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllPredictions;
