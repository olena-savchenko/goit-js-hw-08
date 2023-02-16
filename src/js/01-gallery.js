import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

	//посилання на контейнер <div class="gallery"></div>
const galleryBox = document.querySelector('.gallery');

	// додає розмітку галереї в контейнер
galleryBox.insertAdjacentHTML('beforeend', createImgGalleryMarkup(galleryItems));

	//Реалізація делегування на div.gallery
galleryBox.addEventListener('click', onImgGalleryItemClick);

	// створює розмітку галереї за шаблоном з масиву даних galleryItems
function createImgGalleryMarkup(images) { 
	return images.map(({ original, preview, description }) => {
		return `<div class="gallery__item">
		<a class="gallery__link" href="${original}">
		  <img
			class="gallery__image"
			src="${preview}	"
			data-source="${original}"
			alt="${description}"
		  />
		</a>
	  </div>`;
	}).join('');

}

	// обробник події click на картинку галереї
function onImgGalleryItemClick(event) {
		// якщо клік не по картинці - вихід з функції
	if (event.target.nodeName !== 'IMG') {
		return;
	}

		//зображення обгорнуте посиланням, по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку
		// preventDefault забороняє цю поведінку за замовчуванням.
	event.preventDefault();

		//отримання url великого зображення
	const urlOriginal = event.target.dataset.source;

		//створеня екземпляра бібліотеки basicLightbox
		// по кліку на картинку відкривається картинка оригільного розміру в окремому модальному вікні
	const instance = basicLightbox.create(`
    <img src="${urlOriginal}" width="800" height="600">
	`,
	  		// об'єкт налаштувань basicLightbox
		{	
				// функція, яка виконується перед відображенням Ligtnbox
			onShow: (instance) => { 
					// 
				document.addEventListener('keydown', onEscapeKeydown);
			},

				// функція, яка виконується перед закриттям Ligtnbox
			onClose: (instance) => {
				// знімаємо прослуховування клавіатури, перед закриттям  модального вікна
				document.removeEventListener('keydown', onEscapeKeydown);
			}

		}
	)
	
	instance.show();

	
	function onEscapeKeydown(event) {
		console.log(event.code);
		if (event.code === 'Escape') {

				// close() - метод бібліотеки basicLightbox, закриває модальне вікно	
			instance.close();
		}	
	}
}


