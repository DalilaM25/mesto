import { checkResponse } from '../utils/utils';

function request(endpoint, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-9${endpoint}`,
    options
  ).then(checkResponse);
}

const getInitialCards = (config) => {
  return request(`/cards`, {
    headers: config.headers,
  });
};

const getInitialUser = (config) => {
  return request(`/users/me`, {
    headers: config.headers,
  });
};

const patchUserData = (config, name, job) => {
  return request(`/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`,
    }),
  });
};

const postNewCard = (config, cardName, cardLink) => {
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

const deleteCardFromServer = (config, cardID) => {
  return request(`/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

const addLike = (config, cardID) => {
  return request(`/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
  });
};

const removeLike = (config, cardID) => {
  return request(`/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

const patchUserAvatar = (config, avatar) => {
  return request(`/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatar}`,
    }),
  });
};

export {
  getInitialCards,
  getInitialUser,
  patchUserData,
  patchUserAvatar,
  postNewCard,
  deleteCardFromServer,
  addLike,
  removeLike,
};
