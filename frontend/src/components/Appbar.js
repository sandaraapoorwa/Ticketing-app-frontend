import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Appbar() {
  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      style={{
        width: '100%',
        justifyContent: 'center', // Centers the content horizontally
      }}
    >
      <Container 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          maxWidth: '175%' // Adjust width here for additional flexibility 
        }}
      >
        <Navbar.Brand 
          className="mx-auto" 
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center' 
          }}
        >
          Real-Time Ticketing Simulation System
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
