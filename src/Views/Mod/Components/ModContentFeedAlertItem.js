import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ModContentFeedAlertItem({ alertObject, setSelectedItem }) {
    const selectAlert = () => {
        setSelectedItem({
            type: "ALERT",
            alertId: alertObject.alertId,
            commentId: null
        })
    }

    const selectComment = (commentId) => {
        setSelectedItem({
            type: "COMMENT",
            alertId: alertObject.alertId,
            commentId: commentId
        })
    }

    const deletedAlertClassName = alertObject.deleted ? " deleted_alert" : "";

    return (
        <ListGroup.Item className={"alert_item" + deletedAlertClassName}>
            <Row>
                <Col xs={"auto"} className={"p-2 ps-3"}>
                    <img src={alertObject.TypeData ? alertObject.TypeData.iconUrl : null} className={"ModContentFeedAlertIcon"} />
                </Col>
                <Col>
                    <Row className="pt-1">
                        <Col>
                            <Button className="p-0" variant="link" onClick={selectAlert}>
                                {alertObject.TypeData ? alertObject.TypeData.name : '---'}
                            </Button>
                        </Col>
                        <Col>
                            <span>{`Tiempo ${alertObject.date.toDateString()}`}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {(alertObject.UserData) ? (
                                (<><span>Por: </span><Link to={`/mod/user_view/${alertObject.UserData.userId}`}>{alertObject.UserData.username}</Link></>)
                            ) : (
                                `Por: ---`
                            )}
                        </Col>
                        <Col>
                            {`${alertObject.CommentList ? alertObject.CommentList.length : 0} comentarios`}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {(alertObject.CommentList && alertObject.CommentList.length > 0) ? (
                <Row className="pt-2 ps-5 pb-2">
                    <ListGroup>
                        {
                            alertObject.CommentList.map((comment, commentIndex) => {
                                const deletedCommentClassName = !comment.active ? " deleted_comment" : "";
                                return (
                                    <ListGroup.Item
                                        key={`c${alertObject.alertId}-${commentIndex}`}
                                        className={"comment_item" + deletedCommentClassName}
                                        action
                                        onClick={() => { selectComment(comment.commentId) }}>
                                        {`${comment.userId} | ${comment.date} | "${comment.text}"`}
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Row>
            ) : (null)}
        </ListGroup.Item>
    )
}