import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { configureSystem } from '../api/api'; // Import the API function

const ConfigurationForm = () => {
  const [totalTickets, setTotalTickets] = useState('');
  const [ticketReleaseRate, setTicketReleaseRate] = useState('');
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState('');
  const [maxTicketCapacity, setMaxTicketCapacity] = useState('');
  const [vendors, setVendors] = useState('');
  const [customers, setCustomers] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure the data is correctly parsed to integers before sending
    const configData = {
      totalTickets: parseInt(totalTickets),
      ticketReleaseRate: parseInt(ticketReleaseRate),
      customerRetrievalRate: parseInt(customerRetrievalRate),
      maxTicketCapacity: parseInt(maxTicketCapacity),
      numberOfVendors: parseInt(vendors),
      numberOfCustomers: parseInt(customers),
    };
    try {
      const result = await configureSystem(configData);
      setResponseMessage('Configuration successful! System is set up.');
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error('Error configuring system:', error);
      setErrorMessage('Failed to configure the system. Please try again later.');
      setResponseMessage(''); // Clear any previous success message
    }

    setShowModal(true); // Show the modal after form submission
  };

  return (
    <Container
      className="p-4 mt-4"
      style={{
          maxWidth: '550px', // Sets maximum width
          border: '2px solid #007bff', // Blue border for a defined outline
          borderRadius: '8px', // Slightly rounded corners
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient from warm orange to light peach
          marginLeft: '0', // Aligns container to the left
          paddingBottom: '5000px', // Ensures extended padding for a long scrollable area
      }}
    >
      <h6 className="text-center mb-4">Configuration</h6>
      <Form onSubmit={handleSubmit}>
        {/* Form fields for configuration */}
        <Form.Group className="mb-3" controlId="totalTickets">
          <Form.Label>Set the total number of tickets available for the event:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Total Tickets"
            value={totalTickets}
            onChange={(e) => setTotalTickets(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ticketReleaseRate">
          <Form.Label>Set how often new tickets are released by Vendors(in milliseconds):</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Ticket Release Rate (Milliseconds)"
            value={ticketReleaseRate}
            onChange={(e) => setTicketReleaseRate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="customerRetrievalRate">
          <Form.Label>Set how quickly customers can retrieve tickets (in milliseconds):</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Customer Retrieval Rate (Milliseconds)"
            value={customerRetrievalRate}
            onChange={(e) => setCustomerRetrievalRate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="maxTicketCapacity">
          <Form.Label>Specify the maximum number of tickets that can be held at once:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Max Ticket Capacity"
            value={maxTicketCapacity}
            onChange={(e) => setMaxTicketCapacity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="vendors">
          <Form.Label>Enter the number of ticket vendors for the event:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No. of Vendors"
            value={vendors}
            onChange={(e) => setVendors(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="customers">
          <Form.Label>Set the total number of customers attempting to buy tickets:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No. of Customers"
            value={customers}
            onChange={(e) => setCustomers(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Save
        </Button>
      </Form>
      {/* Modal to show success or error messages */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{responseMessage ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responseMessage ? responseMessage : errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ConfigurationForm;
