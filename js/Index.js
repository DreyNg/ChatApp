import LoginScreen from "./containers/Login/LoginScreen.js";

class App {
    constructor() {
        const app = document.getElementById("app");
        const loginScreen = new LoginScreen();
        app.appendChild(loginScreen.render());
    }
    switchCurrentScreen(screen) {
        const app = document.getElementById("app");
        app.innerHTML = "";
        app.appendChild(screen.render());
    }
}

const app = new App();
export default app;
