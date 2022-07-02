import ButtonComponent from "../../components/ButtonComponent.js";
import InputComponent from "../../components/InputComponent.js";
import { isValidEmail, isValidPassword } from "../../common/validation.js";
import RegisterScreen from "../Register/RegisterScreen.js";
import app from "../../index.js";
import { loginWithEmailPass } from "../../firebase/auth.js";
import MainScreen from "../Main/MainScreen.js";
import * as _noti from "../../common/notify.js";

class LoginScreen {
    container;

    emailInput;
    passwordInput;
    switchScreen;
    imageCover;
    formLogin;
    buttonSubmit;
    title;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("login-form", "d-flex");

        this.imageCover = document.createElement("div");
        this.imageCover.classList.add("image-cover");

        this.formLogin = document.createElement("form");
        this.formLogin.classList.add("form-container");
        this.formLogin.addEventListener("submit", this.handleSubmit);

        this.switchScreen = document.createElement("a");
        this.switchScreen.innerText = "Create new account";
        this.switchScreen.classList.add("d-block", "switchScreen");
        this.switchScreen.addEventListener("click", this.handleSwitchScreen);

        this.title = document.createElement("div");
        this.title.classList.add("big-title");
        this.title.innerText = "Welcome Back!";

        this.buttonSubmit = new ButtonComponent(
            "Sign in",
            ["btn", "btn-primary", "mt-3", "d-block"],
            "submit"
        );

        this.emailInput = new InputComponent(
            "Email",
            "email",
            "login-email",
            "text"
        );

        this.passwordInput = new InputComponent(
            "Password",
            "password",
            "login-password",
            "password"
        );
    }

    handleSwitchScreen = (e) => {
        app.switchCurrentScreen(new RegisterScreen());
    };

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { email, password } = e.target;
            let hasError = false;
            if (isValidEmail(email.value) != true) {
                this.emailInput.displayError(isValidEmail(email.value));
                hasError = true;
            } else {
                this.emailInput.displayError("");
            }
            if (isValidPassword(password.value) != true) {
                this.passwordInput.displayError(
                    isValidPassword(password.value)
                );
                hasError = true;
            } else {
                this.passwordInput.displayError("");
            }
            if (!hasError) {
                const userLogin = await loginWithEmailPass(
                    email.value,
                    password.value
                );
                const mainScreen = new MainScreen();
                app.switchCurrentScreen(mainScreen);
            }
        } catch (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            _noti.error(errorCode, errorMessage);
        }
    };

    render(app) {
        this.formLogin.append(
            this.title,
            this.emailInput.render(),
            this.passwordInput.render(),
            this.buttonSubmit.render(),
            this.switchScreen
        );

        this.container.append(this.imageCover, this.formLogin);
        app.append(this.container);
    }
}

export default LoginScreen;
