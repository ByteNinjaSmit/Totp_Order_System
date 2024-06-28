import React, { useState, useRef } from 'react';

export const TotpVerify = () => {
  const [totpCode, setTotpCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const inputs = useRef([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`TOTP code submitted: ${totpCode.join('')}`);
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
