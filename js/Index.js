import LoginScreen from "./containers/Login/LoginIndex.js";
import RegisterScreen from "./containers/Register/RegisterIndex.js";
const app = document.getElementById("app");
const loginScreen = new LoginScreen();
const registerScreen = new RegisterScreen();
app.appendChild(registerScreen.render());
