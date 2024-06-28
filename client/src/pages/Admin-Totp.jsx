import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminTotp = () => {
  const [totp, setTotp] = useState(null);
  const [oldTotp, setOldTotp] = useState(null);
  const { authorizationToken } = useAuth();
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(30);

  // Function to fetch TOTP from API
  const getTotp = async () => {
    try {
      console.log("Fetching TOTP...");
      const response = await fetch("http://localhost:5000/api/admin/totp", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTotp(data.currentNumber);
      // console.log("TOTP fetched:", data.currentNumber);
    } catch (error) {
      setError(error.message);
      // console.error("Error fetching TOTP:", error);
    }
  };

  // Effect to fetch TOTP initially and then every 30 seconds
  useEffect(() => {
    getTotp(); // Fetch initially

    const intervalId = setInterval(() => {
      getTotp().catch((error) => {
        setError(error.message);
      });
    }, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [authorizationToken]);

  // Effect to check and update TOTP
  useEffect(() => {
    if (totp !== oldTotp) {
      setOldTotp(totp);
      setTimer(30); // Reset the timer to 30 seconds
    }
  }, [totp, oldTotp]);

  // Effect to countdown timer every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 30));
    }, 1000); // Countdown every second

    return () => clearInterval(timerId); // Clear interval on component unmount
  }, []);

  const boxStyle = {
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #000",
    margin: "0 5px",
    fontSize: "30px",
    color: "white",
    background: "black",
    fontWeight: "bold",
  };

  const extraMarginRight = {
    marginRight: "15px",
  };

  const extraMarginLeft = {
    marginLeft: "10px",
  };

  return (
    <>
      <h2 className="text-center mt-4">Admin TOTP</h2>
      {totp ? (
        <div className="d-flex justify-content-center mt-2">
          {String(totp).split("").map((digit, index) => (
            <div
              key={index}
              style={{
                ...boxStyle,
                ...(index === 2 ? extraMarginRight : {}),
                ...(index === 3 ? extraMarginLeft : {}),
              }}
            >
              {digit}
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center mt-3">Loading...</h3>
      )}
      <h3 className="text-center mt-3">Next update in: {timer} seconds</h3>
      {error && <p className="text-center text-danger">{error}</p>}
    </>
  );
};
