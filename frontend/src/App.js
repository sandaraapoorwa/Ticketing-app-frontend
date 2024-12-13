import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Grid, Box } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import Dashboard from './components/Dashboard';
import ColorButtons from './components/ColorButtons';
import Database from './components/database';
import Appbar from './components/Appbar';
import './App.css';

function App() {
  const [systemStatus, setSystemStatus] = useState('Stopped');
  const [totalTicketsLeft, setTotalTicketsLeft] = useState(0);
  const [databaseEntries, setDatabaseEntries] = useState([]);

  useEffect(() => {
    // Simulating database retrieval
    const fetchData = async () => {
      // In a real application, this would be an API call
      const mockData = [
        { id: 1, name: 'Ticket 1', status: 'Available' },
        { id: 2, name: 'Ticket 2', status: 'Sold' },
        { id: 3, name: 'Ticket 3', status: 'Reserved' },
        { id: 4, name: 'Ticket 4', status: 'Available' },
        { id: 5, name: 'Ticket 5', status: 'Sold' },
      ];
      setDatabaseEntries(mockData);
    };

    fetchData();
  }, []);

  const handleSystemStart = () => {
    setSystemStatus('Started');
    setTotalTicketsLeft(100);
  };

  const handleSystemStop = () => {
    setSystemStatus('Stopped');
    setTotalTicketsLeft(0);
  };

  return (
    <div className="App">
      <Appbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ConfigurationForm />
            </Grid>
            <Grid item xs={12} md={8}>
              <Dashboard status={systemStatus} totalTicketsLeft={totalTicketsLeft} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ColorButtons onStart={handleSystemStart} onStop={handleSystemStop} />
            </Grid>
            <Grid item xs={12}>
              <Database entries={databaseEntries} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;

