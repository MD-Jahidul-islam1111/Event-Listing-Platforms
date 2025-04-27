import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import axios from '../axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || event.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'music', 'sports', 'technology', 'food', 'arts'];

  return (
    <Container className="py-4">
      <h1 className="mb-4">Events</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : filteredEvents.length === 0 ? (
        <div className="alert alert-info">No events found matching your criteria.</div>
      ) : (
        <Row>
          {filteredEvents.map(event => (
            <Col key={event._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={event.image || 'https://via.placeholder.com/300x200?text=Event'} 
                  alt={event.title}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text className="text-muted">
                    <small>
                      <i className="bi bi-calendar-event me-1"></i>
                      {new Date(event.date).toLocaleDateString()}
                    </small>
                  </Card.Text>
                  <Card.Text>{event.description.substring(0, 100)}...</Card.Text>
                  <Badge bg="primary" className="me-2">{event.category}</Badge>
                  <Badge bg="secondary">{event.location}</Badge>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  <Button variant="outline-primary" className="w-100">
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Events; 