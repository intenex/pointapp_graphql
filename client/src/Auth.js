import auth0 from "auth0-js";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "pointapp.auth0.com",
      clientID: "In7MCkWcqQeuBKwKONpnYNIsd1Q04asR",
      redirectUri: "http://localhost:3000/callback",
      audience: "https://pointapp.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid email",
    });

    this.idToken = "";

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve(authResult);
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
    localStorage.setItem("email", JSON.stringify(
      authResult.idTokenPayload.email));
  }

  logout() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    localStorage.setItem("email", JSON.stringify(""));
    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: "In7MCkWcqQeuBKwKONpnYNIsd1Q04asR",
    });
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            localStorage.removeItem("email");
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }
}

const auth = new Auth();

export default auth;