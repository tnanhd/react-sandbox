import { getAccessToken } from "./token.js";
import { authorize } from "./authorize.js";
import { logout } from "./logout.js";
import { getUserInfo } from "./userinfo.js";

const app = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.search.includes("code=")) {
    app.innerHTML = `
      <h1>OAuth Demo</h1>
      <button id="login-auth0">Login Auth0</button>
      <button id="login-google">Login Google</button>
    `;
    document
      .querySelector("#login-auth0")
      .addEventListener("click", () => authorize("auth0"));
    document
      .querySelector("#login-google")
      .addEventListener("click", () => authorize("google"));
    return;
  }

  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) {
    return;
  }

  const provider = new URLSearchParams(window.location.search).get("state");
  if (!provider) {
    console.error("Provider information missing in state parameter");
    return;
  }

  const accessToken = await getAccessToken(code, provider);
  localStorage.setItem("access_token", accessToken.access_token);
  window.history.replaceState({}, document.title, "/");

  app.innerHTML = `
      <h1>Access Token Retrieved</h1>
      <pre>${JSON.stringify(accessToken, null, 2)}</pre>
      <button id="logout">Logout</button>
      <button id="userinfo">Get User Info</button>
    `;
  document
    .querySelector("#logout")
    .addEventListener("click", () => logout(provider));
  document.querySelector("#userinfo").addEventListener("click", async () => {
    const userInfo = await getUserInfo(provider);
    app.innerHTML = `
        <h1>User Info</h1>
        <pre>${JSON.stringify(userInfo, null, 2)}</pre>
        <button id="logout">Logout</button>
      `;
    document
      .querySelector("#logout")
      .addEventListener("click", () => logout(provider));
  });
});
