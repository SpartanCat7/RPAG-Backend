import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../Utils/Firebase';
import { getUser } from '../../Providers/UserProvider';
import { CONSTS } from '../../Utils/Constants'
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

export default function NexusView() {
    const [userData, setUserData] = useState(null);
    const [loggedIn, setLoggedIn] = useState(auth.currentUser != null);
    const [gettingUserData, setGettingUserData] = useState(auth.currentUser != null);

    useEffect(() => {
        if (auth.currentUser != null) {
            getUser(auth.currentUser.uid).then(
                (doc) => {
                    if (doc.exists()) {
                        setUserData(doc.data());
                        setGettingUserData(false);
                    }
                }
            )
        }

        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                setLoggedIn(true);
                setGettingUserData(true);
                getUser(user.uid).then(
                    (doc) => {
                        if (doc.exists()) {
                            setUserData(doc.data());
                            setGettingUserData(false);
                        }
                    }
                )
            } else {
                setLoggedIn(false);
                setUserData(null);
            }
        })
    }, []);

    return (
        <Container>
            <Row className={"mt-5 d-flex justify-content-center"}>
                <Col xs={12} lg={6}>
                    <Card>
                        <Card.Header>
                            Welcome
                        </Card.Header>
                        <Card.Body>
                            {
                                (!loggedIn) ? (
                                    <LoginOffer />
                                ) : (gettingUserData) ? (
                                    <LoadingUserData />
                                ) : (userData.type === CONSTS.DB.USERS.TYPE.ADMIN) ? (
                                    <AdminWelcome userData={userData} />
                                ) : (userData.type === CONSTS.DB.USERS.TYPE.MOD) ? (
                                    <ModWelcome userData={userData} />
                                ) : (userData.type === CONSTS.DB.USERS.TYPE.SUB) ? (
                                    <SubWelcome userData={userData} />
                                ) : (
                                    <UserNotPermited userData={userData} />
                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

function LoginOffer() {
    return (
        <Container>
            <Row className={"d-flex justify-content-center"}>
                Hello, login here
            </Row>
            <Row className={"d-flex justify-content-center mt-4"}>
                <Col xs={"auto"}>
                    <Link to="login">Login</Link>
                </Col>
            </Row>
        </Container>
    )
}

function LoadingUserData() {
    return (
        <Container>
            <Row>
                Loading user data
            </Row>
        </Container>
    )
}

function AdminWelcome(props) {
    return (
        <Container>
            <Row>
                <Col>
                    Welcome {props.userData.username}
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    User Type: {props.userData.type}
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <SignOutButton />
                </Col>
                <Col>
                    <Link to={"/admin"}>Proceed to admin console</Link>
                </Col>
            </Row>
        </Container>
    )
}

function ModWelcome(props) {
    return (
        <Container>
            <Row>
                <Col>
                    Welcome {props.userData.username}
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    User Type: {props.userData.type}
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <SignOutButton />
                </Col>
                <Col>
                    <Link to={"/mod"}>Proceed to mod console</Link>
                </Col>
            </Row>
        </Container>
    )
}

function SubWelcome(props) {
    return (
        <Container>
            <Row>
                <Col>
                    Welcome {props.userData.username}
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    User Type: {props.userData.type}
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <SignOutButton />
                </Col>
                <Col>
                    <Link to={"/sub"}>Proceed to subscriber console</Link>
                </Col>
            </Row>
        </Container>
    )
}

function UserNotPermited(props) {
    return (
        <Container>
            <Row>
                <Col>
                    Hello {props.userData.username}
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    User Type: {props.userData.type}
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <SignOutButton />
                </Col>
                <Col>
                    {"Access denied. Go away :<"}
                </Col>
            </Row>
        </Container>
    )
}