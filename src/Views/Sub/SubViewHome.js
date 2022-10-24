import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SubViewHome() {
    return (
        <Container>
            <Row>
                <Col xs={6} className={"IndexPageScreenButton text-center"}>
                    <Link to={"/sub/subscription_management"}>
                        <div className={"IndexPageScreenLink"}>
                            Manejo de Suscripciones
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}