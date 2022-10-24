import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminViewHome() {
    return (
        <Container>
            <Row>
                <Col className={"IndexPageScreenButton text-center"}>
                    <Link to={"/admin/moderadores"}>
                        <div className={"IndexPageScreenLink"}>
                            Moderadores
                        </div>
                    </Link>
                </Col>
                <Col className={"IndexPageScreenButton text-center"}>
                    <Link to={"/admin/suscriptores"}>
                        <div className={"IndexPageScreenLink"}>
                            Suscriptores
                        </div>
                    </Link>
                </Col>
                <Col className={"IndexPageScreenButton text-center"}>
                    <Link to={"/admin/tiposDeAlerta"}>
                        <div className={"IndexPageScreenLink"}>
                            Tipos de Alerta
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}