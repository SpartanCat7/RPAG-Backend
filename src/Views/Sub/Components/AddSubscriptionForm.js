import { useState } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { addSubscription } from "../../../Providers/SubscriptionProvider";

export default function AddSubscriptionForm({ alertTypes, userData }) {

    const [inputName, setName] = useState();
    const [inputDestination, setInputDestination] = useState();
    const [selectedType, setSelectedType] = useState();

    function AddNewSuscription() {
        addSubscription(
            userData.userId,
            inputName,
            new Date(),
            selectedType,
            inputDestination
        ).then(() => {
            console.log("Suscription added correctly")
        }).catch((err) => {
            console.log("ERROR", err)
        })
    }

    let allowedAlertTypes = userData && userData.subAllowedTypes ? JSON.parse(userData.subAllowedTypes) : [];

    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Un nombre para identificar" onChange={(event) => { setName(event.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Destino</Form.Label>
                        <Form.Control type="text" placeholder="Destino de la notificacion" onChange={(event) => { setInputDestination(event.target.value) }} />
                    </Form.Group>
                    <Button className="mt-3" onClick={() => { AddNewSuscription() }}>
                        Añadir Suscripcion
                    </Button>
                </Form>
            </Col>
            {
                (alertTypes && alertTypes.length > 0) ? (
                    <Col xs={5}>
                        <ListGroup>
                            {
                                alertTypes.map((v, i) => {
                                    if (allowedAlertTypes.includes(v.typeId)) {
                                        return (
                                            <ListGroup.Item key={"type_" + i}>
                                                <Row>
                                                    <Col>
                                                        <Form.Check name="TypeSelector" type="radio" label={v.name} onChange={(event) => { setSelectedType(v.typeId) }} />
                                                    </Col>
                                                    <Col xs={"auto"}>
                                                        <img src={v.iconUrl} className={"AlertTypeIcon"} />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })
                            }
                        </ListGroup>
                    </Col>
                ) : (
                    null
                )
            }

        </Row>

    )
}