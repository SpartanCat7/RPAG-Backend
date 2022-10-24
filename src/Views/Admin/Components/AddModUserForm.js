import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addModeratorUser } from "../../../Providers/UserProvider";

export default function AddModUserForm() {

    const [inputEmail, setInputEmail] = useState();
    const [inputUsername, setInputUsername] = useState();
    const [inputPassword, setInputPassword] = useState();

    const navigate = useNavigate();

    function addNewModUser() {
        addModeratorUser(
            inputEmail,
            inputUsername,
            inputPassword,
            (user_id) => {
                console.log("New user created:", user_id);
                navigate("/")
            },
            (message) => {
                console.log(message)
            }
        )
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Direccion de email</Form.Label>
                <Form.Control type="email" placeholder="Ingresar email" onChange={(event) => { setInputEmail(event.target.value) }} />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresar nombre de usuario" onChange={(event) => { setInputUsername(event.target.value) }} />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" onChange={(event) => { setInputPassword(event.target.value) }} />
            </Form.Group>
            <Button className="mt-3" onClick={() => { addNewModUser() }}>
                Añadir Usuario
            </Button>
        </Form>
    )
}