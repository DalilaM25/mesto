import '../pages/index.css';
import '../scripts/card';
import '../scripts/modal';
import '../scripts/validation';
import '../utils/utils';
import '../utils/constants';
import { deleteCard, createCard, handleCardLike } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import {
  getInitialCards,
  getInitialUser,
  patchUserData,
  patchUserAvatar,
  postNewCard,
} from './api';
import {
  cardTemplate,
  cardList,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  popupEditProfile,
  popupNewCard,
  popupImage,
  profileAvatar,
  popupEditAvatar,
  formAvatar,
  avatarInput,
  formEditProfile,
  nameInput,
  jobInput,
  formAddCard,
  cardNameInput,
  cardLinkInput,
  profileTitle,
  profileDescription,
  popupImageContent,
  popupImageCaption,
  validationConfig,
  config,
} from '../utils/constants';
import { renderLoading, handleSubmit } from '../utils/utils';

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

//отправка данных форм:
// -профиля
function submitEditProfileForm(evt) {
  function makeRequest() {
    return patchUserData(config, nameInput.value, jobInput.value).then(
      (user) => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
      }
    );
  }
  handleSubmit(makeRequest, evt);
}
formEditProfile.addEventListener('submit', submitEditProfileForm);
//-нового места
function submitNewCard(evt) {
  function makeRequest() {
    return postNewCard(config, cardNameInput.value, cardLinkInput.value).then(
      (card) => {
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
      }
    );
  }
  handleSubmit(makeRequest, evt);
}
formAddCard.addEventListener('submit', submitNewCard);
//-аватара
function submitNewAvatar(evt) {
  function makeRequest() {
    return patchUserAvatar(config, avatarInput.value).then((user) => {
      profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    });
  }
  handleSubmit(makeRequest, evt);
}

formAvatar.addEventListener('submit', submitNewAvatar);

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
  .catch(console.error);
