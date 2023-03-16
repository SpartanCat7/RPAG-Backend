import { useEffect, useState } from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import AddSubscriptionForm from "./Components/AddSubscriptionForm";
import SubList from "./Components/SubList";
import { getAlertTypes } from "../../Providers/AlertTypeProvider";
import { getSubscriptionsByUserIdOnSnapshot } from "../../Providers/SubscriptionProvider";
import { auth } from "../../Utils/Firebase";
import ModifySubscriptionForm from "./Components/ModifySubscriptionForm";


export default function SubViewSubscriptionAdmin() {

    const [userData] = useOutletContext();

    const [subscriptionList, setSubscriptionList] = useState();
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState();
    //const [allowedAlertTypes, setAllowedAlertTypes] = useState();
    const [listenerStatus, setListenerStatus] = useState();
    const [alertTypes, setAlertTypes] = useState();

    useEffect(() => {
        getAlertTypes().then((snap) => {
            let typeList = snap.docs.map((v, i) => {
                return {
                    ...v.data(),
                    typeId: v.id
                }
            });
            setAlertTypes(typeList);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        if (userData && !listenerStatus) {
            getSubscriptionsByUserIdOnSnapshot(auth.currentUser.uid, (snap) => {
                setSubscriptionList(snap.docs.map((doc, index) => {
                    return {
                        ...doc.data(),
                        subId: doc.id
                    }
                }))
                setListenerStatus("SET");
            }, (err) => {
                console.log(err)
            })
        }
    }, [userData])

    const getSubscriptionById = (subscriptionId) => {
        if (subscriptionId && subscriptionList) {
            for (let sub of subscriptionList) {
                if (sub.subId == subscriptionId) {
                    return sub;
                }
            }
        }
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    Suscripciones de Alertas
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <SubList
                                subscriptionList={subscriptionList}
                                setSelectedSubId={setSelectedSubscriptionId} />
                        </Col>
                        <Col xs={8}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Añadir</Accordion.Header>
                                    <Accordion.Body>
                                        <AddSubscriptionForm alertTypes={alertTypes} userData={userData} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Modificar</Accordion.Header>
                                    <Accordion.Body>
                                        <ModifySubscriptionForm selected={getSubscriptionById(selectedSubscriptionId)} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Eliminar</Accordion.Header>
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

