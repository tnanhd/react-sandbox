# js-oauth2

A vanilla JavaScript app demonstrating OAuth2 + PKCE with Auth0, Google, Facebook, and Asgardeo, bundled with Vite.

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
6. Copy the **Domain** (e.g. `dev-xxxx.us.auth0.com`) and **Client ID** from the app settings page

> All Auth0 endpoints are derived from the domain:
> - Authorization: `https://<domain>/oauth/authorize`
> - Token: `https://<domain>/oauth/token`
> - Logout: `https://<domain>/v2/logout`
> - User Info: `https://<domain>/userinfo`

### 2. Create a Google OAuth2 Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Choose **Universal Windows Platform** (To use authorization_code flow with PKCE)
6. Under **Authorized JavaScript origins**, add `http://localhost:5173`
7. Under **Authorized redirect URIs**, add `http://localhost:5173`
8. Click **Create** and copy the **Client ID**

### 3. Create a Facebook Application

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **My Apps > Create App**
3. Choose **Consumer** and click **Next**
4. Give your app a name and click **Create App**
5. From the dashboard, add the **Facebook Login** product
6. Go to **Facebook Login > Settings**
7. Copy the **App ID** from **Settings > Basic**

### 4. Create an Asgardeo Application

1. Log in to [Asgardeo Console](https://console.asgardeo.io/)
2. Go to **Applications** and click **New Application**
3. Choose **Single Page Application** and click **Create**
4. In your app settings, add `http://localhost:5173` to:
   - **Authorized redirect URLs**
   - **Allowed origins**
5. Save changes
6. Copy the **Client ID** from the app's **Protocol** tab
7. Copy your **Organization name** (shown in the URL as `https://api.asgardeo.io/t/<organization-name>/`)

> All Asgardeo endpoints are derived from the organization name:
> - Authorization: `https://api.asgardeo.io/t/<org>/oauth2/authorize`
> - Token: `https://api.asgardeo.io/t/<org>/oauth2/token`
> - Logout: `https://api.asgardeo.io/t/<org>/oidc/logout`
> - User Info: `https://api.asgardeo.io/t/<org>/oauth2/userinfo`

### 5. Configure Environment Variables

Create a `.env.local` file in the project root (gitignored, safe for secrets):

```
VITE_OAUTH_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_OAUTH_AUTH0_CLIENT_ID=your_auth0_client_id

VITE_OAUTH_GOOGLE_CLIENT_ID=your_google_client_id

VITE_OAUTH_FACEBOOK_CLIENT_ID=your_facebook_app_id

VITE_OAUTH_ASGARDEO_PROJECT_ID=your-organization-name
VITE_OAUTH_ASGARDEO_CLIENT_ID=your_asgardeo_client_id
```

Auth0 and Asgardeo API endpoints are constructed from their respective domain/org variables at runtime. Google and Facebook endpoints are already configured in `.env`.

### 6. Install and Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## How OAuth2 Login Works

### Step 1: Authorization Request

When the user clicks a **Login** button, the app generates a PKCE code verifier/challenge pair and redirects to the provider's authorization endpoint with: `response_type=code`, `client_id`, `redirect_uri`, `scope`, `code_challenge`, and `state` (used to identify the provider on return). The provider handles authentication and redirects back to `http://localhost:5173` with a short-lived `code` in the URL.

### Step 2: Token Exchange (Code for Access Token)

The app detects `code=` in the URL, reads the provider from the `state` parameter, then exchanges the code for an access token by calling the provider's token endpoint with the `code_verifier`. Each provider uses a slightly different format:

| Provider | Method | Format |
|----------|--------|--------|
| Auth0 | POST | `application/json` |
| Google | POST | `application/json` |
| Facebook | GET | query parameters |
| Asgardeo | POST | `application/x-www-form-urlencoded` |

### Step 3: Logout

| Provider | Logout mechanism |
|----------|-----------------|
| Auth0 | Redirect to `/v2/logout` with `returnTo` |
| Google | POST to `/revoke` token endpoint, then redirect home |
| Facebook | Redirect home (no server-side revocation endpoint) |
| Asgardeo | Redirect to `/oidc/logout` with `post_logout_redirect_uri` |
