import {apiData} from "./utils";  
  
  class Api {
    constructor({ link, headers }) {
        this._link = link;
        this._headers = headers;
    }

    _checkResponce(res) {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    }

    addNewCard(name, link) {
      return fetch(`${this._link}cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ name, link})
      })
      .then(res => {
        return this._checkResponce(res)
      })
    }

    getInitialCards() {
        return fetch(`${this._link}cards`, {
          headers: this._headers
        })
          .then(res => { return this._checkResponce(res) })
    }

    deleteCard(cardId) {
        return fetch(`${this._link}cards/${cardId}`, {
          headers: this._headers,
          method: 'DELETE',
        })
          .then(res => { return this._checkResponce(res) })
    }

    getUserData() {
        return fetch(`${this._link}users/me`, {
          headers: this._headers
        })
          .then(res => { return this._checkResponce(res) })
    }

    sendUserData(profileData) {
        return fetch(`${this._link}users/me`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({ name: profileData.name, about: profileData.job })
        })
          .then(res => { return this._checkResponce(res) })
      }

    sendAvatarData(avatarLink) {
        return fetch(`${this._link}users/me/avatar`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({ avatar: avatarLink.avatar })
        })
          .then(res => { return this._checkResponce(res) })
      }

    changeLikeCardStatus(cardId, isLiked) {
      if (isLiked) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
          headers: this._headers,
          method: 'PUT',
        })
          .then(res => { return this._checkResponce(res) })
      } else {
        return fetch(`${this._link}cards/${cardId}/likes`, {
          headers: this._headers,
          method: 'DELETE',
        })
          .then(res => { return this._checkResponce(res) })
      }
    }
}

export const apiJoin = new Api(apiData);