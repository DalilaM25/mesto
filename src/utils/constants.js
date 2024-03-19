const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector(
  '.profile__edit-button'
);
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
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export {
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
  validationConfig
};
