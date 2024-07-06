import React, { useState } from 'react';
import { useAuth } from "../store/auth";
import { Navigate, useNavigate } from "react-router-dom";
import QrScanner from 'react-qr-scanner';

export const Qr = () => {
    const { user } = useAuth();
    const [scannedData, setScannedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleScan = (data) => {
        if (data) {
            setScannedData(data.text);
            navigate(data.text); // Assuming the QR code contains a valid URL
        }
    };

    const handleError = (err) => {
        // console.error(err);
        setErrorMessage('Camera access is required to scan QR codes. Please ensure your camera is connected and you have granted permissions.');
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-center mt-3 pt-3 pb-3 text-2xl font-semibold">Scan QR On Table</h1>
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            {!scannedData && !errorMessage && (
                <div className="qr-reader-container mt-4 p-4 bg-white rounded shadow-lg">
                    <QrScanner
                        delay={300}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />
                </div>
            )}
        </div>
    );
};
