class InputComponent {
    container;
    label;
    containerInput;
    input;
    errorMessage;

    name;
    type;
    id;

    constructor(label, name, id, type) {
        this.container = document.createElement("div");
        this.container.classList.add("row", "d-flex", "flex-wrap", "mt-4");

        this.inputContainer = document.createElement("div");
        this.inputContainer.classList.add("col-8");

        this.label = document.createElement("label");
        this.label.classList.add("col-4", "label-input");
        this.label.innerText = label;

        this.input = document.createElement("input");
        this.input.classList.add("form-control");
        this.input.name = name;
        this.input.id = id;
        this.input.type = type;

        this.errorMessage = document.createElement("div");
        this.errorMessage.classList.add("error-message", "mt-2", "d-none");
    }

    displayError(message) {
        this.errorMessage.innerText = message;
        this.errorMessage.classList.remove("d-none");
        this.errorMessage.classList.add("d-block");
    }

    setAtribute(attribute, value) {
        this.input.setAttribute(attribute, value);
    }

    setEventListender(event, callBackFunction) {
        this.input.addEventListener(event, callBackFunction);
    }

    render() {
        this.inputContainer.append(this.input, this.errorMessage);
        this.container.append(this.label, this.inputContainer);
        return this.container;
    }
}

export default InputComponent;
