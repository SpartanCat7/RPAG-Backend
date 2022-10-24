import { Container, Nav, Navbar } from "react-bootstrap";

export default function ModNavBar({ userData }) {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                    RPAG Backend: Mod Console
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/mod">Home</Nav.Link>
                        <Nav.Link href="/mod/content_moderation">Modding tools</Nav.Link>
                        <Nav.Link href="/mod/user_view">User management</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>Hello {userData.username}</Navbar.Text>
            </Container>
        </Navbar>
    )
}