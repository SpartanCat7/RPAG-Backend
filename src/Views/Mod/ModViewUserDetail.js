import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useOutletContext, useParams } from "react-router-dom";
import { getAlert, getUserAlertsOnSnapshot } from "../../Providers/AlertProvider";
import { getAlertTypes } from "../../Providers/AlertTypeProvider";
import { getUserCommentsOnSnapshot } from "../../Providers/CommentProvider";
import { getUser, getUserOnSnapshot } from "../../Providers/UserProvider";
import { getUserSuspensionsOnSnapshot } from "../../Providers/UserSuspensionProvider";
import SuspendUserModal from "./Components/SuspendUserModal";
import UserHistoryList from "./Components/UserHistoryList";
import UserSuspensionList from "./Components/UserSuspensionList";

export default function ModViewUserDetail() {

    let params = useParams();
    const selectedUserId = params.userId;
    const [userData] = useOutletContext();

    const [alertTypes, setAlertTypes] = useState({});

    const [alerts, setAlerts] = useState([]);
    const [alertsChanges, setAlertsChanges] = useState();
    const [userAlertsUnsub, setUserAlertsUnsub] = useState();

    const [comments, setComments] = useState([]);
    const [commentsChanges, setCommentsChanges] = useState();
    const [userCommentsUnsub, setUserCommentsUnsub] = useState();

    const [usersData, setUsersData] = useState([]);
    const [selectedUserChanges, setSelectedUserChanges] = useState();
    const [selectedUserUnsub, setSelectedUserUnsub] = useState();

    const [userSuspensions, setUserSuspensions] = useState([]);
    const [userSuspensionsChanges, setUserSuspensionsChanges] = useState();
    const [userSuspensionsUnsub, setUserSuspensionsUnsub] = useState();

    const [showSuspendUserModal, setShowSuspendUserModal] = useState(false);
    const [builtAlertList, setBuiltAlertList] = useState([]);

    //const [selectedUser, setSelectedUser] = useState();

    const loadAlertTypes = () => {
        getAlertTypes().then((snap) => {
            let types = {};
            for (let type of snap.docs) {
                types[type.id] = {
                    ...type.data(),
                    typeId: type.id
                }
            }
            setAlertTypes(types);
            if (!selectedUserUnsub) loadSelectedUserOnSnapshot();
        }, (err) =>
            console.error(err)
        )
    }

    const loadSelectedUserOnSnapshot = () => {
        let unsub = getUserOnSnapshot(selectedUserId, (snap) => {
            if (snap.exists()) {
                setSelectedUserChanges({
                    ...snap.data(),
                    userId: snap.id
                });
                // Process continues in useEffect of [userChanges]
            } else {
                console.error("USER NOT FOUND")
            }
        }, (err) => {
            console.error(err)
        })
        //setSelectedUserUnsub(unsub);
        setSelectedUserUnsub("SET");
    }

    useEffect(() => {
        if (selectedUserChanges) {
            let newUserList = [...usersData];
            if (newUserList.filter(x => x.userId == selectedUserChanges.userId).length > 0) {
                for (let user in newUserList) {
                    if (user.userId == selectedUserChanges.userId) {
                        user = selectedUserChanges;
                        break;
                    }
                }
            } else {
                newUserList.push(selectedUserChanges)
            }
            setUsersData(newUserList);
            if (!userAlertsUnsub) loadUserAlerts();
        }
    }, [selectedUserChanges])

    const loadUserAlerts = () => {
        if (!userAlertsUnsub) {
            let unsub = getUserAlertsOnSnapshot(selectedUserId, (snap) => {
                setAlertsChanges(snap.docChanges())
            }, (err) =>
                console.error(err)
            )
            //setUserAlertsUnsub(unsub);
            setUserAlertsUnsub("SET");
        }
    }

    useEffect(() => {
        if (alertsChanges) {
            let newAlerts = [...alerts];
            for (let change of alertsChanges) {
                //if (change.type == "added") {
                if (newAlerts.filter(x => x.alertId == change.doc.id).length == 0) {
                    newAlerts.push({
                        ...change.doc.data(),
                        alertId: change.doc.id,
                        date: change.doc.data().date.toDate()
                    })
                } else {
                    for (let i = 0; i < newAlerts.length; i++) {
                        if (newAlerts[i].alertId == change.doc.id) {
                            newAlerts[i] = {
                                ...change.doc.data(),
                                alertId: change.doc.id,
                                date: change.doc.data().date.toDate()
                            }
                            break;
                        }
                    }
                }
            }
            setAlerts(newAlerts);
            if (!userCommentsUnsub) loadUserComments();
        }
    }, [alertsChanges])

    const loadUserComments = () => {
        if (!userCommentsUnsub) {
            let unsub = getUserCommentsOnSnapshot(selectedUserId, (snap) => {
                setCommentsChanges(snap.docChanges())
            }, (err) =>
                console.error(err)
            )
            //setUserCommentsUnsub(unsub);
            setUserCommentsUnsub("SET");
        }
    }

    useEffect(() => {
        if (commentsChanges) {
            let newComments = [...comments];
            for (let change of commentsChanges) {
                if (newComments.filter(x => x.commentId == change.doc.id).length == 0) {
                    newComments.push({
                        ...change.doc.data(),
                        commentId: change.doc.id,
                        alertId: change.doc.ref.parent.parent.id,
                        date: change.doc.data().date.toDate()
                    })
                } else {
                    for (let i = 0; i < newComments.length; i++) {
                        if (newComments[i].commentId == change.doc.id) {
                            newComments[i] = {
                                ...change.doc.data(),
                                commentId: change.doc.id,
                                alertId: change.doc.ref.parent.parent.id,
                                date: change.doc.data().date.toDate()
                            }
                            break;
                        }
                    }
                }
            }
            setComments(newComments);
            if (!userSuspensionsUnsub) loadUserSuspensions()
        }
    }, [commentsChanges])

    const loadUserSuspensions = () => {
        if (!userSuspensionsUnsub) {
            let unsub = getUserSuspensionsOnSnapshot(selectedUserId, (snap) => {
                setUserSuspensionsChanges(snap.docChanges());
            }, (err) =>
                console.error(err)
            )
            //setUserSuspensionsUnsub(unsub)
            setUserSuspensionsUnsub("SET")
        }
    }

    useEffect(() => {
        if (userSuspensionsChanges) {
            let newSuspensions = [...userSuspensions];
            //let newComments = comments;
            for (let change of userSuspensionsChanges) {
                if (newSuspensions.filter(x => x.suspensionId == change.doc.id).length == 0) {
                    newSuspensions.push({
                        ...change.doc.data(),
                        suspensionId: change.doc.id,
                        userId: change.doc.ref.parent.parent.id,
                        start_date: change.doc.data().start_date.toDate(),
                        end_date: change.doc.data().end_date.toDate()
                    })
                } else {
                    for (let i = 0; i < newSuspensions.length; i++) {
                        if (newSuspensions[i].suspensionId == change.doc.id) {
                            newSuspensions[i] = {
                                ...change.doc.data(),
                                suspensionId: change.doc.id,
                                userId: change.doc.ref.parent.parent.id,
                                start_date: change.doc.data().start_date.toDate(),
                                end_date: change.doc.data().end_date.toDate()
                            }
                            break;
                        }
                    }
                }
            }
            setUserSuspensions(newSuspensions);
        }
    }, [userSuspensionsChanges])

    // Load parent alerts of comments that lack them
    useEffect(() => {
        let alertIds = alerts.map((v, i) => v.alertId);
        let requiredAlerts = [];
        for (let comment of comments) {
            if (!alertIds.includes(comment.alertId) && !requiredAlerts.includes(comment.alertId)) {
                requiredAlerts.push(comment.alertId);
            }
        }
        //console.log("Required alerts:", requiredAlerts)
        for (let reqId of requiredAlerts) {
            getAlert(reqId).then((snap) => {
                if (alerts.filter(x => x.alertId == snap.id).length == 0) { // extra verification
                    //console.log("Before set length", alerts.length, new Date().getTime())
                    setAlerts([...alerts, {
                        ...snap.data(),
                        alertId: snap.id,
                        date: snap.data().date.toDate()
                    }])
                }
            }).catch((err) =>
                console.error(err)
            )
        }
    }, [comments])

    // Load missing users for alerts, suspensions (mods) (not comments because the only comments should be those of this user)
    useEffect(() => {
        let userIds = usersData.map((v, i) => v.userId);
        let requiredUsers = [];
        for (let alert of alerts) {
            if (!userIds.includes(alert.userId) && !requiredUsers.includes(alert.userId)) {
                requiredUsers.push(alert.userId);
            }
        }
        for (let susp of userSuspensions) {
            if (!userIds.includes(susp.mod_id) && !requiredUsers.includes(susp.mod_id)) {
                requiredUsers.push(susp.mod_id);
            }
        }
        //console.log("Required users:", requiredUsers)
        for (let reqId of requiredUsers) {
            getUser(reqId).then((snap) => {
                if (usersData.filter(x => x.userId == snap.id).length == 0) {
                    setUsersData([...usersData, {
                        ...snap.data(),
                        userId: snap.id
                    }])
                }
            }).catch((err) =>
                console.error(err)
            )
        }
    }, [alerts, userSuspensions])

    // Get data or placeholder data for alerts, users, types
    const getAlertById = (alertId) => {
        let alert = alerts.filter(x => x.alertId == alertId).pop();
        return alert ? alert : { alertId }
    }

    const getUserById = (userId) => {
        let user = usersData.filter(x => x.userId == userId).pop()
        return user ? user : { userId, username: "...", full_name: "...", email: "...", telf_number: "..." }
    }

    const getAlertType = (typeId) => {
        let type = alertTypes[typeId];
        return type ? type : { typeId, name: "..." }
    }

    const buildUserHistory = () => {
        //console.log("alerts.length", alerts.length)
        let items = alerts.sort((a, b) => a.date - b.date).map((v, i) => ({ alert: v, comments: [], type: {} }));
        for (let item of items) {
            item.comments = comments.filter(x => x.alertId == item.alert.alertId).sort((a, b) => a.date - b.date);
        }
        //console.log("items", items)
        setBuiltAlertList(items);
        //return items;
    }

    useEffect(buildUserHistory, [alerts, comments, alertTypes])

    let selectedUser = getUserById(selectedUserId);

    useEffect(() => {
        loadAlertTypes();
    }, [])

    return (
        <Container>
            <Row className={"d-flex justify-content-center pb-3"}>
                <Col xs={"auto"}>
                    <h4>Usuario</h4>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Row>
                        <Card>
                            <Card.Body className="m-4">
                                <Row>
                                    <h5>Nombre de Usuario</h5><p>{selectedUser.username}</p>
                                </Row>
                                <Row>
                                    <h5>Nombre completo</h5><p>{selectedUser.full_name ? selectedUser.full_name : "..."}</p>
                                </Row>
                                <Row>
                                    <h5>Telefono</h5><p>{selectedUser.telf_number}</p>
                                </Row>
                                <Row>
                                    <h5>Correo electronico</h5><p>{selectedUser.email}</p>
                                </Row>
                                <Row className="mt-5">
                                    <Button onClick={() => setShowSuspendUserModal(true)}>Suspender</Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row className="mt-4">
                        <UserSuspensionList
                            selectedUserId={selectedUserId}
                            suspensionList={userSuspensions}
                            getUserById={getUserById}
                        />
                    </Row>
                </Col>
                <Col>
                    <UserHistoryList
                        alertList={builtAlertList}
                        getAlertById={getAlertById}
                        getUserById={getUserById}
                        getAlertType={getAlertType} />
                </Col>
            </Row>
            <SuspendUserModal
                show={showSuspendUserModal}
                onHide={() => setShowSuspendUserModal(false)}
                selectedUserId={selectedUserId}
                currentUserId={userData.userId}
            />
        </Container>
    )
}