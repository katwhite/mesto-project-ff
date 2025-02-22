
import '../pages/index.css';
import { initialCards } from './cards';
import { createCard } from './card';
import { handleDelete } from './card';
import { likeCard } from './card';
import { openModal } from './modal';
import { closeModal } from './modal';
// import { handleEscape } from './modal';

const cardsContainer = document.querySelector('.places__list');
// export const cardTmp = document.querySelector('#card-template').content;
const addBtn = document.querySelector('.profile__add-button');
const editBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
// export const imgPopup = document.querySelector('.popup_type_image');


initialCards.forEach(elem => {
    const card = createCard(elem, handleDelete, likeCard, openModal, closeModal);
    cardsContainer.append(card);
});

editBtn.addEventListener('click', () => {
    openModal(editPopup, closeModal);
    const nameInput = editPopup.querySelector('.popup__input_type_name');
    const jobInput = editPopup.querySelector('.popup__input_type_description');
    const name = document.querySelector('.profile__title');
    const job = document.querySelector('.profile__description');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    
    function handleFormSubmit(evt) {
        evt.preventDefault(); 
        name.textContent = nameInput.value;
        job.textContent = jobInput.value;
        editPopup.removeEventListener('submit', handleFormSubmit);
    }
    
    editPopup.addEventListener('submit', handleFormSubmit);
});
addBtn.addEventListener('click', () => {
    openModal(addPopup, closeModal);
    const placeInput = addPopup.querySelector('.popup__input_type_card-name');
    const linkInput = addPopup.querySelector('.popup__input_type_url');
    placeInput.value = '';
    linkInput.value = '';

    function handleFormSubmit(evt) {
        evt.preventDefault(); 
        const cardElement = {name: placeInput.value, link: linkInput.value};
        const card = createCard(cardElement, handleDelete, likeCard, openModal, closeModal);
        cardsContainer.prepend(card);
        addPopup.removeEventListener('submit', handleFormSubmit);
    }
    
    addPopup.addEventListener('submit', handleFormSubmit);
});


// 1 объявления и инициализация глобальных констант и переменных с 
// DOM-элементами страницы,
// 2 обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; обработчик, открывающий попап при клике по 
// изображению карточки);
// 3 вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.