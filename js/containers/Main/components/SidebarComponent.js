import SidebarConversation from "./SidebarConversation.js";
import { isValidName } from "../../../common/validation.js";
import * as _noti from "../../../common/notify.js";
import { createConversation, getUserByEmail } from "../../../firebase/store.js";
import { getCurrentUser } from "../../../firebase/auth.js";
class SidebarComponent {
    container;

    title;
    buttonCreate;

    listContainer;
    listConversation;

    modal;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("sidebar-container", "d-flex");
        // this.container.innerText = "SIDEBAR";

        this.title = document.createElement("div");
        this.title.classList.add("sidebar-title");
        this.title.innerText = "Drey's Chat App";

        this.buttonCreate = document.createElement("div");
        this.buttonCreate.classList.add("btn-create");
        this.buttonCreate.setAttribute("data-bs-toggle", "modal");
        this.buttonCreate.setAttribute(
            "data-bs-target",
            "#createConversationModal"
        );
        this.buttonCreate.innerText = "+";

        this.listContainer = document.createElement("div");
        this.listContainer.classList.add("list-container");

        this.listConversation = new Array(10)
            .fill(1)
            .map((i) => new SidebarConversation().render());

        this.renderModal();
    }

    renderModal() {
        this.modal = document.createElement("div");
        this.modal.classList.add("modal", "fade");
        this.modal.setAttribute("id", "createConversationModal");
        this.modal.setAttribute("tabindex", "-1");
        this.modal.setAttribute("aria-labelledby", "createConversationModal");
        this.modal.setAttribute("aria-hidden", "true");

        this.modal.innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="modalTittle">Create new conversation</h5>
            <button id="btn-icon-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="title">
              Name<span class="caution">*</span>
            </div>
            <div class="input-group mb-3">
                <input id="name-conversation" type="text" class="form-control modal-input " placeholder="New conversation" aria-label="new_conversation" aria-describedby="basic-addon1">
            </div>
            <div class="title">
              Image url
            </div>
            <div class="input-group mb-3">
                <input id="img-conversation" type="text" class="form-control modal-input " placeholder="Avatar..." aria-label="new_conversation" aria-describedby="basic-addon1">
            </div>
            </div>
            <button id="btn-close-modal" type="button" class="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
            <div class="modal-footer" id="modal-footer">
                <button id="btn-create-converstation" type="button" class=" btn-linear">Save changes</button>
            </div>
        </div>
      </div>
        `;
    }
    handleClose = () => {
        const name = document.getElementById("name-conversation");
        const avatarUrl = document.getElementById("img-conversation");
        const btnClose = document.getElementById("btn-icon-close");

        name.value = "";
        avatarUrl.value = "";
        btnClose.click();
    };

    handleCreate = async () => {
        try {
            const name = document.getElementById("name-conversation");
            const avatarUrl = document.getElementById("img-conversation");
            const user = getCurrentUser();
            console.log(name.value, avatarUrl.value);
            if (isValidName(name.value) != true) {
                _note.warning("Conversation name", isValidName(name.value));
                return;
            } else {
                await createConversation(
                    name.value,
                    avatarUrl.value,
                    "DESC",
                    [user.email],
                    user.email
                );
            }
            this.handleClose();
        } catch (error) {
            _note.error(error.code, error.message);
        }
    };

    render(parentContainer) {
        parentContainer.append(this.container);
        this.container.append(
            this.title,
            this.buttonCreate,
            this.listContainer,
            this.modal
        );
        this.listContainer.append(...this.listConversation);

        document
            .getElementById("btn-create-converstation")
            .addEventListener("click", this.handleCreate);
        document
            .getElementById("btn-icon-close")
            .addEventListener("click", this.handleClose);
    }
}

export default SidebarComponent;
