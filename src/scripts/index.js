import '../pages/index.css';
import { createCard } from './card';
import { likeCard } from './card';
import { openModal } from './modal';
import { closeModal } from './modal';
import { enableValidation } from './validation';
import { formValidationConfig } from './validation';
import { clearValidation } from './validation';
import { getInitialCards } from './api';
import { getUserInfo } from './api';
import { addNewCard } from './api';
import { editUserinfo, editUserPic } from './api';
import { deleteCardApi } from './api';

const cardsContainer = document.querySelector('.places__list');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenEditProfilePicPopup = document.querySelector('.profile__image__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfilePic = document.querySelector('.popup_type_edit-pfp');
const popupAddCard = document.querySelector('.popup_type_new-card');
const imgPopup = document.querySelector('.popup_type_image');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const profilePic = document.querySelector('.profile__image');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const editProfilePicForm = popupEditProfilePic.querySelector('.popup__form');
const pfpInput = popupEditProfilePic.querySelector('.popup__input_type_pfp-link');
const addCardForm = popupAddCard.querySelector('.popup__form');
const placeInput = popupAddCard.querySelector('.popup__input_type_card-name');
const linkInput = popupAddCard.querySelector('.popup__input_type_url');
const imgPopupImage = imgPopup.querySelector('.popup__image');
const imgPopupCaption = imgPopup.querySelector('.popup__caption');
const popupDeleteCard = document.querySelector('.popup_type_delete');

let userId;

Promise.all([getUserInfo, getInitialCards])
.then(([userData, cardsData]) => {
    name.textContent = userData.name;
    job.textContent = userData.about;
    profilePic.style = `background-image: url('${userData.avatar}')`;
    cardsData.forEach(elem => {
        const card = createCard(userData._id, elem, handleDeleteCard, likeCard, openImagePopup);
        cardsContainer.append(card);
    });
    userId = userData._id;
})
.catch((err) => {
    console.log(err);
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
    renderLoading(false, editProfileForm);
    const newData = {name: nameInput.value, about: jobInput.value};
    editUserinfo(newData).then((res) => {
        name.textContent = res.name;
        job.textContent = res.about;
        closeModal(popupEditProfile);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, editProfileForm));
}

editProfileForm.addEventListener('submit', submitEditProfileForm);

buttonOpenEditProfilePicPopup.addEventListener('click', () => {
    openModal(popupEditProfilePic);
    clearValidation(popupEditProfilePic.querySelector(`${formValidationConfig.formSelector}`), formValidationConfig); 
});

const closeEditProfilePicBtn = popupEditProfilePic.querySelector('.popup__close');
closeEditProfilePicBtn.addEventListener('click', () => closeModal(popupEditProfilePic));

function submitEditProfilePicForm(evt) {
    evt.preventDefault(); 
    renderLoading(true, editProfilePicForm);
    const newData = {avatar: pfpInput.value};
    editUserPic(newData).then((res) => {
        profilePic.style= `background-image: url('${res.avatar}'`;
        closeModal(popupEditProfilePic);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, editProfilePicForm));
    editProfilePicForm.reset();
}

editProfilePicForm.addEventListener('submit', submitEditProfilePicForm);

buttonOpenAddCardPopup.addEventListener('click', () => {
    openModal(popupAddCard);
    clearValidation(popupAddCard.querySelector(`${formValidationConfig.formSelector}`), formValidationConfig);
});

function submitAddCardForm(evt) {
    evt.preventDefault(); 
    renderLoading(true, addCardForm);
    const cardElement = {name: placeInput.value, link: linkInput.value, likes: []};
    addNewCard(cardElement)
    .then((card) => {
        cardsContainer.prepend(
            createCard(userId, card, handleDeleteCard, likeCard, openImagePopup)
        );
        closeModal(popupAddCard);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, addCardForm));
    addCardForm.reset();
}

addCardForm.addEventListener('submit', submitAddCardForm);

const closeAddBtn = popupAddCard.querySelector('.popup__close');
closeAddBtn.addEventListener('click', () => closeModal(popupAddCard));

let cardForDelete = {}

const handleDeleteCard = (cardElement, cardId) => {
    cardForDelete = {
        id: cardId,
        cardElement
    }
    openModal(popupDeleteCard);
    const closeDeleteBtn = popupDeleteCard.querySelector('.popup__close');
    closeDeleteBtn.addEventListener('click', () => closeModal(popupDeleteCard));
    popupDeleteCard.addEventListener('submit', submitDeleteCard);
};

const submitDeleteCard = (evt) => {
  evt.preventDefault();
 if (!cardForDelete.cardElement) return;

  deleteCardApi(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closeModal(popupDeleteCard);
      cardForDelete = {};
    })
    .catch((err) => {console.log(err);})
};

enableValidation(formValidationConfig); 

function renderLoading(isLoading, popup) {
    const button = popup.querySelector('.popup__button');
    if (isLoading)
      button.textContent = "Сохранение...";
    else 
      button.textContent = "Сохранить";
}