export const setupLogoutButton = (button) => {
  button.addEventListener("click", () => {
    window.location.href = `https://${import.meta.env.VITE_OAUTH_DOMAIN}/v2/logout?client_id=${import.meta.env.VITE_OAUTH_CLIENT_ID}&returnTo=${encodeURIComponent(window.location.origin)}`;
  });
};
