const TOKEN_ENDPOINT = `https://${import.meta.env.VITE_OAUTH_DOMAIN}/oauth/token`;
const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

export const getAccessToken = async (code) => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code_verifier: localStorage.getItem("code_verifier"),
        client_id: CLIENT_ID,
        code: code,
        redirect_uri: window.location.origin,
      }),
    });
    const data = await response.json();
    console.log("Access token response:", data);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
