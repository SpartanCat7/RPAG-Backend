import { addDoc, collection, doc, FirestoreError, onSnapshot, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
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

const setName = (subId, name) => {
    return updateDoc(doc(firestore, "Subscriptions", subId), { name });
}

const setActive = (subId, active) => {
    return updateDoc(doc(firestore, "Subscriptions", subId), { active });
}

const setDestination = (subId, destination) => {
    return updateDoc(doc(firestore, "Subscriptions", subId), { destination });
}

export {
    getSubscriptionsByUserIdQuery,
    getSubscriptionsByUserIdOnSnapshot,
    addSubscription,
    setName,
    setActive,
    setDestination
}