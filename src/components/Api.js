export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleOriginalResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response}`);
    }
    return response.json();
  }

  getUsers() {
    return fetch(`${this._baseUrl}/users`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  getTasks() {
    return fetch(`${this._baseUrl}/tasks`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }
}
