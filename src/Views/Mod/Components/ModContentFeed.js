import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import ModContentFeedAlertItem from "./ModContentFeedAlertItem";

export default function ModContentFeed({ alertList, commentsLists, userList, alertTypeList, lastUpdate, setSelectedItem }) {

    const [fullContentList, setFullContentList] = useState([]);

    useEffect(() => {
        let newFullContentList = alertList.map((alert, alertIdx) => {
            let alertUser = userList[alert.userId];
            let alertType = alertTypeList[alert.typeId];
            let alertComments = commentsLists[alert.alertId] ? commentsLists[alert.alertId].list : null;
            if (alertComments) {
                for (let comment of alertComments) {
                    comment["UserData"] = userList[comment.userId];
                }
            }
            return {
                ...alert,
                UserData: alertUser,
                TypeData: alertType,
                CommentList: alertComments
            }
        });
        console.log(newFullContentList);
        setFullContentList(newFullContentList);
    }, [lastUpdate])

    return (
        <Container>
            {
                (!fullContentList && fullContentList.length <= 0) ? (
                    <Row>
                        <Col>
                            No content found
                        </Col>
                    </Row>
                ) : (
                    <ListGroup>
                        {
                            fullContentList.map((v, i) => {
                                return <ModContentFeedAlertItem key={"alert_" + v.alertId} alertObject={v} setSelectedItem={setSelectedItem} />
                            })
                        }
                    </ListGroup>
                )
            }
        </Container>
    )
}