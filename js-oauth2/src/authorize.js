import { generateCodeVerifierAndChallenge } from "./pkce.js";

export const authorize = async (provider) => {
  const { authUrl, clientId } = _getConfig(provider);
  const { codeVerifier, codeChallenge } =
    await generateCodeVerifierAndChallenge();
  localStorage.setItem("code_verifier", codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: window.location.origin,
    scope: "openid profile email",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state: provider,
  });

  window.location.href = `${authUrl}?${params.toString()}`;
};

function _getConfig(provider) {
  let authUrl;
  let clientId;
  
  if (provider === "google") {
    authUrl = import.meta.env.VITE_OAUTH_GOOGLE_AUTH_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID;
  } else if (provider === "auth0") {
    authUrl = import.meta.env.VITE_OAUTH_AUTH0_AUTH_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_AUTH0_CLIENT_ID;
  }

  return { authUrl, clientId };
}
