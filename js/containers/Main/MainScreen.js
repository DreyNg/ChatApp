import SidebarComponent from "./components/SidebarComponent.js";

class MainScreen {
    container;

    paper;
    sidebarComponent;
    chatComponent;
    userInfocomponent;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("chat-container", "d-flex");

        this.paper = document.createElement("div");
        this.paper.classList.add("chat-paper");

        this.sidebarComponent = new SidebarComponent();
    }
    render(app) {
        app.append(this.container);

        this.container.append(this.paper);
        this.sidebarComponent.render(this.paper);
    }
}

export default MainScreen;
