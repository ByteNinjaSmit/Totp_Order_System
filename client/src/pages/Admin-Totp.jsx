import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AdminTotp = () => {
  const [totp, setTotp] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();
  const [timer, setTimer] = useState(30);
  const [oldTotp, setOldTotp] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      auth: { 
        token: authorizationToken 
      },
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

  const percentage = (timer / 30) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">Admin TOTP</h2>
      {loading ? (
        <h3 className="text-lg md:text-xl text-gray-600">Loading...</h3>
      ) : (
        <div className="flex flex-wrap justify-center mb-8">
          {String(totp).split("").map((digit, index) => (
            <div
              key={index}
              className="w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 flex items-center justify-center border border-gray-300 bg-black text-white text-xl md:text-3xl lg:text-5xl font-bold mx-1 mb-2"
            >
              {digit}
            </div>
          ))}
        </div>
      )}
      <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
        <CircularProgressbar
          value={percentage}
          text={`${timer}s`}
          styles={buildStyles({
            pathColor: `rgba(255, 4, 21, ${percentage / 1})`,
            textColor: '#000',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    </div>
  );
};

export default AdminTotp;
