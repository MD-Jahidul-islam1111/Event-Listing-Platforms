import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-5">
            <Container>
                <Row className="mb-4">
                    <Col md={4} className="mb-4 mb-md-0">
                        <h4 className="mb-3">Event Finder</h4>
                        <p className="text-muted">Discover and join amazing local events in your area. From music festivals to tech conferences, find your next adventure.</p>
                        <div className="social-links mt-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </Col>
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
                            <li className="mb-2"><Link to="/events" className="text-muted text-decoration-none">Events</Link></li>
                            <li className="mb-2"><Link to="/login" className="text-muted text-decoration-none">Login</Link></li>
                            <li className="mb-2"><Link to="/register" className="text-muted text-decoration-none">Register</Link></li>
                            <li className="mb-2"><Link to="/dashboard" className="text-muted text-decoration-none">Dashboard</Link></li>
                        </ul>
                    </Col>
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5 className="mb-3">Categories</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/events?category=Music" className="text-muted text-decoration-none">Music</Link></li>
                            <li className="mb-2"><Link to="/events?category=Sports" className="text-muted text-decoration-none">Sports</Link></li>
                            <li className="mb-2"><Link to="/events?category=Arts" className="text-muted text-decoration-none">Arts</Link></li>
                            <li className="mb-2"><Link to="/events?category=Food" className="text-muted text-decoration-none">Food</Link></li>
                            <li className="mb-2"><Link to="/events?category=Technology" className="text-muted text-decoration-none">Technology</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5 className="mb-3">Newsletter</h5>
                        <p className="text-muted mb-3">Subscribe to our newsletter for the latest events and updates.</p>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant="primary" className="w-100">Subscribe</Button>
                        </Form>
                    </Col>
                </Row>
                <hr className="my-4" />
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <div className="d-flex flex-column flex-md-row">
                            <div className="me-md-4 mb-3 mb-md-0">
                                <h6 className="mb-2">Contact Us</h6>
                                <p className="text-muted mb-1">Email: info@eventfinder.com</p>
                                <p className="text-muted mb-1">Phone: (123) 456-7890</p>
                                <p className="text-muted">Address: 123 Event Street, City</p>
                            </div>
                            <div>
                                <h6 className="mb-2">Support</h6>
                                <p className="text-muted mb-1"><Link to="/faq" className="text-muted text-decoration-none">FAQ</Link></p>
                                <p className="text-muted mb-1"><Link to="/help" className="text-muted text-decoration-none">Help Center</Link></p>
                                <p className="text-muted"><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <p className="text-muted mb-2">&copy; {new Date().getFullYear()} Event Finder. All rights reserved.</p>
                        <div>
                            <Link to="/privacy" className="text-muted text-decoration-none me-3">Privacy Policy</Link>
                            <Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer; 