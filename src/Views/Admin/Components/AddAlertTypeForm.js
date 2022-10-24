import { getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addAlertType, uploadIconFile } from "../../../Providers/AlertTypeProvider";

export default function AddAlertTypeForm() {

    const [inputId, setInputId] = useState();
    const [inputName, setInputName] = useState();
    const [inputDescription, setInputDescription] = useState();
    const [inputLifetime, setInputLifetime] = useState();
    const [inputIcon, setInputIcon] = useState();

    function getFileExtension(file) {
        return '.' + file.name.split(".").pop();
    }

    function addNewAlertType() {
        uploadIconFile(inputIcon[0], inputId.toLowerCase() + getFileExtension(inputIcon[0])).then(async (res) => {
            console.log("File uploaded:", res);
            let downloadUrl = await getDownloadURL(res.ref);
            addAlertType(
                inputId,
                inputName,
                inputDescription,
                res.ref.fullPath,
                inputLifetime,
                downloadUrl
            ).then((res) => {
                console.log("New type created");
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="ID" onChange={(event) => { setInputId(event.target.value) }} />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre" onChange={(event) => { setInputName(event.target.value) }} />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type="text" placeholder="Descripcion" onChange={(event) => { setInputDescription(event.target.value) }} />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Tiempo de vida (en Minutos)</Form.Label>
                <Form.Control type="number" placeholder="Tiempo de vida" onChange={(event) => { setInputLifetime(Number(event.target.value)) }} />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Icono</Form.Label>
                <Form.Control type="file" onChange={(event) => { setInputIcon(event.target.files) }} />
            </Form.Group>
            <Button className="mt-3" onClick={() => { addNewAlertType() }}>
                Añadir Tipo de Alerta
            </Button>
        </Form>
    )
}