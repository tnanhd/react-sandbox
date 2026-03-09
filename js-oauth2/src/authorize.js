import { generateCodeVerifierAndChallenge } from "./pkce.js";

const AUTHORIZE_URL = `https://${import.meta.env.VITE_OAUTH_DOMAIN}/authorize`;
const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

export const setupLoginButton = (button) => {
  button.addEventListener("click", async () => {
    const { codeVerifier, codeChallenge } =
      await generateCodeVerifierAndChallenge();
    localStorage.setItem("code_verifier", codeVerifier);

    const redirectUri = window.location.origin;
    const scope = "openid profile email";

    const url = `${AUTHORIZE_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = url;
  });
};
