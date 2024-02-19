let openedPopup;

const closeKey = (evt) => {
  const keyCode = 27;
  if (evt.keyCode === keyCode) {
    closeModal(openedPopup);
  }
};

const closeX = (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(openedPopup);
  }
};

const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(openedPopup);
  }
};

const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.toggle('popup_is-opened');
    openedPopup = document.querySelector('.popup_is-opened');
    document.addEventListener('keydown', closeKey);
    document.addEventListener('click', closeX);
    popup.addEventListener('click', closeOverlay);
  }, 1);
};

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeKey);
  document.removeEventListener('click', closeX);
  popup.addEventListener('click', closeOverlay);
};

export { openModal, closeModal };
