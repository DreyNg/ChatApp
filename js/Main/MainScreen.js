class MainScreen {
    container;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("main", "d-flex");
        this.container.innerText = "MAIN SCREEN";
    }
    render(app) {
        app.append(this.container);
    }
}

export default MainScreen;
