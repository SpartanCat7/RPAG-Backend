import { Button, Col, Row } from "react-bootstrap";

const InfoChangeOption = ({ infoName, infoValue, btnText, btnAction }) => {
    return (
        <Row className="mt-2">
            <Col>
                {infoName + ": " + infoValue}
            </Col>
            <Col xs="auto">
                <Button onClick={() => btnAction()}>{btnText}</Button>
            </Col>
        </Row>
    )
}
export default InfoChangeOption;