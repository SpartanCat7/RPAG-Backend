import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addUserSuspension } from "../../../Providers/UserSuspensionProvider";

/**
 * 
 * @param {{
 * selectedUserId: string, 
 * currentUserId: string
 * }} props 
 * @returns 
 */
export default function SuspendUserModal(props) {
    const [numberOfDays, setNumberOfDays] = useState();
    const [modNote, setModNote] = useState("");

    const registerSuspension = () => {
        let userId = props.selectedUserId;
        let start_date = new Date();
        start_date.setHours(0, 0, 0);
        let end_date = new Date(start_date);
        end_date.setTime(end_date.getTime() + (1000 * 60 * 60 * 24 * numberOfDays))
        let mod_id = props.currentUserId;
        let mod_comment = modNote;
        let reference = "";

        addUserSuspension(userId, { start_date, end_date, mod_id, mod_comment, reference }).then((ref) => {
            console.log("Suspension correctly added:", ref.id)
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton className="p-4">
                <h5>SUSPENDER USUARIO</h5>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Numero de dias</Form.Label>
                            <Form.Control type="number" placeholder="Dias de suspension" onChange={(event) => { setNumberOfDays(Number(event.target.value)) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Nota de moderador</Form.Label>
                            <textarea className="form-control" rows={4} placeholder="Razon de suspension..." onChange={(event) => { setModNote(event.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancelar</Button>
                <Button onClick={registerSuspension}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    )
}