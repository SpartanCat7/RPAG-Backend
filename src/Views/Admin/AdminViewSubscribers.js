import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
//import { useOutletContext } from "react-router-dom";
import AddSubscriberUserForm from "./Components/AddSubscriberUserForm";
import DeactivateModUserMenu from "./Components/DeactivateModUserMenu";
import ModifyModUserMenu from "./Components/ModifyModUserMenu";
import UserList from "./Components/UserList";
import { getAlertTypes } from "../../Providers/AlertTypeProvider";

import { getSubscriberUsersOnSnapshot } from "../../Providers/UserProvider";

export default function AdminViewSubscribers() {

    //const [userData] = useOutletContext();

    const [userList, setUserList] = useState();
    const [selectedUserId, setSelectedUserId] = useState();
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
        getSubscriberUsersOnSnapshot((snap) => {
            const userDataList = [];
            for (let doc of snap.docs) {
                userDataList.push({
                    ...doc.data(),
                    userId: doc.id
                });
            }
            setUserList(userDataList);
        }, (err) => {
            console.error(err)
        })
    }, []);

    const getSelectedUser = (userId) => {
        if (userId && userList) {
            for (let user of userList) {
                if (user.userId == userId) {
                    return user;
                }
            }
        }
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    Administracion de Subscriptores
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <UserList
                                userList={userList}
                                setSelectedUserId={setSelectedUserId} />
                        </Col>
                        <Col xs={8}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Añadir</Accordion.Header>
                                    <Accordion.Body>
                                        <AddSubscriberUserForm alertTypes={alertTypes} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Modificar</Accordion.Header>
                                    <Accordion.Body>
                                        <ModifyModUserMenu selectedUser={getSelectedUser(selectedUserId)} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Desactivar</Accordion.Header>
                                    <Accordion.Body>
                                        <DeactivateModUserMenu selectedUser={getSelectedUser(selectedUserId)} />
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

