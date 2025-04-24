
export const oktaConfig = {
    clientId: "0oaob97s093WB4Spx5d7",
    issuer: "https://dev-66242498.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true
}
