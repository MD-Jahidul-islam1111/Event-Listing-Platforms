import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">Discover Amazing Events</h1>
              <p className="lead mb-4">
                Find and join the best events in your area. From music festivals to tech conferences,
                there's something for everyone.
              </p>
              <Button as={Link} to="/events" variant="light" size="lg" className="me-3">
                Browse Events
              </Button>
              <Button as={Link} to="/create-event" variant="outline-light" size="lg">
                Create Event
              </Button>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Events"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose EventHub?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <i className="fas fa-calendar-alt fa-3x mb-3 text-primary"></i>
              <h3>Easy Event Discovery</h3>
              <p>Find events that match your interests and location with our advanced search.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <i className="fas fa-ticket-alt fa-3x mb-3 text-primary"></i>
              <h3>Simple Registration</h3>
              <p>Register for events with just a few clicks and manage your tickets in one place.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <i className="fas fa-users fa-3x mb-3 text-primary"></i>
              <h3>Community Driven</h3>
              <p>Connect with other event-goers and share your experiences.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home; 