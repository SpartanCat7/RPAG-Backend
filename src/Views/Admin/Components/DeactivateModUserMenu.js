import { Container, Row, Button } from "react-bootstrap";

export default function DeactivateModUserMenu(props) {
    return (
        <Container>
            <Row>{(props.selectedUser) ? ("Usuario seleccionado: " + props.selectedUser.username + " (" + props.selectedUser.user_id + ")") : ("Sin usuario seleccionado")}</Row>
            <Row>
                <Button>Desactivar usuario</Button>
            </Row>
        </Container>
    )
}