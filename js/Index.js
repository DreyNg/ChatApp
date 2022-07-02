import CheckEmailScreen from "./containers/CheckEmail/CheckEmailScreen.js";
import LoginScreen from "./containers/Login/LoginScreen.js";
import MainScreen from "./containers/Main/MainScreen.js";
import InfoScreen from "./containers/Info/InfoScreen.js";

class App {
    constructor() {
        this.checkStayLogin();
    }
    // // storing using local storage
    // checkStayLogin() {
    //     const emailLoggedIn = localStorage.getItem("emailLoggedIn");
    //     let screen;
    //     if (emailLoggedIn) {
    //         screen = new MainScreen();
    //     } else {
    //         screen = new LoginScreen();
    //     }
    //     this.switchCurrentScreen(screen);
    // }

    // checking using Fb
    checkStayLogin() {
        firebase.auth().onAuthStateChanged((user) => {
            let screen;
            if (user) {
                if (user.emailVerified) {
                    // screen = new InfoScreen();
                    screen = new MainScreen();
                } else {
                    screen = new CheckEmailScreen();
                }
            } else {
                screen = new LoginScreen();
            }
            this.switchCurrentScreen(screen);
        });
    }
    switchCurrentScreen(screen) {
        const app = document.getElementById("app");
        app.innerHTML = "";
        screen.render(app);
        // app.appendChild(screen.render());
    }
}

const app = new App();
export default app;
