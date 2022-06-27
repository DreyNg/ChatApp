class MainScreen {
    container;

    cunstructor() {
        this.container = document.createElement("div");
        this.container.classList.add("main", "d-flex");
        this.container.innerText = "MAINSCREEN";
    }
    render() {
        return this.container;
    }
}

export default MainScreen;
