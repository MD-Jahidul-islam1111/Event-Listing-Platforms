import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios';
import useStore from '../store/useStore';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useStore(state => state.user);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserEvents = async () => {
            try {
                const response = await axios.get('/api/events/user');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching user events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEvents();
    }, [user, navigate]);

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`/api/events/${eventId}`);
                setEvents(events.filter(event => event._id !== eventId));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleEditEvent = (eventId) => {
        navigate(`/events/edit/${eventId}`);
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2>My Dashboard</h2>
                    <p className="text-muted">Manage your events and profile</p>
                </Col>
                <Col className="text-end">
                    <Button 
                        variant="primary" 
                        onClick={() => navigate('/events/create')}
                    >
                        Create New Event
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Profile Summary</Card.Title>
                            <div className="text-center mb-3">
                                <img
                                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Events Created:</strong> {events.length}</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Events</Card.Title>
                            {events.length === 0 ? (
                                <p className="text-center text-muted">You haven't created any events yet.</p>
                            ) : (
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Event Name</th>
                                            <th>Date</th>
                                            <th>Location</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map(event => (
                                            <tr key={event._id}>
                                                <td>{event.name}</td>
                                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                                <td>{event.location}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleEditEvent(event._id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteEvent(event._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard; 