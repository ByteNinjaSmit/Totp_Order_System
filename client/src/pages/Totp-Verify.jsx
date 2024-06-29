import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "./../store/auth";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const TotpVerify = () => {
  const [totpCode, setTotpCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const params = useParams();
  const inputs = useRef([]);
  const { user, authorizationToken } = useAuth();
  const [orderData, setOrderData] = useState({
    totp: "",
    username: "",
    phone: "",
    service: "",
    provider: "",
    price: "",
  });

  // ----------------
  // To Get Single Service Data Dynamically Logic
  // ------------------------

  const getSingleServiceData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/service/order/data/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch service data');
      }
      const data = await response.json();
      setOrderData({
        username: user.username,
        phone: user.phone,
        service: data.Service,
        provider: data.Provider,
        price: data.Price,
      });
    } catch (error) {
      console.log(`Single Service Data Error: ${error}`);
    }
  };


  useEffect(() => {
    getSingleServiceData();
  }, [params.id]);

  // ----------------
  // To POST Order Data Perfectly Logic
  // ------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullTotpCode = totpCode.join('');

    const updatedOrderData = {
      ...orderData,
      totp: fullTotpCode,
    };

    setOrderData(updatedOrderData);

    // Delay the POST request by 1.5 seconds
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/totp/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(updatedOrderData),
        });
        if (response.ok) {
          toast.success("Order Successful");
          navigate("/");
        } else {
          toast.error("Order Failed, Enter Correct TOTP");
        }
      } catch (error) {
        console.log(`Error from TOTP post: ${error}`);
      }
    }, 1500);
  };


  const handleInputChange = (index) => (event) => {
    const { value } = event.target;
    if (/^[0-9]$/.test(value)) {
      const newCode = [...totpCode];
      newCode[index] = value;
      setTotpCode(newCode);
      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    }

  };

  const handleKeyPress = (event) => {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newCode = [...totpCode];
      newCode[index] = '';
      setTotpCode(newCode);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Verify TOTP</h1>
      <form style={{ textAlign: 'center', marginTop: '20px' }} onSubmit={handleSubmit}>
        {totpCode.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={handleInputChange(index)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown(index)}
            maxLength={1}
            ref={(el) => (inputs.current[index] = el)}
            required
            style={{
              width: '40px',
              height: '40px',
              margin: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '24px',
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
            }}
          />
        ))}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <hr style={{ border: 'none', borderTop: '1px solid #ccc' }} />
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};
