import { getAccessToken } from "./token.js";
import { setupLoginButton } from "./authorize.js";
import { setupLogoutButton } from "./logout.js";

const app = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.search.includes("code=")) {
    app.innerHTML = `
      <h1>Auth0 Demo</h1>
      <button id="login">Login</button>
    `;
    setupLoginButton(document.querySelector("#login"));
    return;
  }

  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) {
    return;
  }

  console.log("Authorization code detected:", code);
  const token = await getAccessToken(code);
  window.history.replaceState({}, document.title, "/");

  app.innerHTML = `
      <h1>Access Token Retrieved</h1>
      <p>Access token: ${token}</p>
      <button id="logout">Logout</button>
    `;
  setupLogoutButton(document.querySelector("#logout"));
});
