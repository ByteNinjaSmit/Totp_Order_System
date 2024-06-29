import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";

const AdminTotp = () => {
  const [totp, setTotp] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();
  const [timer, setTimer] = useState(30);
  const [oldTotp, setOldTotp] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { token: authorizationToken },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.on("newNumber", (newNumber) => {
      console.log("Received newNumber:", newNumber);
      setTotp(newNumber);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [authorizationToken]);
  useEffect(() => {
    if (totp !== oldTotp) {
      setOldTotp(totp);
      setTimer(30); // Reset the timer to 30 seconds
    }
  }, [totp, oldTotp]);
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 30));
    }, 1000); // Countdown every second

    return () => clearInterval(timerId); // Clear interval on component unmount
  }, []);

  return (
    <>
      <h2 className="text-center mt-4">Admin TOTP</h2>
      {loading ? (
        <h3 className="text-center mt-3">Loading...</h3>
      ) : (
        <div className="d-flex justify-content-center mt-2">
          {String(totp).split("").map((digit, index) => (
            <div
              key={index}
              style={{
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
              }}
            >
              {digit}
            </div>
          ))}
        </div>
      )}
      <h3 className="text-center mt-3">Next update in: {timer} seconds</h3>
    </>
  );
};

export default AdminTotp;
