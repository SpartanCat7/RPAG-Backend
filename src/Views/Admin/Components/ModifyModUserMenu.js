import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { setUserUsername } from "../../../Providers/UserProvider";
import InfoChangeOption from "../../../CoreComponents/InfoChangeOption";
import ValueUpdateModal from "../../../CoreComponents/ValueUpdateModal";

export default function ModifyModUserMenu({ selectedUser }) {

    const [showValueUpdateModal, setShowValueUpdateModal] = useState();
    const [updateModalContents, setUpdateModalContents] = useState();

    const openUpdateModal = (content) => {
        setUpdateModalContents(content);
        setShowValueUpdateModal(true);
    }

    const updateEmailFormContent = {
        title: "Actualizar Email",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Nuevo email" onChange={(event) => setNewValue(event.target.value)} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => console.log("Updating email from", selectedUser.email, "to", val)
    }

    const updateUsernameFormContent = {
        title: "Actualizar Nombre de Usuario",
        body: (setNewValue) => (
            <Form>
                <Form.Group>
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Nuevo nombre de usuario" onChange={(event) => setNewValue(event.target.value)} />
                </Form.Group>
            </Form>
        ),
        saveAction: (val) => { setUserUsername(selectedUser.userId, val) }
    }

    return (
        <>
            {(selectedUser) ? (
                <>
                    <Row><Col>{"Usuario seleccionado: " + selectedUser.username}</Col></Row>
                    <Row className="mt-4">
                        <InfoChangeOption
                            infoName={"Email"}
                            infoValue={selectedUser.email}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateEmailFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Nombre de Usuario"}
                            infoValue={selectedUser.username}
                            btnText={"Actualizar"}
                            btnAction={() => openUpdateModal(updateUsernameFormContent)}
                        />
                        <InfoChangeOption
                            infoName={"Password"}
                            infoValue={"???"}
                            btnText={"Reset"}
                            btnAction={() => console.log("Reset password")}
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