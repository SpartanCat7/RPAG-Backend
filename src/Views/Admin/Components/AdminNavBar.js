import { Container, Nav, Navbar } from "react-bootstrap";

export default function AdminNavBar({ userData }) {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                    RPAG Backend: Admin Console
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/admin">Home</Nav.Link>
                        <Nav.Link href="/admin/moderadores">Moderadores</Nav.Link>
                        <Nav.Link href="/admin/suscriptores">Suscriptores</Nav.Link>
                        <Nav.Link href="/admin/tiposDeAlerta">Tipos de Alerta</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>Hello {userData.username}</Navbar.Text>
            </Container>
        </Navbar>
    )
}