import { addDoc, collection, FirestoreError, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import { firestore } from "../Utils/Firebase";

const getSubscriptionsByUserIdQuery = (userId) => {
    return query(collection(firestore, "Subscriptions"), where("userId", "==", userId));
}

/**
 * 
 * @param {string} userId 
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getSubscriptionsByUserIdOnSnapshot = (userId, callback, onError) => {
    return onSnapshot(getSubscriptionsByUserIdQuery(userId), callback, onError);
}

/**
 * 
 * @param {string} userId 
 * @param {string} name 
 * @param {Date} date 
 * @param {string} typeId 
 * @param {string} destination 
 * @returns 
 */
const addSubscription = (userId, name, date, typeId, destination) => {
    return addDoc(collection(firestore, "Subscriptions"), {
        userId,
        name,
        date,
        typeId,
        destination,
        active: true,
        deleted: false
    })
}

export { getSubscriptionsByUserIdQuery, getSubscriptionsByUserIdOnSnapshot, addSubscription }