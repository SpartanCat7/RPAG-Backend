import { Container, Nav, Navbar } from "react-bootstrap";

export default function SubNavBar({ userData }) {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                    RPAG Backend: Subscriptions Console
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/sub">Home</Nav.Link>
                        <Nav.Link href="/sub/subscription_management">Modding tools</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>Hello {userData.username}</Navbar.Text>
            </Container>
        </Navbar>
    )
}