export const getUserInfo = async (provider) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    console.error("No access token found. Please log in first.");
    return;
  }

  let userInfoEndpoint;
  if (provider === "google") {
    userInfoEndpoint = import.meta.env.VITE_OAUTH_GOOGLE_USERINFO_ENDPOINT;
  } else if (provider === "auth0") {
    userInfoEndpoint = `https://${import.meta.env.VITE_OAUTH_AUTH0_DOMAIN}/userinfo`;
  } else if (provider === "facebook") {
    userInfoEndpoint = import.meta.env.VITE_OAUTH_FACEBOOK_USERINFO_ENDPOINT;
  } else if (provider === "asgardeo") {
    userInfoEndpoint = `https://api.asgardeo.io/t/${import.meta.env.VITE_OAUTH_ASGARDEO_PROJECT_ID}/oauth2/userinfo`;
  } else if (provider === "clerk") {
    userInfoEndpoint = `https://${import.meta.env.VITE_OAUTH_CLERK_DOMAIN}/oauth/userinfo`;
  } else {
    throw new Error("Unsupported provider");
  }

  const response = await fetch(userInfoEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return await response.json();
};
