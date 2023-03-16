import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

/**
 * @param {{
 * show: boolean,
 * onHide: () => void,
 * contents: any
 * }} props 
 * @returns 
 */
const ValueUpdateModal = ({ show, onHide, contents }) => {
    const [newValue, setNewValue] = useState();
    if (!contents) {
        return <Modal centered><Modal.Header closeButton /><Modal.Body>This shouldn't be able to be seen...</Modal.Body></Modal>
    }
    return (
        <Modal onHide={onHide} show={show} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {contents.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {contents.body(setNewValue)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancelar</Button>
                <Button onClick={() => contents.saveAction(newValue)}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ValueUpdateModal;