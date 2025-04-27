import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const NavigationBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token'); // Simple auth check

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar bg="white" expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-text">
                    EventHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                        <Nav.Link as={Link} to="/events" className="nav-link-custom">Events</Nav.Link>
                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="nav-link-custom">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/create-event" className="nav-link-custom">Create Event</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <Button variant="outline-primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline-primary" as={Link} to="/login" className="me-2">
                                    Login
                                </Button>
                                <Button variant="primary" as={Link} to="/signup">
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
