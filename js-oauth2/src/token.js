export const getAccessToken = async (code, provider) => {
  try {
    const { authUrl, clientId } = getConfig(provider);

    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code_verifier: localStorage.getItem("code_verifier"),
        client_id: clientId,
        code: code,
        redirect_uri: window.location.origin,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

function getConfig(provider) {
  console.log("Determining config for provider:", provider);
  let tokenUrl;
  let clientId;

  if (provider === "google") {
    tokenUrl = import.meta.env.VITE_OAUTH_GOOGLE_TOKEN_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID;
  } else if (provider === "auth0") {
    tokenUrl = import.meta.env.VITE_OAUTH_AUTH0_TOKEN_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_AUTH0_CLIENT_ID;
  }

  return { authUrl: tokenUrl, clientId };
}
