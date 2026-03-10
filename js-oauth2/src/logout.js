export const logout = (provider) => {
  const accessToken = localStorage.getItem("access_token");
  localStorage.removeItem("access_token");

  const redirectUri = window.location.origin;

  if (provider === "google") {
    fetch(
      `${import.meta.env.VITE_OAUTH_GOOGLE_REVOKE_ENDPOINT}?token=${accessToken}`,
      { method: "POST" },
    ).finally(() => {
      window.location.href = redirectUri;
    });
    return;
  }

  if (provider === "auth0") {
    window.location.href = `${import.meta.env.VITE_OAUTH_AUTH0_LOGOUT_ENDPOINT}?client_id=${import.meta.env.VITE_OAUTH_AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(window.location.origin)}`;
  }
  
  if (provider === "facebook") {
    window.location.href = redirectUri;
  }
};
