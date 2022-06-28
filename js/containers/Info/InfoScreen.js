import ButtonComponent from "../../components/ButtonComponent.js";
import InputComponent from "../../components/InputComponent.js";
import { getCurrentUser } from "../../firebase/auth.js";
import app from "../../index.js";
import MainScreen from "../../Main/MainScreen.js";
import { isValidPhone } from "../../common/validation.js";
import {
    createUser,
    getUserByEmail,
    updateUser,
} from "../../firebase/store.js";

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
        e.preventDefault();
        // console.log("abc");
        const { email, name, phone, avatarUrl } = e.target;
        // createUser(email.value, "", name.value, phone.value, avatarUrl.value);
        updateUser(
            this.userId,
            email.value,
            name.value,
            phone.value,
            avatarUrl.value
        );
        let hasError = false;
        // if (isValidPhone(phone.value) != true) {
        //     this.phone.displayError(isValidPhone(phone.value));
        //     hasError = true;
        //     // console.log("ababababa");
        // } else {
        //     this.phone.displayError("");
        // }
        if (!hasError) {
            // console.log("xxxxxxx");
            // const mainScreen = new MainScreen();
            // app.switchCurrentScreen(mainScreen);
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
