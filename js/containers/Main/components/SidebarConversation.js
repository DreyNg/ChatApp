class SidebarConversation {
    container;

    avatarUrl;

    subContainer;
    title;
    description;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("sidebar-chat", "d-flex");
        this.container.innerText = "Drey Nguyen";
    }

    render() {
        return this.container;
    }
}

export default SidebarConversation;
