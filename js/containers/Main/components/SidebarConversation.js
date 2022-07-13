class SidebarConversation {
    // Layout
    container;
    subContainer;
    actionContainer;
    popUpContainer;

    avatarEle;
    nameEle;
    descEle;
    btnMore;
    btnUpdate;
    btnDelete;

    //Data
    id;
    name;
    avatarUrl;
    desc;
    users;
    creater;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("cs-item", "d-flex");
        this.container.addEventListener("mouseleave", this.hidePopup);

        this.avatarEle = document.createElement("div");
        this.avatarEle.classList.add("cs-avatar");

        this.subContainer = document.createElement("div");
        this.subContainer.classList.add("cs-sub-container");

        this.actionContainer = document.createElement("div");
        this.actionContainer.classList.add("cs-action-container");

        this.nameEle = document.createElement("div");
        this.nameEle.classList.add("cs-name");

        this.descEle = document.createElement("div");
        this.descEle.classList.add("cs-desc");

        this.popUpContainer = document.createElement("div");
        this.popUpContainer.classList.add("cs-popup");

        this.btnMore = document.createElement("div");
        this.btnMore.classList.add("btn-show-more");
        this.btnMore.addEventListener("click", this.handleToggle);

        this.btnUpdate = document.createElement("div");
        this.btnUpdate.classList.add("btn-popup");
        this.btnUpdate.innerText = "Update";

        this.btnDelete = document.createElement("div");
        this.btnDelete.classList.add("btn-popup");
        this.btnDelete.innerText = "Delete";
    }

    hidePopup = () => {
        if (this.popUpContainer.classList.contains("show")) {
            this.popUpContainer.classList.remove("show");
        }
    };
    handleToggle = (e) => {
        if (this.popUpContainer.classList.contains("show")) {
            this.popUpContainer.classList.remove("show");
        } else {
            this.popUpContainer.classList.add("show");
        }
    };

    render() {
        this.container.append(
            this.avatarEle,
            this.subContainer,
            this.actionContainer
        );

        this.subContainer.append(this.nameEle, this.descEle);
        this.actionContainer.append(this.btnMore);
        this.btnMore.append(this.popUpContainer);
        this.popUpContainer.append(this.btnUpdate, this.btnDelete);

        return this.container;
    }
}

export default SidebarConversation;
