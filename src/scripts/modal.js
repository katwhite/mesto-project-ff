export function openModal(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    
    popup.addEventListener('click', closeByOvelrayClick);
    document.addEventListener('keydown', handleEscape);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    popup.removeEventListener('click', closeByOvelrayClick);
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function closeByOvelrayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}