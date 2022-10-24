import { addDoc, collection, doc, DocumentSnapshot, FirestoreError, getDoc, getDocs, onSnapshot, QuerySnapshot, updateDoc } from "firebase/firestore"
import { firestore } from "../Utils/Firebase"

/**
 * @param {string} userId 
 * @returns 
 */
const userSuspensionsQuery = (userId) => {
    return collection(firestore, "Users", userId, "Suspensions");
}

/**
 * @param {string} userId 
 * @returns 
 */
const getUserSuspensions = (userId) => {
    return getDocs(userSuspensionsQuery(userId));
}

/**
 * @param {string} userId 
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getUserSuspensionsOnSnapshot = (userId, callback, onError) => {
    return onSnapshot(userSuspensionsQuery(userId), callback, onError);
}

/**
 * @param {string} userId 
 * @param {string} suspensionId 
 */
const userSuspensionQuery = (userId, suspensionId) => {
    return doc(firestore, "Users", userId, "Suspensions", suspensionId)
}

/**
 * @param {string} userId 
 * @param {string} suspensionId 
 */
const getUserSuspension = (userId, suspensionId) => {
    return getDoc(userSuspensionQuery(userId, suspensionId))
}

/**
 * @param {string} userId 
 * @param {string} suspensionId 
 * @param {(snapshot: DocumentSnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getUserSuspensionOnSnapshot = (userId, suspensionId, callback, onError) => {
    return onSnapshot(userSuspensionQuery(userId, suspensionId), callback, onError);
}

/**
 * @param {string} userId
 * @param {{
 *      start_date: Date,
 *      end_date: Date,
 *      mod_id: string,
 *      mod_comment: string,
 *      reference: string
 * }} newSuspension 
 * @returns 
 */
const addUserSuspension = (userId, newSuspension) => {
    return addDoc(userSuspensionsQuery(userId), {
        start_date: newSuspension.start_date,
        end_date: newSuspension.end_date,
        mod_id: newSuspension.mod_id,
        mod_comment: newSuspension.mod_comment,
        reference: newSuspension.reference,
        is_active: true
    })
}

/**
 * @param {string} userId 
 * @param {string} suspensionId 
 * @param {boolean} is_active 
 */
const setUserSuspensionActive = (userId, suspensionId, is_active) => {
    return updateDoc(userSuspensionQuery(userId, suspensionId), { is_active })
}

export {
    userSuspensionsQuery,
    getUserSuspensions,
    getUserSuspensionsOnSnapshot,
    userSuspensionQuery,
    getUserSuspension,
    getUserSuspensionOnSnapshot,
    addUserSuspension,
    setUserSuspensionActive
}