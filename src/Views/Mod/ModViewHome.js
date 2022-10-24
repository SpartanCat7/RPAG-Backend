import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function ModViewHome() {
    return (
        <Container>
            <Row>
                <Col className={"IndexPageScreenButton text-center"}>
                    <Link to={"/mod/content_moderation"}>
                        <div className={"IndexPageScreenLink"}>
                            Moderacion de Contenido
                        </div>
                    </Link>
                </Col>
                <Col className={"IndexPageScreenButton text-center"}>
                    <Link to={"/mod/user_view"}>
                        <div className={"IndexPageScreenLink"}>
                            Manejo de Usuarios
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}