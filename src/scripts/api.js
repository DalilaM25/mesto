import { checkResponse } from '../utils/utils';

const config = {
  headers: {
    authorization: 'a306f177-c6ab-4a77-8c2f-7f3972575f99',
    'Content-Type': 'application/json',
  },
};

function request(endpoint, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-9${endpoint}`,
    options
  ).then(checkResponse);
}

const getInitialCards = () => {
  return request(`/cards`, {
    headers: config.headers,
  });
};

const getInitialUser = () => {
  return request(`/users/me`, {
    headers: config.headers,
  });
};

const patchUserData = (name, job) => {
  return request(`/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`,
    }),
  });
};

const postNewCard = (cardName, cardLink) => {
  return request(`/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`,
      likes: [],
    }),
  });
};

const deleteCardFromServer = (cardID) => {
  return request(`/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

const addLike = (cardID) => {
  return request(`/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
  });
};

const removeLike = (cardID) => {
  return request(`/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

const patchUserAvatar = (avatar) => {
  return request(`/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatar}`,
    }),
  });
};

const checkUrlAvatar = (avatar) => {
  return fetch(avatar, {method: 'HEAD',
  headers: config.headers})
  .then(checkResponse);
}

export {
  getInitialCards,
  getInitialUser,
  patchUserData,
  patchUserAvatar,
  postNewCard,
  deleteCardFromServer,
  addLike,
  removeLike,
  checkUrlAvatar
};
