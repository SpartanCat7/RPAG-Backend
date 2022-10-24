import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import AddAlertTypeForm from "./Components/AddAlertTypeForm";
import AlertTypeList from "./Components/AlertTypeList";
import ModifyAlertTypeUserMenu from "./Components/ModifyAlertTypeMenu";
import { getAlertTypesOnSnapshot, getAlertTypesQuery } from "../../Providers/AlertTypeProvider";

export default function AdminAlertTypes() {
    const [alertTypeList, setAlertTypeList] = useState();
    const [selectedTypeId, setSelectedTypeId] = useState();

    useEffect(() => {
        getAlertTypesOnSnapshot((snap) => {
            const dataList = snap.docs.map(v => ({
                ...v.data(),
                typeId: v.id
            }))
            setAlertTypeList(dataList)
        }, (err) => {
            console.error(err)
        })
    }, []);

    const getSelectedType = (typeId) => {
        if (typeId && alertTypeList) {
            for (let type of alertTypeList) {
                if (type.typeId == typeId) {
                    return type;
                }
            }
        }
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    Administracion de Moderadores
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <AlertTypeList
                                typeList={alertTypeList}
                                setSelectedTypeId={setSelectedTypeId} />
                        </Col>
                        <Col>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Añadir</Accordion.Header>
                                    <Accordion.Body>
                                        <AddAlertTypeForm />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Modificar</Accordion.Header>
                                    <Accordion.Body>
                                        <ModifyAlertTypeUserMenu selectedType={getSelectedType(selectedTypeId)} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Desactivar</Accordion.Header>
                                    <Accordion.Body>
                                        {"<DeactivateModUserMenu selectedUser={selectedUser} />"}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>

    )
}