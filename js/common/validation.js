export const isValidEmail = (email) => {
    const regrex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
    if (!email || email.length == 0) {
        return "Please enter your email.";
    } else if (!regrex.test(email)) {
        return "Your email is invalid";
    }
    return true;
};

export const isValidPassword = (password) => {
    if (!password || password.length == 0) {
        return "Please enter your password";
    }
    if (password.length < 6) {
        return "Your password is invalid";
    }
    return true;
};
