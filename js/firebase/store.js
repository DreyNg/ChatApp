import database from "./index.js";
import * as _noti from "../common/notify.js";

async function createUser(email, password, name, phone, avatarUrl) {
    try {
        const response = await database.collection("users").add({
            email,
            password,
            name,
            phone,
            avatarUrl,
        });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // _noti.error(errorCode, errorMessage);
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const querySnapshot = await database
            .collection("users")
            .where("email", "==", email)
            .get();

        if (querySnapshot.docs.length == 0) {
            return null;
        }
        return {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
        };
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // _noti.error(errorCode, errorMessage);
        throw error;
    }
}

async function updateUser(userId, email, name, phone, avatarUrl) {
    try {
        const response = await database.collection("users").doc(userId).update({
            email,
            name,
            phone,
            avatarUrl,
        });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // _noti.error(errorCode, errorMessage);
        throw error;
    }
}

async function createConversation(name, avatarUrl, desc, users, email) {
    try {
        const response = await database.collection("conversations").add({
            name,
            avatarUrl,
            // description: desc,
            users,
            creator: email,
        });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // _noti.error(errorCode, errorMessage);
        throw error;
    }
}

async function updateConversation(id, name, avatarUrl, users, email) {
    try {
        const response = await database
            .collection("conversations")
            .doc(id)
            .update({
                name,
                avatarUrl,
                // description: desc,
                users,
                creator: email,
            });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // _noti.error(errorCode, errorMessage);
        throw error;
    }
}

async function deleteConversation() {
    try {
        const response = await database.collection("conversations").delete();
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // _noti.error(errorCode, errorMessage);
        throw error;
    }
}

export {
    createUser,
    getUserByEmail,
    updateUser,
    createConversation,
    updateConversation,
    deleteConversation,
};
