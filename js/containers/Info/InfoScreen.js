import ButtonComponent from "../../components/ButtonComponent.js";
import InputComponent from "../../components/InputComponent.js";
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

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("info-screen");

        this.paper = document.createElement("div");
        this.paper.classList.add("paper");

        this.avatarContainer = document.createElement("div");
        this.avatarContainer.classList.add("avatar-container");
        this.avatar = document.createElement("div");
        this.avatar.classList.add("avatar");

        this.formContainer = document.createElement("div");
        this.formContainer.classList.add("form-container");

        this.title = document.createElement("div");
        this.title.classList.add("big-title");
        this.title.innerText = "Create your profile";

        this.email = new InputComponent(
            "Email address",
            "email",
            "info-email",
            "text"
        );
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

        this.button = new ButtonComponent(
            "Save",
            ["btn", "btn-primary", "mt-3", "d-block"],
            "submit"
        );
    }

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
