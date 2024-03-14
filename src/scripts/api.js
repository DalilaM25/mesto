const getInitialCards = (config) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const getInitialUser = (config) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const patchUserData = (config, name, job) => {
   return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: `${name}`,
    about: `${job}`
  })
})};

const postNewCard = (config, cardName, cardLink) => {
return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: `${cardName}`,
        link: `${cardLink}`,
        likes: []
    })
  })
}

const deleteCardFromServer = (config, cardID) => {
    return fetch (`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export { getInitialCards, getInitialUser, patchUserData, postNewCard, deleteCardFromServer };
