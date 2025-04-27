import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const EventList = () => {
  // Sample events data - this would typically come from an API
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2024-07-15',
      location: 'Central Park',
      description: 'A day of amazing music featuring local and international artists.',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: '2024-08-20',
      location: 'Convention Center',
      description: 'Annual technology conference featuring the latest innovations.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Food & Wine Festival',
      date: '2024-09-10',
      location: 'City Square',
      description: 'Taste cuisines from around the world and enjoy wine tastings.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="mb-4">Upcoming Events</h1>
      <Row>
        {events.map(event => (
          <Col key={event.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={event.image} alt={event.title} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}<br />
                  <strong>Location:</strong> {event.location}
                </Card.Text>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList; 