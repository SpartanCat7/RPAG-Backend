import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/Firebase";
import { useState } from "react";

function EmailLoginForm() {
    const [inputEmail, setInputEmail] = useState();
    const [inputPassword, setInputPassword] = useState();

    const [loginError, setLoginError] = useState(false);

    function signIn() {
        if ((inputEmail != null && inputEmail.length > 0) && (inputPassword != null && inputPassword.length > 0)) {
            signInWithEmailAndPassword(auth, inputEmail, inputPassword)
                .then((userCredential) => {
                    if (userCredential.user == null) {
                        setLoginError(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setLoginError(true);
        }
    }

    return (
        <Container>
            <Form>
                <Row>
                    {
                        (loginError ? "ERROR!" : null)
                    }
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="nombre@ejemplo.com" onChange={(event) => { setInputEmail(event.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" onChange={(event) => { setInputPassword(event.target.value) }} />
                    </Form.Group>
                </Row>
                <Row className={"d-flex justify-content-center"}>
                    <Col xs={"auto"}>
                        <Button onClick={(event) => { signIn() }}>
                            Ingresar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default EmailLoginForm;