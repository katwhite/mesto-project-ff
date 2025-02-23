
import '../pages/index.css';
import { initialCards } from './cards';
import { createCard } from './card';
import { handleDelete } from './card';
import { likeCard } from './card';
import { openModal } from './modal';
import { closeModal } from './modal';

const cardsContainer = document.querySelector('.places__list');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const imgPopup = document.querySelector('.popup_type_image');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const addCardForm = popupAddCard.querySelector('.popup__form');
const addButton = popupAddCard.querySelector('.popup__button');
const placeInput = popupAddCard.querySelector('.popup__input_type_card-name');
const linkInput = popupAddCard.querySelector('.popup__input_type_url');

initialCards.forEach(elem => {
    const card = createCard(elem, handleDelete, likeCard, openImagePopup);
    cardsContainer.append(card);
});

function openImagePopup(cardElement) {
    openModal(imgPopup);
    imgPopup.querySelector('.popup__image').src = 
      cardElement.querySelector('.card__image').src;
    imgPopup.querySelector('.popup__caption').textContent = 
      cardElement.querySelector('.card__title').textContent;
    imgPopup.querySelector('.popup__image').alt = 
      cardElement.querySelector('.card__title').textContent;

    const closeBtn = imgPopup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => closeModal(imgPopup));
}

buttonOpenEditProfilePopup.addEventListener('click', () => {
    openModal(popupEditProfile);
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

    const closeBtn = popupEditProfile.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => closeModal(popupEditProfile));
});

function submitEditProfileForm(evt) {
    evt.preventDefault(); 
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closeModal(popupEditProfile);
}

editProfileForm.addEventListener('submit', submitEditProfileForm);

buttonOpenAddCardPopup.addEventListener('click', () => {
    openModal(popupAddCard);
    if (placeInput.value.length === 0 || linkInput.value.length === 0) 
        addButton.setAttribute('disabled', true);
    const closeBtn = popupAddCard.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => closeModal(popupAddCard));
});

addCardForm.addEventListener('input', () => {
    if (placeInput.value.length > 0 && linkInput.value.length > 0) 
        addButton.removeAttribute('disabled');
    else
    addButton.setAttribute('disabled', true);
});

function submitAddCardForm(evt) {
    evt.preventDefault(); 
    const cardElement = {name: placeInput.value, link: linkInput.value};
    const card = createCard(cardElement, handleDelete, likeCard, openImagePopup);
    cardsContainer.prepend(card);
    addCardForm.reset();
    addButton.setAttribute('disabled', true);
    closeModal(popupAddCard);
}

addCardForm.addEventListener('submit', submitAddCardForm);