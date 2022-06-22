import ButtonComponent from "../../components/ButtonComponent.js";
import InputComponent from "../../components/InputComponent.js";
import { isValidEmail, isValidPassword } from "../../common/validation.js";
class LoginScreen {
    container;

    formLogin;
    emailInput;
    passwordInput;
    passwordConfirmationInput;

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

        this.title = document.createElement("div");
        this.title.classList.add("big-title");
        this.title.innerText = "Create new account";

        this.buttonSubmit = new ButtonComponent(
            "Sign up",
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
        this.passwordConfirmationInput = new InputComponent(
            "Password Confirmation",
            "passwordConfirmationInput",
            "login-password",
            "password"
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, passwordConfirmationInput } = e.target;
        let hasError = false;
        if (isValidEmail(email.value) != true) {
            this.emailInput.displayError(isValidEmail(email.value));
            hasError = true;
        } else {
            this.emailInput.displayError("");
        }

        if (isValidPassword(password.value) != true) {
            this.passwordInput.displayError(isValidPassword(password.value));
            hasError = true;
        } else {
            this.passwordInput.displayError("");
        }

        if (isValidPassword(passwordConfirmationInput.value) != true) {
            this.passwordConfirmationInput.displayError(
                isValidPassword(passwordConfirmationInput.value)
            );
            hasError = true;
        } else if (passwordConfirmationInput.value != password.value) {
            this.passwordConfirmationInput.displayError(
                "Password confirmation does not match"
            );
            hasError = true;
        } else {
            this.passwordConfirmationInput.displayError("");
        }

        if (!hasError) {
            console.log(
                "regisstered successfully",
                "email",
                email.value,
                "password",
                password.value
            );
        }
    };

    render() {
        this.formLogin.append(
            this.title,
            this.emailInput.render(),
            this.passwordInput.render(),
            this.passwordConfirmationInput.render(),
            this.buttonSubmit.render()
        );

        this.container.append(this.imageCover, this.formLogin);
        return this.container;
    }
}

export default LoginScreen;
