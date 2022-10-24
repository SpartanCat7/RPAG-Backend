import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, FirestoreError, getDoc, getDocs, onSnapshot, query, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { CONSTS } from "../Utils/Constants";
import { auth, firestore } from "../Utils/Firebase";

/**
 * @param {String} userId 
 * @returns 
 */
const userQuery = (userId) => {
    return doc(firestore, "Users", userId)
}

/**
 * @param {String} userId 
 * @returns 
 */
const getUser = (userId) => {
    return getDoc(userQuery(userId));
}

/**
 * @param {string} userId 
 * @param {(snapshot: DocumentSnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getUserOnSnapshot = (userId, callback, onError) => {
    return onSnapshot(userQuery(userId), callback, onError);
}

const moderatorUsersQuery = () => {
    return query(collection(firestore, "Users"), where("type", "==", CONSTS.DB.USERS.TYPE.MOD));
}

const getModeratorUsers = () => {
    return getDocs(moderatorUsersQuery())
}

/**
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getModeratorUsersOnSnapshot = (callback, onError) => {
    return onSnapshot(moderatorUsersQuery(), callback, onError)
}

const subscriberUsersQuery = () => {
    return query(collection(firestore, "Users"), where("type", "==", CONSTS.DB.USERS.TYPE.SUB));
}

const getSubscriberUsers = () => {
    return getDocs(subscriberUsersQuery())
}

/**
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
const getSubscriberUsersOnSnapshot = (callback, onError) => {
    return onSnapshot(subscriberUsersQuery(), callback, onError)
}

const addModeratorUser = (email, username, password, callback, errorCallback) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        if (userCredential.user != null) {
            setDoc(doc(firestore, "Users", userCredential.user.uid), {
                username: username,
                type: CONSTS.DB.USERS.TYPE.MOD,
                telf_number: null,
                email: userCredential.user.email,
                active: true
            }).then(() => {
                callback(userCredential.user.uid);
            }).catch((error) => {
                errorCallback("Error creating user in Firestore: " + error.message);
            })
        }
    }).catch((error) => {
        errorCallback("Error creating user: " + error.message);
    })
}

const addSubscriberUser = (email, username, password, subAllowedTypes, callback, errorCallback) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        if (userCredential.user != null) {
            setDoc(doc(firestore, "Users", userCredential.user.uid), {
                username: username,
                type: CONSTS.DB.USERS.TYPE.SUB,
                telf_number: null,
                email: userCredential.user.email,
                active: true,
                subAllowedTypes: subAllowedTypes
            }).then(() => {
                callback(userCredential.user.uid);
            }).catch((error) => {
                errorCallback("Error creating user in Firestore: " + error.message);
            })
        }
    }).catch((error) => {
        errorCallback("Error creating user: " + error.message);
    })
}

/**
 * @param {string} userId 
 * @param {string} username 
 * @returns 
 */
const setUserUsername = (userId, username) => {
    return updateDoc(userQuery(userId), { username });
}

export {
    getUser,
    getUserOnSnapshot,
    moderatorUsersQuery,
    getModeratorUsers,
    getModeratorUsersOnSnapshot,
    subscriberUsersQuery,
    getSubscriberUsers,
    getSubscriberUsersOnSnapshot,
    addModeratorUser,
    addSubscriberUser,
    setUserUsername
};

