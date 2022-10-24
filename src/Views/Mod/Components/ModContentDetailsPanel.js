import { Button, Card, Col, Container, Row } from "react-bootstrap";


export default function ModContentDetailsPanel({ selectedItem, deleteContent, restoreContent }) {

    const HideContentButton = (selectedItem) => {
        if (selectedItem) {
            if (selectedItem.type == "ALERT") {
                if (selectedItem.deleted) {
                    return (<Button onClick={() => restoreContent()}>Restaurar Alerta</Button>)
                } else {
                    return (<Button onClick={() => deleteContent()}>Eliminar Alerta</Button>)
                }
            }
            if (selectedItem.type == "COMMENT") {
                if (selectedItem.active) {
                    return (<Button onClick={() => deleteContent()}>Eliminar Comentario</Button>)
                } else {
                    return (<Button onClick={() => restoreContent()}>Restaurar Comentario</Button>)
                }
            }
        } else {
            return (<div>...ERROR?</div>)
        }
    }

    return (
        <Card>
            <Card.Header>Detalle</Card.Header>
            <Card.Body>
                {(selectedItem) ? (
                    <>
                        <Row>
                            <Col>Tipo</Col>
                            <Col>
                                {(selectedItem.type == "ALERT") ? (
                                    selectedItem.type + " - " + selectedItem.TypeData.name
                                ) : (
                                    selectedItem.type
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>Tiempo</Col>
                            <Col>{selectedItem.date.toString()}</Col>
                        </Row>
                        <Row>
                            <Col>Hace:</Col>
                            <Col>...</Col>
                        </Row>
                        <Row>
                            {(selectedItem.type == "ALERT") ? (
                                <>
                                    <Row>
                                        <Col>Coordenadas</Col>
                                    </Row>
                                    <Row>
                                        <Col>{selectedItem.latitude}</Col>
                                    </Row>
                                    <Row>
                                        <Col>{selectedItem.longitude}</Col>
                                    </Row>
                                </>
                            ) : (selectedItem.type == "COMMENT") ? (
                                <>
                                    <Row>
                                        <Col>Contenido</Col>
                                    </Row>
                                    <Row>
                                        <Col>{selectedItem.text}</Col>
                                    </Row>
                                </>
                            ) : (
                                <Col>This isn't supposed to happen...</Col>
                            )}
                        </Row>
                        <Row>
                            <Col>
                                {HideContentButton(selectedItem)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>Usuario</Col>
                        </Row>
                        <Row>
                            <Col>Username</Col>
                            <Col>{selectedItem.UserData.username}</Col>
                        </Row>
                        <Row>
                            <Col>Telefono</Col>
                            <Col>{selectedItem.UserData.telf_number}</Col>
                        </Row>
                        <Row>
                            <Col><Button>Ver Usuario</Button></Col>
                            <Col><Button>Suspender</Button></Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row>
                            <Col>Sin seleccion</Col>
                        </Row>
                    </>
                )}
            </Card.Body>
        </Card>
    )
}