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
    userInfoEndpoint = import.meta.env.VITE_OAUTH_AUTH0_USERINFO_ENDPOINT;
  } else if (provider === "facebook") {
    userInfoEndpoint = import.meta.env.VITE_OAUTH_FACEBOOK_USERINFO_ENDPOINT;
  } else {
    console.error("Unsupported provider");
    return;
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
