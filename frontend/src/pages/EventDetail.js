import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import axios from '../utils/axios';
import useStore from '../store/useStore';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useStore(state => state.user);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to load event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setRegistering(true);
        try {
            await axios.post(`/registrations`, {
                eventId: id,
                ticketType: 'regular'
            });
            // Refresh event data to show updated registration status
            const response = await axios.get(`/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to register for event');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!event) {
        return <div className="text-center mt-5">Event not found</div>;
    }

    const isRegistered = event.registeredUsers?.includes(user?._id);
    const isFull = event.registeredUsers?.length >= event.capacity;

    return (
        <Container className="py-5">
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h1 className="mb-3">{event.title}</h1>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <div className="mb-3">
                                <Badge bg="primary" className="me-2">{event.category}</Badge>
                                <Badge bg="secondary">{event.location}</Badge>
                            </div>
                            <p className="text-muted">
                                <i className="bi bi-calendar-event me-2"></i>
                                {new Date(event.date).toLocaleString()}
                            </p>
                            <hr />
                            <h4>Description</h4>
                            <p>{event.description}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h4>Event Details</h4>
                            <p><strong>Organizer:</strong> {event.organizer?.name}</p>
                            <p><strong>Capacity:</strong> {event.capacity} attendees</p>
                            <p><strong>Registered:</strong> {event.registeredUsers?.length || 0} attendees</p>
                            <p><strong>Status:</strong> {event.status}</p>
                            <div className="d-grid gap-2 mt-3">
                                {isRegistered ? (
                                    <Button variant="success" disabled>
                                        Already Registered
                                    </Button>
                                ) : isFull ? (
                                    <Button variant="secondary" disabled>
                                        Event Full
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={handleRegister}
                                        disabled={registering}
                                    >
                                        {registering ? 'Registering...' : 'Register Now'}
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EventDetail; 