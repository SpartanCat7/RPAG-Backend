import { collection, collectionGroup, doc, FirestoreError, getDocs, onSnapshot, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { firestore } from "../Utils/Firebase";

/**
 * @param {string} alertId 
 * @returns 
 */
function alertsCommentsQuery(alertId) {
    return collection(firestore, "Alerts/" + alertId + "/Comments");
}

/**
 * @param {string} alertId 
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
function getAlertsCommentsOnSnapshot(alertId, callback, onError) {
    return onSnapshot(alertsCommentsQuery(alertId), callback, onError);
}

/**
 * @param {string} alertId 
 * @returns 
 */
function getAlertsComments(alertId) {
    return getDocs(alertsCommentsQuery(alertId));
}

/**
 * @param {string} userId 
 * @returns 
 */
function userCommentsQuery(userId) {
    return query(collectionGroup(firestore, "Comments"), where("userId", "==", userId));
}

/**
 * @param {string} userId 
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
function getUserCommentsOnSnapshot(userId, callback, onError) {
    return onSnapshot(userCommentsQuery(userId), callback, onError);
}

/**
 * @param {string} userId 
 * @returns 
 */
function getUserComments(userId) {
    return getDocs(userCommentsQuery(userId));
}

/**
 * @param {string} alertId 
 * @param {string} commentId 
 * @param {boolean} active 
 * @returns 
 */
function setCommentActive(alertId, commentId, active) {
    return updateDoc(doc(firestore, "Alerts", alertId, "Comments", commentId), { active });
}

export {
    alertsCommentsQuery,
    getAlertsComments,
    getAlertsCommentsOnSnapshot,
    userCommentsQuery,
    getUserComments,
    getUserCommentsOnSnapshot,
    setCommentActive
};