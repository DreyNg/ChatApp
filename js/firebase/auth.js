import * as _noti from "../common/notify.js";

const config = {
    url: "http://127.0.0.1:5500/index.html",
    handleCodeInApp: true,
};

const createNewAccount = (email, password) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            user.sendEmailVerification(config);
            // ...
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;

            _noti.error(errorCode, errorMessage);
            // ..
        });
};

const loginWithEmailPass = async (email, password) => {
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     let user = userCredential.user;
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     let errorCode = error.code;
    //     let errorMessage = error.message;
    //     _noti.error(errorCode, errorMessage);
    //   });
    const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

    let user = userCredential.user;
    localStorage.setItem("emailLogined", user.email);
    localStorage.setItem("uid", user.uid);
    console.log(userCredential);
    return user;
};

export { createNewAccount, loginWithEmailPass };
