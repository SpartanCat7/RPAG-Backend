import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModContentDetailsPanel from "./Components/ModContentDetailsPanel";
import ModContentFeed from "./Components/ModContentFeed";
import { getAllAlertsOnSnapshot, setAlertDeleted } from "../../Providers/AlertProvider";
import { getAlertsCommentsOnSnapshot, setCommentActive } from "../../Providers/CommentProvider";
import { getAlertTypes } from "../../Providers/AlertTypeProvider";
import { getUser } from "../../Providers/UserProvider";

export default function ModViewContentModeration() {

    const [alertTypeList, setAlertTypeList] = useState({});
    const [alertList, setAlertList] = useState([]);
    const [commentsLists, setCommentsLists] = useState({});
    const [userList, setUserList] = useState({});
    const [lastUpdate, setLastUpdate] = useState();
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        getAllAlertsOnSnapshot((alertSnap) => {
            const newAlertList = [];
            for (let doc of alertSnap.docs) {
                newAlertList.push({
                    ...doc.data(),
                    alertId: doc.id,
                    date: doc.data().date.toDate()
                });
            }
            setAlertList(newAlertList);
            setLastUpdate(new Date().getTime());
            //console.log("alerts", newAlertList);
        }, (err) => {
            console.log("Error getting alerts", err)
        });

        getAlertTypes().then((snap) => {
            let newAlertTypeList = alertTypeList;
            for (let type of snap.docs) {
                newAlertTypeList[type.id] = {
                    ...type.data(),
                    typeId: type.id
                }
            }
            setAlertTypeList(newAlertTypeList);
            setLastUpdate(new Date().getTime());
            //console.log("types", newAlertTypeList);
        })
    }, [])

    useEffect(() => {
        let newCommentsLists = { ...commentsLists };
        for (let alert of alertList) {
            if (!newCommentsLists[alert.alertId]) {
                let unsub = getAlertsCommentsOnSnapshot(alert.alertId, (commentSnap) => {
                    newCommentsLists[alert.alertId] = {
                        list: commentSnap.docs.map((v, i) => {
                            return {
                                ...v.data(),
                                commentId: v.id,
                                date: v.data().date.toDate()
                            }
                        }),
                        unsub
                    }

                    let alertIdsList = alertList.map((v, i) => { return v.alertId });
                    let commentListsMissing = alertIdsList.map((v, i) => { return !!newCommentsLists[v] }).includes(false);

                    if (!commentListsMissing) {
                        setCommentsLists(newCommentsLists);
                        setLastUpdate(new Date().getTime());
                        console.log("comments", newCommentsLists);
                    }
                }, (err) => {
                    console.log("Error getting comments", err)
                });
            }
        }

        /*let alertIds = alertList.map((v, i) => { return v.alertId });
        for (let commentListId of Object.keys(commentsLists)) { // <--- if list's alert no longer present, remove listener and list
            if (!(alertIds.includes(commentListId))) {
                commentsLists[commentListId].unsub();
                setCommentsLists({
                    ...commentsLists,
                    [commentListId]: null
                });
            }
        }*/
    }, [alertList]);

    useEffect(() => {
        let newUserList = { ...userList };
        let userIdsFromAlerts = alertList.map((v, i) => v.userId);
        let userIdsFromComments = Object.keys(commentsLists).map((v, i) => commentsLists[v].userId);
        let allUserIds = userIdsFromAlerts.concat(userIdsFromComments).filter(x => !!x);

        for (let userId of allUserIds) {
            if (!newUserList[userId]) {
                newUserList[userId] = {};
                getUser(userId)
                    .then((snap) => {
                        newUserList[userId] = {
                            ...snap.data(),
                            userId: snap.id
                        }

                        let usersMissing = allUserIds.map((v, i) => !!newUserList[v]).includes(false);
                        if (!usersMissing) {
                            setUserList(newUserList);
                            setLastUpdate(new Date().getTime());
                            //console.log("users", newUserList);
                        }
                    }).catch(
                        (err) => console.log(err)
                    )
            }
        }
    }, [alertList, commentsLists]);

    const getItemWithExtraData = (item_data) => {
        if (item_data && item_data.type == "ALERT") {
            let selectedAlert = alertList.filter((x) => { return x.alertId == item_data.alertId }).pop();
            if (selectedAlert) {
                let alertUser = userList[selectedAlert.userId];
                let alertType = alertTypeList[selectedAlert.typeId];
                let alertData = {
                    ...selectedAlert,
                    type: item_data.type,
                    UserData: alertUser,
                    TypeData: alertType
                }
                return alertData;
            }
        } else if (item_data && item_data.type == "COMMENT") {
            let commentList = commentsLists[item_data.alertId];
            if (commentList && commentList.list) {
                let selectedComment = commentList.list.filter((x) => { return x.commentId == item_data.commentId }).pop();
                if (selectedComment) {
                    let user = userList[selectedComment.userId];
                    let alert = alertList.filter((x) => { return x.alertId == item_data.alertId }).pop();
                    let type = alertTypeList[alert.typeId];
                    let comment = {
                        ...selectedComment,
                        type: item_data.type,
                        UserData: user,
                        AlertData: alert,
                        TypeData: type
                    }
                    return comment;
                }
            }
        }
        return null;
    }

    const deleteContent = () => {
        if (selectedItem) {
            if (selectedItem.type == "ALERT") {
                setAlertDeleted(selectedItem.alertId, true);
            }
            if (selectedItem.type == "COMMENT") {
                setCommentActive(selectedItem.alertId, selectedItem.commentId, false);
            }
        }
    }

    const restoreContent = () => {
        if (selectedItem) {
            if (selectedItem.type == "ALERT") {
                setAlertDeleted(selectedItem.alertId, false);
            }
            if (selectedItem.type == "COMMENT") {
                setCommentActive(selectedItem.alertId, selectedItem.commentId, true);
            }
        }
    }

    return (
        <Container fluid>
            <Row className={"d-flex justify-content-center pb-3"}>
                <Col xs={"auto"}>
                    <h4>Moderacion de Contenido</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={3} className={"content_moderation_map_col"}>
                    Mapa
                </Col>
                <Col className={"content_moderation_feed_col"}>
                    <ModContentFeed
                        alertList={alertList}
                        alertTypeList={alertTypeList}
                        userList={userList}
                        commentsLists={commentsLists}
                        lastUpdate={lastUpdate}
                        setSelectedItem={setSelectedItem} />
                </Col>
                <Col xs={3} className={"content_moderation_detail_col"}>
                    <ModContentDetailsPanel
                        selectedItem={getItemWithExtraData(selectedItem)}
                        deleteContent={deleteContent}
                        restoreContent={restoreContent}
                    />
                </Col>
            </Row>
        </Container>
    )
}