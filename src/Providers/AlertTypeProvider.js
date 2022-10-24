import { collection, doc, getDocs, onSnapshot, QuerySnapshot, setDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../Utils/Firebase";


/**
 * 
 * @param {string} id 
 * @param {string} name 
 * @param {string} description 
 * @param {string} icon 
 * @param {number} lifetime
 */
function addAlertType(id, name, description, icon, lifetime, iconUrl) {
    return setDoc(doc(firestore, "AlertTypes", id), {
        name,
        description,
        icon,
        iconUrl,
        lifetime
    });
}

function alertTypesQuery() {
    return collection(firestore, "AlertTypes");
}

function getAlertTypes() {
    return getDocs(alertTypesQuery());
}

/**
 * @param {(snapshot: QuerySnapshot<import("firebase/firestore").DocumentData>) => void} callback 
 * @param {(error: FirestoreError) => void} onError 
 * @returns 
 */
function getAlertTypesOnSnapshot(callback, onError) {
    return onSnapshot(alertTypesQuery(), callback, onError);
}

/**
 * 
 * @param {File} file 
 * @param {string} fileName 
 * @returns 
 */
function uploadIconFile(file, fileName) {
    return uploadBytes(ref(storage, "AlertTypeIcons/" + fileName), file);
}

function setName(typeId, name) {
    return updateDoc(doc(firestore, "AlertTypes", typeId), { name });
}

function setDescription(typeId, description) {
    return updateDoc(doc(firestore, "AlertTypes", typeId), { description });
}

function setLifetime(typeId, lifetime) {
    return updateDoc(doc(firestore, "AlertTypes", typeId), { lifetime });
}

function setIcon(typeId, fileName, file, callback, onError) {
    uploadIconFile(file, fileName).then(async (res) => {
        let downloadUrl = await getDownloadURL(res.ref);
        updateDoc(doc(firestore, "AlertTypes", typeId), {
            icon: res.ref.fullPath,
            iconUrl: downloadUrl
        }).then(callback).catch(err => onError(err))
    }).catch(err => onError(err));
}

export { 
    alertTypesQuery,
    getAlertTypes,
    getAlertTypesOnSnapshot,
    addAlertType,
    uploadIconFile,
    setName,
    setDescription,
    setLifetime,
    setIcon
}