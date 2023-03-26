import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import "../styles/search-bar.css";

function NavBar({ onSubmit }) {

    const [query, setQuery] = useState('');

    const handleFormSubmit = (event) => {
            event.preventDefault();
            onSubmit(query);
    };
   
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
            <Navbar className="navbar-body label-color fixed-top" expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand className="text-light ml-3" href="#">Fish Library</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        defaultActiveKey="/home"
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className="text-light" href="#">Borrowed</Nav.Link>
                        <Nav.Link className="text-light" href="#action2">Your History</Nav.Link>
                        <Nav.Link className="text-light" href="#action2">Contact</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleFormSubmit}>
                        <Form.Control
                        value={query}
                        onChange={handleChange}
                        type="search"
                        placeholder="Search for books"
                        className="me-2 bg-secondary border-dark text-light"
                        />
                        <Button className="button-color text-light" onClick={handleFormSubmit}>Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
    }
export default NavBar;
