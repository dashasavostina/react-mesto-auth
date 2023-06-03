import { url } from "./utils";

class ApiAuth {
    constructor(urlAuth) {
        this._urlAuth = urlAuth;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      }

    checkToken(token) {
        return fetch(`${this._urlAuth}users/me`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            }
          })
            .then(this._checkResponse)
    }

    authorize(password, email) {
        return fetch(`${this._urlAuth}signin`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({password, email})
        })
          .then(this._checkResponse)
      }

      register(password, email) {
        return fetch(`${this._urlAuth}signup`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({password, email})
        })
          .then(this._checkResponse)
      }
}

export const apiAuth = new ApiAuth(url);