import { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { setActive, setDestination, setName } from "../../../Providers/SubscriptionProvider";
import InfoChangeOption from "../../../CoreComponents/InfoChangeOption";
import ValueUpdateModal from "../../../CoreComponents/ValueUpdateModal";

export default function ModifySubscriptionForm({ selected }) {

    const [showValueUpdateModal, setShowValueUpdateModal] = useState();
    const [updateModalContents, setUpdateModalContents] = useState();

    const openUpdateModal = (content) => {
        setUpdateModalContents(content);
        setShowValueUpdateModal(true);
    }

    const updateNameFormContent = {
        title: "Actualizar Nombre",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nuevo nombre" onChange={(event) => setNewValue(event.target.value)} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setName(selected.subId, val) }
    }

    const updateActiveFormContent = {
        title: "Activar/Desactivar",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Check type="checkbox" label="Subscripcion activa" onChange={(event) => setNewValue(event.target.checked)} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setActive(selected.subId, val) }
    }

    const updateDestinationFormContent = {
        title: "Actualizar destino",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Destino</Form.Label>
                    <Form.Control type="email" placeholder="Nuevo email de destino" onChange={(event) => setNewValue(event.target.value)} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setDestination(selected.subId, val) }
    }

    return (
        <>
            {(selected) ? (
                <>
                    <Row><Col>{"Tipo seleccionado: " + selected.name + " (" + selected.subId + ")"}</Col></Row>
                    <Row className="mt-4">
                        <InfoChangeOption
                            infoName={"Nombre"}
                            infoValue={selected.name}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateNameFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Activo"}
                            infoValue={selected.active ? "ACTIVADO" : "DESACTIVADO"}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateActiveFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Destino"}
                            infoValue={selected.destination}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateDestinationFormContent)}
                        />
                    </Row>
                    <ValueUpdateModal
                        show={showValueUpdateModal}
                        onHide={() => setShowValueUpdateModal(false)}
                        contents={updateModalContents}
                    />
                </>
            ) : (
                "Sin tipo seleccionado"
            )}
        </>
    )
}
