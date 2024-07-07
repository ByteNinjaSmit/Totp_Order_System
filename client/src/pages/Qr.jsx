import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';

export const Qr = () => {
    const [scannedData, setScannedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check for browser support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setErrorMessage('Camera not supported in this browser. Please use a modern browser with camera support.');
        }
    }, []);

    const handleScan = (data) => {
        if (data) {
            setScannedData(data.text);
            try {
                const url = new URL(data.text);
                navigate(url.pathname);
            } catch (e) {
                setErrorMessage('Invalid QR code scanned.');
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
        setErrorMessage('Camera access is required to scan QR codes. Please ensure your camera is connected and you have granted permissions.');
    };

    const previewStyle = {
        height: 'auto',
        width: '100%',
        maxWidth: '320px',
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
