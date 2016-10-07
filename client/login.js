/* global Auth0Lock */
const lock = new Auth0Lock('OQUYViERGydL88E4kMAh0oT9uJAFCDZC', 'fullstack101.eu.auth0.com');

let profile = null;
const waiting = new Set();

lock.on("authenticated", authResult => {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) { waiting.forEach(cb => cb({error: error})); }
    localStorage.setItem('id_token', authResult.idToken);
    profile = profile;
    waiting.forEach(cb => cb(profile));
  });
});

const loginService =  {
  getLoggedInUser() {
      return Promise.resolve(profile);
  },
  promptLogin() {
    lock.show();
  },
  logout() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  },
  onLogin(callback) {
    waiting.add(callback);
  }
};

module.exports = loginService;
