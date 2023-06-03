class ApiAuth {
    constructor(urlAuth) {
        this._urlAuth = urlAuth;
    }

    _serverResponceProcessing (res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      }

    getContent(token) {
        return fetch(`${this._urlAuth}users/me`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            }
          })
            .then(this._serverResponceProcessing)
    }

    userAuthorization (password, email) {
        return fetch(`${this._urlAuth}signin`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({password, email})
        })
          .then(this._serverResponceProcessing)
      }

      userRegistration (password, email) {
        return fetch(`${this._urlAuth}signup`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({password, email})
        })
          .then(this._serverResponceProcessing)
      }
}

export const apiAuth = new ApiAuth("https://auth.nomoreparties.co/");