export const getAccessToken = async (code, provider) => {
  try {
    const { tokenUrl, clientId } = getConfig(provider);

    const redirectUri = window.location.origin;
    let response;
    if (provider === "facebook") {
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri + "/",
        code: code,
        code_verifier: localStorage.getItem("code_verifier"),
      });
      response = await fetch(`${authUrl}?${params.toString()}`, {
        method: "GET",
      });

      return await response.json();
    } else if (provider === "asgardeo") {
      response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code_verifier: localStorage.getItem("code_verifier"),
          client_id: clientId,
          code: code,
          redirect_uri: redirectUri,
        }),
      });
    } else {
      response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code_verifier: localStorage.getItem("code_verifier"),
          client_id: clientId,
          code: code,
          redirect_uri: redirectUri,
        }),
      });
    }

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
    tokenUrl = `https://${import.meta.env.VITE_OAUTH_AUTH0_DOMAIN}/oauth/token`;
    clientId = import.meta.env.VITE_OAUTH_AUTH0_CLIENT_ID;
  } else if (provider === "facebook") {
    tokenUrl = import.meta.env.VITE_OAUTH_FACEBOOK_TOKEN_ENDPOINT;
    clientId = import.meta.env.VITE_OAUTH_FACEBOOK_CLIENT_ID;
  } else if (provider === "asgardeo") {
    tokenUrl = `https://api.asgardeo.io/t/${import.meta.env.VITE_OAUTH_ASGARDEO_PROJECT_ID}/oauth2/token`;
    clientId = import.meta.env.VITE_OAUTH_ASGARDEO_CLIENT_ID;
  } else {
    throw new Error("Unsupported provider");
  }

  return { tokenUrl, clientId };
}
