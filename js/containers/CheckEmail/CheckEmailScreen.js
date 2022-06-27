class CheckEmailScreen {
    container;
    button;
    constructor() {
        this.container = document.createElement("div");
        this.container.innerHTML = `
    <div class="forny-inner">
    <div class="d-flex flex-column align-items-center mail">
    <div class="col-12">
        <div class="text-center">
        <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_se3w0ukg.json"
            background="transparent"
            speed="1"
            style="width: 300px; height: 300px; margin: auto"
            loop
            autoplay
        ></lottie-player>
        </div>
    </div>
    <div class="col-5 text-center mail">
        <h1>Confirm your email!</h1>
        <p>
        Your Account have been suscessfully registered. To complete the
        process, please check your email for a validation request
        </p>
        <button id="open-gmail" type="button" class="btn btn-primary">Open Gmail</button>
        </p>
    </div>
    </div>
</div>`;
    }
    render(app) {
        app.append(this.container);

        this.button = document.getElementById("open-gmail");
        this.button.addEventListener("click", () => {
            window.location.href = "https://mail.google.com/";
        });
    }
}
export default CheckEmailScreen;
