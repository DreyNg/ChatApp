class ButtonComponent {
    button;

    constructor(text, classList, type, callBack) {
        this.button = document.createElement("button");
        this.button.type = type;
        this.button.innerText = text;
        this.button.classList.add(...classList);

        if (callBack) {
            this.button.addEventListener("click", callBack);
        }
    }

    render() {
        return this.button;
    }
}
export default ButtonComponent;
