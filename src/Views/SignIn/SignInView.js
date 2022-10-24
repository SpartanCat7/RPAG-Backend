import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { auth } from '../../Utils/Firebase';
import EmailLoginForm from './EmailLoginForm';

export default function SignInView() {
    const [authenticated, setAuthenticated] = useState(auth.currentUser != null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthenticated(user != null);
        })
    }, []);

    return (
        <Container>
            <Row className={"mt-5 d-flex justify-content-center"}>
                <Col xs={12} lg={6}>
                    <Card>
                        <Card.Header>
                            Login
                        </Card.Header>
                        <Card.Body>
                            {
                                (authenticated) ? (
                                    <Navigate to={"/"} />
                                ) : (
                                    <EmailLoginForm />
                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}