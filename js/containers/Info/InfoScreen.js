import ButtonComponent from "../../components/ButtonComponent.js";
import InputComponent from "../../components/InputComponent.js";
import { getCurrentUser } from "../../firebase/auth.js";
import app from "../../Index.js";
import MainScreen from "../Main/MainScreen.js";
import { isValidPhone, isValidName } from "../../common/validation.js";
import {
    createUser,
    getUserByEmail,
    updateUser,
} from "../../firebase/store.js";
import * as _noti from "../../common/notify.js";

class InfoScreen {
    container;

    paper;

    avatarContainer;
    avatar;

    formContainer;
    title;
    email;
    name;
    phone;
    avatarUrl;

    button;

    userId;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("info-screen");

        this.paper = document.createElement("div");
        this.paper.classList.add("paper");

        this.avatarContainer = document.createElement("div");
        this.avatarContainer.classList.add("avatar-container");
        this.avatar = document.createElement("div");
        this.avatar.classList.add("avatar");

        this.formContainer = document.createElement("form");
        this.formContainer.classList.add("form-container");
        // this.formContainer.addEventListener("submit", this.handleSubmit);
        this.formContainer.addEventListener("submit", this.handleSubmit);

        this.title = document.createElement("div");
        this.title.classList.add("big-title");
        this.title.innerText = "Create your profile";

        this.email = new InputComponent(
            "Email address",
            "email",
            "info-email",
            "text"
        );
        const user = getCurrentUser();
        this.email.setAtribute("value", user.email);
        this.email.setAtribute("disabled", true);

        this.name = new InputComponent(
            "Full Name",
            "name",
            "info-name",
            "text"
        );
        this.phone = new InputComponent(
            "Phone Number",
            "phone",
            "info-phone",
            "text"
        );
        this.avatarUrl = new InputComponent(
            "Avatar URL",
            "avatarUrl",
            "info-avatarUrl",
            "text"
        );
        this.avatarUrl.setEventListender("input", this.changeAvatar);

        this.button = new ButtonComponent(
            "Save",
            ["btn", "btn-primary", "mt-3", "d-block"],
            "submit"
        );

        this.fetchUserByEmail();
    }

    async fetchUserByEmail() {
        const user = getCurrentUser();
        const userStored = await getUserByEmail(user.email);
        if (userStored) {
            this.userId = userStored.id;

            this.name.setAtribute("value", userStored.name);
            this.phone.setAtribute("value", userStored.phone);
            this.avatarUrl.setAtribute("value", userStored.avatarUrl);
            this.avatar.style.backgroundImage = `url(${userStored.avatarUrl})`;
        } else {
            this.userId = "";
        }
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { email, name, phone, avatarUrl } = e.target;
            let hasError = false;

            if (isValidPhone(phone.value) != true) {
                this.phone.displayError(isValidPhone(phone.value));
                hasError = true;
            } else {
                this.phone.displayError("");
            }

            if (isValidName(name.value) != true) {
                this.name.displayError(isValidName(name.value));
                hasError = true;
            } else {
                this.name.displayError("");
            }
            if (!hasError) {
                if (this.userId) {
                    await updateUser(
                        this.userId,
                        email.value,
                        name.value,
                        phone.value,
                        avatarUrl.value
                    );
                } else {
                    await createUser(
                        email.value,
                        "",
                        name.value,
                        phone.value,
                        avatarUrl.value
                    );
                }
                console.log("xxxxxxx");
                const mainScreen = new MainScreen();
                app.switchCurrentScreen(mainScreen);
            }
        } catch (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            _noti.error(errorCode, errorMessage);
        }
    };

    changeAvatar = (e) => {
        this.avatar.style.backgroundImage = `url(${e.target.value})`;
    };

    render(app) {
        this.container.append(this.paper);

        this.paper.append(this.formContainer, this.avatarContainer);

        this.avatarContainer.append(this.avatar);

        this.formContainer.append(
            this.title,
            this.email.render(),
            this.name.render(),
            this.phone.render(),
            this.avatarUrl.render(),
            this.button.render()
        );

        app.append(this.container);
    }
}

export default InfoScreen;
