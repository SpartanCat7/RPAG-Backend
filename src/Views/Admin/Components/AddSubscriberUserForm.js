import { useState } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addSubscriberUser } from "../../../Providers/UserProvider";

export default function AddSubscriberUserForm({ alertTypes }) {

    const [inputEmail, setInputEmail] = useState();
    const [inputUsername, setInputUsername] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [selectedTypes, setSelectedTypes] = useState([]);

    const navigate = useNavigate();

    function addNewUser() {
        addSubscriberUser(
            inputEmail,
            inputUsername,
            inputPassword,
            JSON.stringify(selectedTypes),
            (user_id) => {
                console.log("New user created:", user_id);
                navigate("/")
            },
            (message) => {
                console.log(message)
            }
        )
    }

    function selectAlertType(typeId, isChecked) {
        if (isChecked && !selectedTypes.includes(typeId)) {
            setSelectedTypes([...selectedTypes, typeId])
        }
        if (!isChecked && selectedTypes.includes(typeId)) {
            setSelectedTypes(selectedTypes.filter((x) => { return x != typeId })); // Is this really the only way to remove a value?!
        }
    }

    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label>Direccion de email</Form.Label>
                        <Form.Control type="email" placeholder="Ingresar email" onChange={(event) => { setInputEmail(event.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar nombre de usuario" onChange={(event) => { setInputUsername(event.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" onChange={(event) => { setInputPassword(event.target.value) }} />
                    </Form.Group>
                    <Button className="mt-3" onClick={() => { addNewUser() }}>
                        Añadir Usuario
                    </Button>
                </Form>
            </Col>
            {
                (alertTypes && alertTypes.length > 0) ? (
                    <Col xs={5}>
                        <ListGroup>
                            {
                                alertTypes.map((v, i) => {
                                    return (
                                        <ListGroup.Item key={"type_" + i}>
                                            <Row>
                                                <Col>
                                                    <Form.Check label={v.name} onChange={(event) => { selectAlertType(v.typeId, event.target.checked) }} />
                                                </Col>
                                                <Col xs={"auto"}>
                                                    <img src={v.iconUrl} className={"AlertTypeIcon"} />
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
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