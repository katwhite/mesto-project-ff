import '../pages/index.css';
import { createCard } from './card';
import { handleDelete } from './card';
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
// const addButton = popupAddCard.querySelector('.popup__button');
const placeInput = popupAddCard.querySelector('.popup__input_type_card-name');
const linkInput = popupAddCard.querySelector('.popup__input_type_url');
const imgPopupImage = imgPopup.querySelector('.popup__image');
const imgPopupCaption = imgPopup.querySelector('.popup__caption');

Promise.all([getUserInfo, getInitialCards])
.then(([userData, cardsData]) => {
    name.textContent = userData.name;
    job.textContent = userData.about;
    profilePic.style = `background-image: url('${userData.avatar}')`;
    cardsData.forEach(elem => {
        const card = createCard(userData._id, elem, handleDelete, likeCard, openImagePopup);
        cardsContainer.append(card);
    });
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
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, editProfileForm));
    
    closeModal(popupEditProfile);
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
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, editProfilePicForm));
    editProfilePicForm.reset();
    closeModal(popupEditProfilePic);
}

editProfilePicForm.addEventListener('submit', submitEditProfilePicForm);

buttonOpenAddCardPopup.addEventListener('click', () => {
    openModal(popupAddCard);
    clearValidation(popupAddCard.querySelector(`${formValidationConfig.formSelector}`), formValidationConfig);
});

function submitAddCardForm(evt) {
    evt.preventDefault(); 
    renderLoading(true, addCardForm);
    const UserId = getUserInfo.then((res) => {return res._id});
    // console.log(UserId); -- Promise pending, не печатает??? но всё работает
    const cardElement = {name: placeInput.value, link: linkInput.value, likes: []};
    addNewCard(cardElement)
    .then((card) => cardsContainer.prepend(
        createCard(UserId, card, handleDelete, likeCard, openImagePopup)
        ))
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, addCardForm));
    addCardForm.reset();
    closeModal(popupAddCard);
}

addCardForm.addEventListener('submit', submitAddCardForm);

const closeAddBtn = popupAddCard.querySelector('.popup__close');
closeAddBtn.addEventListener('click', () => closeModal(popupAddCard));

enableValidation(formValidationConfig); 

function renderLoading(isLoading, popup) {
    const button = popup.querySelector('.popup__button');
    if (isLoading)
      button.textContent = "Сохранение...";
    else 
      button.textContent = "Сохранить";
}