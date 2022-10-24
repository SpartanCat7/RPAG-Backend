import { Col, ListGroup, Row } from "react-bootstrap"

export default function AlertTypeList({ typeList, setSelectedTypeId }) {
    if (!typeList || typeList.length === 0) {
        return (<h5>Lista actualmente vacia</h5>)
    } else {
        return (
            <ListGroup>
                {typeList.map((alertType, index) => {
                    return (
                        <ListGroup.Item key={alertType.typeId} action onClick={() => { setSelectedTypeId(alertType.typeId) }}>
                            <Row>
                                <Col xs={"auto"}>
                                    <img src={alertType.iconUrl} className="AlertTypeIcon" />
                                </Col>
                                <Col>
                                    <span>{index} - {alertType.name}</span>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }
}