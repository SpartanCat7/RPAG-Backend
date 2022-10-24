import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { setUserSuspensionActive } from "../../../Providers/UserSuspensionProvider";

/**
 * @param {{
 *      selectedUserId: string
 *      suspensionList: any[],
 *      getUserById: (string) => any}
 * } props 
 * @returns 
 */
const UserSuspensionList = ({ selectedUserId, suspensionList, getUserById, suspensionUpdate }) => {

    const CancelSuspension = (suspensionId) => {
        console.log("Canceling suspension " + suspensionId);
        setUserSuspensionActive(selectedUserId, suspensionId, false).then(() => {
            console.log("Suspension successfuly canceled");
        }).catch((err) => {
            console.error(err);
        })
    }

    const SuspensionItem = ({ suspension }) => {
        return (
            <ListGroup.Item>
                {(suspension.is_active && suspension.start_date < new Date() && suspension.end_date > new Date()) ? (
                    <Row className={"ps-4 mb-3 py-1 mod_view_suspension_active_tag"}>
                        Suspension en efecto
                    </Row>
                ) : (
                    null
                )}
                <Row>
                    <Col>
                        <p>{`Por: ${getUserById(suspension.mod_id).username}`}</p>
                        <p>{`Desde: ${suspension.start_date.toLocaleDateString()}`}</p>
                        <p>{`Hasta: ${suspension.end_date.toLocaleDateString()}`}</p>
                        <p>{`Nota: ${suspension.mod_comment}`}</p>
                    </Col>
                </Row>
                <Row>
                    {(suspension.is_active && suspension.start_date < new Date() && suspension.end_date > new Date()) ? (
                        <Button onClick={() => CancelSuspension(suspension.suspensionId)}>
                            Cancelar
                        </Button>
                    ) : (
                        <Button disabled onClick={() => CancelSuspension(suspension.suspensionId)}>
                            Descartada
                        </Button>
                    )}
                </Row>
            </ListGroup.Item>
        )
    }

    return (
        <Card>
            <Card.Body>
                {(suspensionList && suspensionList.length > 0) ? (
                    <ListGroup> {suspensionList.map((suspension, suspIdx) => (
                        <SuspensionItem suspension={suspension} key={`SUSP-${suspension.suspensionId}`} />
                    ))}
                    </ListGroup>
                ) : (
                    <h5>NO SUSPENSIONS IN USER PROFILE</h5>
                )}
            </Card.Body>
        </Card>
    )
}

export default UserSuspensionList;