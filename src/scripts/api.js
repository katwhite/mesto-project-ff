const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '7233fdd2-d785-4e08-ba5d-6576f5adcf9b',
      'Content-Type': 'application/json'
    }
}

const handleResponse = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = new Promise ((resolve) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => handleResponse(res))
    .then(result => resolve(result))
})

export const editUserinfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    })
    .then((res) => handleResponse(res))
}

export const editUserPic = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    })
    .then((res) => handleResponse(res))
}
  
export const getInitialCards = new Promise ((resolve) => {
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => handleResponse(res))
    .then(result => resolve(result))
})

export const addNewCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    })
    .then((res) => handleResponse(res))
}

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => handleResponse(res))
}

export const likeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => handleResponse(res))
}

export const unlikeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => handleResponse(res))
}