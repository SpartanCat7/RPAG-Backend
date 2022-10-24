import { collection, doc, FirestoreError, getDoc, getDocs, onSnapshot, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { firestore } from "../Utils/Firebase";

const alertQuery = (alertId) => {
    console.log("alertId", alertId)
    return doc(firestore, "Alerts", alertId)
}

const getAlert = (alertId) => {
    return getDoc(alertQuery(alertId));
}

const allAlertsQuery = () => {
    return collection(firestore, "Alerts");
}

const getAllAlerts = () => {
    return getDocs(allAlertsQuery());
}

/**
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
 const getAllAlertsOnSnapshot = (callback, onError) => {
    return onSnapshot(allAlertsQuery(), callback, onError);
}

/**
 * @param {string} userId 
 * @returns 
 */
const userAlertsQuery = (userId) => {
    return query(collection(firestore, "Alerts"), where("userId", "==", userId));
}

/**
 * @param {string} userId 
 * @returns 
 */
 const getUserAlerts = (userId) => {
    return getDocs(userAlertsQuery(userId));
}

/**
 * @param {string} userId 
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getUserAlertsOnSnapshot = (userId, callback, onError) => {
    return onSnapshot(userAlertsQuery(userId), callback, onError);
}

/**
 * @param {string} alertId 
 * @param {boolean} deleted 
 * @returns 
 */
const setAlertDeleted = (alertId, deleted) => {
    return updateDoc(doc(firestore, "Alerts", alertId), { deleted });
}

export {
    getAlert,
    allAlertsQuery,
    getAllAlerts,
    getAllAlertsOnSnapshot,
    userAlertsQuery,
    getUserAlerts,
    getUserAlertsOnSnapshot,
    setAlertDeleted,
};