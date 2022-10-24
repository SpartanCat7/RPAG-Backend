import { Card, Col, Container, ListGroup, Row } from "react-bootstrap"

/**
 * 
 * @param {{
 *      alertList: any[],
 *      getAlertById: (string) => any,
 *      getUserById: (string) => any,
 *      getAlertType: (string) => any}
 * } props 
 * @returns 
 */
const UserHistoryList = ({ alertList, getAlertById, getUserById, getAlertType }) => {

    const CommentItem = ({ comment }) => {
        return (
            <ListGroup.Item>
                <p>{`${getUserById(comment.userId).username} - ${comment.date.toLocaleString()}`}</p>
                <p>{comment.text}</p>
            </ListGroup.Item>
        )
    }

    /*let oldStyle = (
        <ListGroup> {alertList.map((v, i) => (
            <ListGroup.Item key={`ALERT-${v.alert.alertId}`}>
                <span>{`By: ${getUserById(v.alert.userId).username} - ${v.alert.date.toLocaleString()} - Type: ${getAlertType(v.alert.typeId).name}`}</span>
                {(v.comments && v.comments.length > 0) ? (
                    <ListGroup> {v.comments.map((comment, commentIdx) => (
                        <AlertItem key={`COMMENT-${comment.commentId}`} comment={comment} />
                    ))}
                    </ListGroup>
                ) : null}
            </ListGroup.Item>
        ))}
        </ListGroup>
    )*/

    /*let newStyle = (
        <Container> {alertList.map((v, i) => (
            <Row key={`ALERT-${v.alert.alertId}`}>
                <Col>
                    <span>{`By: ${getUserById(v.alert.userId).username} - ${v.alert.date.toLocaleString()} - Type: ${getAlertType(v.alert.typeId).name}`}</span>
                    {(v.comments && v.comments.length > 0) ? (
                        <ListGroup> {v.comments.map((comment, commentIdx) => (
                            <AlertItem key={`COMMENT-${comment.commentId}`} comment={comment} />
                        ))}
                        </ListGroup>
                    ) : null}
                </Col>
            </Row>
        ))}
        </Container>
    )*/

    return (
        <div>
            {(alertList && alertList.length > 0) ? (
                <Container> {alertList.map((v, i) => (
                    <Row key={`ALERT-${v.alert.alertId}`} className="mb-4">
                        <Card>
                            <Card.Body>
                                <p>{`By: ${getUserById(v.alert.userId).username} - ${v.alert.date.toLocaleString()} - Type: ${getAlertType(v.alert.typeId).name}`}</p>
                                {(v.comments && v.comments.length > 0) ? (
                                    <ListGroup> {v.comments.map((comment, commentIdx) => (
                                        <CommentItem key={`COMMENT-${comment.commentId}`} comment={comment} />
                                    ))}
                                    </ListGroup>
                                ) : null}
                            </Card.Body>
                        </Card>
                    </Row>
                ))}
                </Container>
            ) : (
                <h3>NO ITEMS IN USER HISTORY</h3>
            )}
        </div>
    )
}

export default UserHistoryList;