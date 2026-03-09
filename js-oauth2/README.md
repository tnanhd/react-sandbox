# js-auth0

A vanilla JavaScript app with Auth0 authentication, bundled with Vite.

## Setup

### 1. Create an Auth0 Application

1. Log in to [Auth0 Dashboard](https://manage.auth0.com/)
2. Go to **Applications > Applications** and click **Create Application**
3. Choose **Single Page Application** and click **Create**
4. In your app settings, add `http://localhost:5173` to:
   - **Allowed Callback URLs**
   - **Allowed Logout URLs**
   - **Allowed Web Origins**
5. Save changes

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```
VITE_OAUTH_CLIENT_ID=your_auth0_client_id
VITE_OAUTH_DOMAIN=your_auth0_domain
```

- `VITE_OAUTH_CLIENT_ID` — found in your Auth0 app settings under **Client ID**
- `VITE_OAUTH_DOMAIN` — found under **Domain** (e.g. `dev-xxxx.us.auth0.com`)

### 3. Install and Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## How OAuth2 Login Works

### Step 1: Authorization Request (Redirect to Auth0)

When the user clicks **Login**, the app generates a PKCE code verifier/challenge pair and redirects the browser to Auth0's `/authorize` endpoint with the following parameters: `response_type=code`, `client_id`, `redirect_uri`, `scope`, and the `code_challenge`. Auth0 handles authentication (login form, MFA, etc.) and, on success, redirects back to the app with a short-lived `code` in the URL query string.

### Step 2: Token Exchange (Code for Access Token)

The app detects the `code` in the URL, then POSTs it to Auth0's `/oauth/token` endpoint along with the original `code_verifier` and `client_id`. Auth0 validates the code and verifier, and returns an **access token** that the app can use to authenticate API requests.
