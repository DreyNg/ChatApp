class SidebarComponent {
    container;

    title;
    listConversation;
    buttonCreate;
    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("sidebar-container", "d-flex");
        this.container.innerText = "SIDEBAR";
    }
    render() {
        return this.container;
    }
}

export default SidebarComponent;
