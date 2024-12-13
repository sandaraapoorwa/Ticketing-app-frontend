import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getLogs } from '../api/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Database = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch logs from API
  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedLogs = await getLogs();
      console.log('Fetched logs:', fetchedLogs); // For debugging
      setLogs(fetchedLogs);
    } catch (err) {
      setError('Failed to fetch logs. Please try again later.');
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch logs when component mounts
  useEffect(() => {
    fetchLogs();
  }, []);

  // Process logs to prepare data for the chart
  const processLogsForChart = () => {
    const sortedLogs = [...logs].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const labels = sortedLogs.map(log => new Date(log.timestamp).toLocaleString());
    const data = sortedLogs.map((_, index) => index + 1); // Cumulative count of tickets

    return { labels, data };
  };

  const { labels, data } = processLogsForChart();

  // Chart.js data and options
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Tickets',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ticket Log Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Tickets'
        }
      },
      x: {
        title: {
          display: true,
          text: 'TimeStamp'
        }
      }
    }
  };

  return (
    <div
      style={{
        margin: '20px auto',
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        background: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
      }}
    >
      <Container className="mt-4">
        <Row>
          <Col className="text-center mb-4">
            <h3>Ticket Flow Rate Chart</h3>
            <br />
            <Button 
              onClick={fetchLogs} 
              className="mb-3" 
              variant="primary" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : 'Refresh Logs'}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="p-3 border rounded"
              style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: 'white',
              }}
            >
              {error ? (
                <p className="text-danger text-center">{error}</p>
              ) : logs.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <p className="text-center">No logs to display. Click "Refresh Logs" to load the data.</p>
              )}
            </div>
          </Col>
        </Row>

        {/* Table for Logs */}
        <Row className="mt-5">
          <Col>
            <div
              className="p-3 border rounded"
              style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: 'white',
              }}
            >
              <h4 className="text-center mb-3">Ticket Logs Table</h4>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Customer ID</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={index}>
                        <td>{log.ticketId || 'N/A'}</td>
                        <td>{log.customerId || 'N/A'}</td>
                        <td>{log.status || 'N/A'}</td>
                        <td>{new Date(log.timestamp).toLocaleString() || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Database;
