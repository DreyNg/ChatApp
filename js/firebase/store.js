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
        _noti.error(errorCode, errorMessage);
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
        return querySnapshot.docs[0].data();
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        _noti.error(errorCode, errorMessage);
    }
}

export { createUser, getUserByEmail };
