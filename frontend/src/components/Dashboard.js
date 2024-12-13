import {useState, useEffect} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Dashboard = ({ status, totalTicketsLeft }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const { lastMessage } = useWebSocket('ws://localhost:8080/ws');

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => ([lastMessage, ...prev]));
    }
  }, [lastMessage]);

  return (
    <div
      className="container border rounded p-4"
      style={dashboardStyles.container}
    >

      {/* Log Section */}
      <div>
        <h6>System Log</h6>
        <div style={dashboardStyles.logContainer}>
          {/* Placeholder for log entries */}
          <p style={dashboardStyles.logText}>System initialized...<br/>
          {messageHistory.map((message, idx) => (
            <>
              <span key={idx}>{message ? message.data : null}</span>
              <br/>
            </>
          ))}
          </p>
        </div>
      </div>
    </div>
  );
};

const dashboardStyles = {
  container: {
    background: 'linear-gradient(to right, #1e293b 0%, #374151 100%)', // Dark grey-blue gradient
    color: '#e5e7eb', // Light grey for text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '500px',
    marginTop: '-57%',
    marginLeft: '79%',
    height: '50vh',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
  },
  logContainer: {
    height: '300px',
    backgroundColor: '#111827', // Very dark grey
    padding: '10px',
    borderRadius: '5px',
    overflowY: 'auto',
    border: '1px solid #1f2937', // Border for separation
  },
  logText: {
    color: '#9ca3af', // Muted grey for log text
  },

};

export default Dashboard;