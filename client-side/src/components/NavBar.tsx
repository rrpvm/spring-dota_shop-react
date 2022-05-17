import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export const NavigationBar = () : JSX.Element => (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Spring-React-TS-shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#cart">Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);