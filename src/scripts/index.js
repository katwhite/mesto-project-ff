
import '../pages/index.css';
import { initialCards } from './cards';
import { createCard } from './card';
import { handleDelete } from './card';
import { likeCard } from './card';
import { openModal } from './modal';
import { closeModal } from './modal';
import { enableValidation } from './validation';
import { formValidationConfig } from './validation';
import { clearValidation } from './validation';

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
const imgPopupImage = imgPopup.querySelector('.popup__image');
const imgPopupCaption = imgPopup.querySelector('.popup__caption');

initialCards.forEach(elem => {
    const card = createCard(elem, handleDelete, likeCard, openImagePopup);
    cardsContainer.append(card);
});

function openImagePopup(cardElement) {
    openModal(imgPopup);
    imgPopupImage.src = cardElement.querySelector('.card__image').src;
    imgPopupCaption.textContent = cardElement.querySelector('.card__title').textContent;
    imgPopupImage.alt = cardElement.querySelector('.card__title').textContent;
}

const closeImgBtn = imgPopup.querySelector('.popup__close');
closeImgBtn.addEventListener('click', () => closeModal(imgPopup));
const closeEditBtn = popupEditProfile.querySelector('.popup__close');
closeEditBtn.addEventListener('click', () => closeModal(popupEditProfile));

buttonOpenEditProfilePopup.addEventListener('click', () => {
    openModal(popupEditProfile);
    clearValidation(popupEditProfile.querySelector(`${formValidationConfig.formSelector}`), formValidationConfig); 
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
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
    clearValidation(popupAddCard.querySelector(`${formValidationConfig.formSelector}`), formValidationConfig);
});

function submitAddCardForm(evt) {
    evt.preventDefault(); 
    const cardElement = {name: placeInput.value, link: linkInput.value};
    const card = createCard(cardElement, handleDelete, likeCard, openImagePopup);
    cardsContainer.prepend(card);
    addCardForm.reset();
    closeModal(popupAddCard);
}

addCardForm.addEventListener('submit', submitAddCardForm);

const closeAddBtn = popupAddCard.querySelector('.popup__close');
closeAddBtn.addEventListener('click', () => closeModal(popupAddCard));

enableValidation(formValidationConfig); 

// clearValidation(profileForm, formValidationConfig); 