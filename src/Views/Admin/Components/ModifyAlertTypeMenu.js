import { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { setDescription, setIcon, setLifetime, setName, setTypeActive, setTypeColor } from "../../../Providers/AlertTypeProvider";
import InfoChangeOption from "../../../CoreComponents/InfoChangeOption";
import ValueUpdateModal from "../../../CoreComponents/ValueUpdateModal";
import { hexToRgbStr } from "../../../Utils/ColorUtils";

export default function ModifyAlertTypeMenu({ selectedType }) {

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
        saveAction: (val) => { setName(selectedType.typeId, val) }
    }

    const updateDescriptionFormContent = {
        title: "Actualizar Descripcion",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="Nueva descripcion" onChange={(event) => setNewValue(event.target.value)} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setDescription(selectedType.typeId, val) }
    }

    const updateLifetimeFormContent = {
        title: "Actualizar Tiempo de Vida",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Tiempo de vida</Form.Label>
                    <Form.Control type="number" placeholder="Nuevo tiempo de vida" onChange={(event) => setNewValue(Number(event.target.value))} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setLifetime(selectedType.typeId, val) }
    }

    const updateIconFormContent = {
        title: "Actualizar Icono",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Seleccione un nuevo icono</Form.Label>
                    <Form.Control type="file" onChange={(event) => { setNewValue(event.target.files) }} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => {
            if (val && val[0]) {
                setIcon(selectedType.typeId, selectedType.icon.split('/').pop(), val[0], () => {
                    console.log("file updated");
                }, (err) => {
                    console.log('ERROR', err)
                })
            }
        }
    }

    const updateColorFormContent = {
        title: "Actualizar Color",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Seleccione un nuevo color</Form.Label>
                    <Form.Control defaultValue={selectedType.color} type="color" onChange={(event) => { setNewValue(event.target.value) }} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setTypeColor(selectedType.typeId, val) }
    }

    return (
        <>
            {(selectedType) ? (
                <>
                    <Row><Col>{"Tipo seleccionado: " + selectedType.name + " (" + selectedType.typeId + ")"}</Col></Row>
                    <Row className="mt-4">
                        <InfoChangeOption
                            infoName={"Nombre"}
                            infoValue={selectedType.name}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateNameFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Descripcion"}
                            infoValue={selectedType.description}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateDescriptionFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Icono"}
                            infoValue={selectedType.icon}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateIconFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Tiempo de vida"}
                            infoValue={selectedType.lifetime}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateLifetimeFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Color"}
                            infoValue={selectedType.color}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateColorFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Activo"}
                            infoValue={selectedType.active}
                            btnText={selectedType.active ? "Desactivar" : "Activar"}
                            btnAction={() => setTypeActive(selectedType.typeId, !selectedType.active)}
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

//const InfoChangeOption = ({ infoName, infoValue, btnText, btnAction }) => {
//    return (
//        <Row className="mt-2">
//            <Col>
//                {infoName + ": " + infoValue}
//            </Col>
//            <Col xs="auto">
//                <Button onClick={() => btnAction()}>{btnText}</Button>
//            </Col>
//        </Row>
//    )
//}
//
//const ValueUpdateModal = ({ show, onHide, contents }) => {
//    const [newValue, setNewValue] = useState();
//    if (!contents) {
//        return <Modal centered><Modal.Header closeButton /><Modal.Body>This shouldn't be able to be seen...</Modal.Body></Modal>
//    }
//    return (
//        <Modal onHide={onHide} show={show} centered>
//            <Modal.Header closeButton>
//                <Modal.Title>
//                    {contents.title}
//                </Modal.Title>
//            </Modal.Header>
//            <Modal.Body>
//                {contents.body(setNewValue)}
//            </Modal.Body>
//            <Modal.Footer>
//                <Button onClick={onHide}>Cancelar</Button>
//                <Button onClick={() => contents.saveAction(newValue)}>Guardar</Button>
//            </Modal.Footer>
//        </Modal>
//    )
//}