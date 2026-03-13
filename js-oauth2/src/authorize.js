import { generateCodeVerifierAndChallenge } from "./pkce.js";

export const authorize = async (provider) => {
  const { authUrl, clientId } = _getConfig(provider);
  const { codeVerifier, codeChallenge } =
    await generateCodeVerifierAndChallenge();
  const redirectUri = window.location.origin;
  localStorage.setItem("code_verifier", codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state: provider,
  });

  if (provider === "facebook") {
    params.append("scope", "openid");
  } else {
    params.append("scope", "openid profile email");
  }

  if (provider === "auth0") {
    params.append("audience", import.meta.env.VITE_OAUTH_AUTH0_AUDIENCE);
  }

  const authEndpoint = `${authUrl}?${params.toString()}`;
  console.log("Redirecting to auth endpoint:", authEndpoint);
  window.location.href = authEndpoint;
};

function _getConfig(provider) {
  let authUrl;
  let clientId;
  
  if (provider === "google") {
    authUrl = import.meta.env.VITE_OAUTH_GOOGLE_AUTH_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID;
  } else if (provider === "auth0") {
    authUrl = `https://${import.meta.env.VITE_OAUTH_AUTH0_DOMAIN}/oauth/authorize`;
    clientId = import.meta.env.VITE_OAUTH_AUTH0_CLIENT_ID;
  } else if (provider === "facebook") {
    authUrl = import.meta.env.VITE_OAUTH_FACEBOOK_AUTH_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_FACEBOOK_CLIENT_ID;
  } else if (provider === "asgardeo") {
    authUrl = `https://api.asgardeo.io/t/${import.meta.env.VITE_OAUTH_ASGARDEO_PROJECT_ID}/oauth2/authorize`;
    clientId = import.meta.env.VITE_OAUTH_ASGARDEO_CLIENT_ID;
  } else if (provider === "clerk") {
    authUrl = `https://${import.meta.env.VITE_OAUTH_CLERK_DOMAIN}/oauth/authorize`;
    clientId = import.meta.env.VITE_OAUTH_CLERK_CLIENT_ID;
  } else if (provider === "workos") {
    authUrl = `https://${import.meta.env.VITE_OAUTH_WORKOS_DOMAIN}/oauth2/authorize`;
    clientId = import.meta.env.VITE_OAUTH_WORKOS_CLIENT_ID;
  } else {
    throw new Error("Unsupported provider: " + provider);
  }

  return { authUrl, clientId };
}
