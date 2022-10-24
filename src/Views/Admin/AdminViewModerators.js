import { useEffect, useState } from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
//import { useOutletContext } from "react-router-dom";
import AddModUserForm from "./Components/AddModUserForm";
import DeactivateModUserMenu from "./Components/DeactivateModUserMenu";
import ModifyModUserMenu from "./Components/ModifyModUserMenu";
import UserList from "./Components/UserList";

import { getModeratorUsersOnSnapshot } from "../../Providers/UserProvider";

export default function AdminViewModerators() {

    //const [userData] = useOutletContext();

    const [userList, setUserList] = useState();
    const [selectedUserId, setSelectedUserId] = useState();

    useEffect(() => {
        getModeratorUsersOnSnapshot((snap) => {
            const userDataList = snap.docs.map(doc => ({
                ...doc.data(),
                userId: doc.id
            }));
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
                    Administracion de Moderadores
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <UserList
                                userList={userList}
                                setSelectedUserId={setSelectedUserId} />
                        </Col>
                        <Col>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Añadir</Accordion.Header>
                                    <Accordion.Body>
                                        <AddModUserForm />
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

