// let openedPopup;

const closeByEsc = (evt) => {
  const keyCode = 27;
  if (evt.keyCode === keyCode) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

const closeByCrossClick = (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

const closeByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

const openModal = (popup) => {
  popup.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByCrossClick);
  popup.addEventListener('click', closeByOverlayClick);
};

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByCrossClick);
  popup.addEventListener('click', closeByOverlayClick);
};

export { openModal, closeModal };
