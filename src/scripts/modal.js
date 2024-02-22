const closeByEsc = (evt) => {
  const keyCode = 27;
  if (evt.keyCode === keyCode) {
    closeModal();
  }
};

const closeByCrossClick = (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closeModal();
  }
};

const closeByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
};

const openModal = (popup) => {
  popup.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByCrossClick);
  popup.addEventListener('click', closeByOverlayClick);
};

const closeModal = (openedPopup) => {
  openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByCrossClick);
  openedPopup.addEventListener('click', closeByOverlayClick);
};

export { openModal, closeModal };
