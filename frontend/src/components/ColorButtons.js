import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { toast, ToastContainer } from "react-toastify"; // Import Toastify for popups
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

const ColorButtons = ({ onStart, onStop }) => {
  const [isSystemRunning, setIsSystemRunning] = useState(false); // Track system state

  const handleStartSystem = async () => {
    try {
      const response = await axios.post("http://localhost:8080/ticketing/start");
      console.log(response.data); // Log the response from the backend
      if (response.data === "System is not configured. Please configure first.") {
        toast.error("System is not configured. Please configure first.");
      } else if (response.data === "System started successfully. Vendors and customers are now active.") {
        toast.success("System started successfully! Vendors and customers are now active.");
        setIsSystemRunning(true); // Update system state
        onStart(); // Call the onStart callback to update UI or state
      } else {
        toast.error("Failed to start the system.");
      }
    } catch (error) {
      console.error("Error starting the system:", error);
      toast.error("An error occurred while starting the system.");
    }
  };

  const handleStopSystem = async () => {
    try {
      const response = await axios.post("http://localhost:8080/ticketing/stop");
      console.log(response.data); // Log the response from the backend
      if (response.data === "System is not configured. Please configure first.") {
        toast.error("System is not configured. Please configure first.");
      } else if (response.data === "System stopped successfully. All threads have been terminated.") {
        toast.success("System stopped successfully! All threads have been terminated.");
        setIsSystemRunning(false); // Update system state
        onStop(); // Call the onStop callback to update UI or state
      } else if (response.data === "System is already stopped.") {
        toast.warning("System is already stopped.");
      } else {
        toast.error("Failed to stop the system.");
      }
    } catch (error) {
      console.error("Error stopping the system:", error);
      toast.error("An error occurred while stopping the system.");
    }
  };

  return (
    <div
      className="container border p-4 rounded shadow"
      style={{
        background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        height: "220px",
        width: "135%",
        display: "grid",
        marginTop: "-183%", // Move the component up
        marginBottom: "8%",
        padding: "30%",
        marginLeft: "-50%",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h4 className="text-center text-primary mb-4">System Controls</h4>
      <div className="d-flex flex-column gap-3">
        <button
          className="btn btn-success btn-lg"
          onClick={handleStartSystem}
          disabled={isSystemRunning} // Disable button if the system is already running
        >
          Start System
        </button>
        <button
          className="btn btn-outline-danger btn-lg"
          onClick={handleStopSystem}
          disabled={!isSystemRunning} // Disable button if the system is not running
        >
          Stop System
        </button>
      </div>
      <ToastContainer /> {/* Toastify container to display popups */}
    </div>
  );
};

export default ColorButtons;
