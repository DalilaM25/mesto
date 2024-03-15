import '../pages/index.css';
import '../scripts/card';
import '../scripts/modal';
import '../scripts/validation';

import { deleteCard, createCard, handleCardLike } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import {
  getInitialCards,
  getInitialUser,
  patchUserData,
  patchUserAvatar,
  postNewCard,
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileAvatar = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['edit-avatar'];
const avatarInput = formAvatar.elements['link'];
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formAddCard = document.forms['new-place'];
const cardNameInput = formAddCard.elements['place-name'];
const cardLinkInput = formAddCard.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const avatarSubmitButton = formAvatar.querySelector('.popup__button');
const profileSubmitButton = formEditProfile.querySelector('.popup__button');
const cardSubmitButton = formAddCard.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'a306f177-c6ab-4a77-8c2f-7f3972575f99',
    'Content-Type': 'application/json',
  },
};
let userID = '';

//слушатели кликов:
// редактировать профиль
buttonOpenEditProfileForm.addEventListener('click', (evt) => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});
// добавить место
buttonOpenAddCardForm.addEventListener('click', (evt) => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(popupNewCard);
});
// изменить аватар
profileAvatar.addEventListener('click', (evt) => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openModal(popupEditAvatar);
});

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

//отправка данных форм:
// -профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton);
  patchUserData(config, nameInput.value, jobInput.value)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .then(() => {
      closeModal(popupEditProfile);
    })
    .catch((err) => renderError(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

//-нового места
function submitNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, cardSubmitButton);
  postNewCard(config, cardNameInput.value, cardLinkInput.value)
    .then((card) => {
      cardList.prepend(
        createCard(
          cardTemplate,
          card,
          userID,
          deleteCard,
          handleCardLike,
          openPopupImage,
          config
        )
      );
    })
    .then(() => closeModal(popupNewCard))
    .catch((err) => renderError(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, cardSubmitButton);
    });
}

formAddCard.addEventListener('submit', (evt) => {
  submitNewCard(evt);
});

//-аватара
function submitNewAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, avatarSubmitButton);
  patchUserAvatar(config, avatarInput.value)
    .then((user) => {
      profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    })
    .then(() => closeModal(popupNewCard))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, avatarSubmitButton));
}

formAvatar.addEventListener('submit', (evt) => {
  submitNewAvatar(evt);
});

//открыть картинку для просмотра
function openPopupImage(cardImg) {
  popupImageContent.src = cardImg.src;
  popupImageContent.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openModal(popupImage);
}

//валидация форм
enableValidation(validationConfig);

//функция отрисовки карточек
function renderCards(cards) {
  cards.forEach(function (card) {
    const newCard = createCard(
      cardTemplate,
      card,
      userID,
      deleteCard,
      handleCardLike,
      openPopupImage,
      config
    );
    cardList.append(newCard);
  });
}

//загрузка данных с сервера
Promise.all([getInitialCards(config), getInitialUser(config)])
  .then(([cards, user]) => {
    userID = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });
