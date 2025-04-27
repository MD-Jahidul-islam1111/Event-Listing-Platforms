import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';
import axios from '../axios';
import useStore from '../store/useStore';

const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useStore(state => state.user);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/api/events/${id}`);
                // Verify that the event belongs to the current user
                if (response.data.organizer !== user._id) {
                    navigate('/dashboard');
                    return;
                }
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
                navigate('/dashboard');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchEvent();
    }, [id, user, navigate]);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            await axios.put(`/api/events/${id}`, formData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!event) {
        return <div className="text-center mt-5">Event not found</div>;
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="mb-4">Edit Event</h2>
                    <EventForm 
                        event={event} 
                        onSubmit={handleSubmit} 
                        loading={loading} 
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default EditEvent; 