/*
 1. Додай бібліотеку SimpleLightbox як залежність проекту, використовуючи npm (посилання на CDN з твоєї минулої роботи більше не потрібне).

 	// Описаний в документації
import SimpleLightbox from "simplelightbox";
	// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
 */


import { galleryItems } from './gallery-items.js';

// підключаємо бібліотеку SimpleLightbox
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);

	
		//посилання на контейнер <div class="gallery"></div>
	const galleryBox = document.querySelector('.gallery');
	
		// додає розмітку галереї в контейнер
	galleryBox.insertAdjacentHTML('beforeend', createImgGalleryMarkup(galleryItems));
	
		// створює розмітку галереї за шаблоном з масиву даних galleryItems
	function createImgGalleryMarkup(images) { 
		return images.map(({ original, preview, description }) => {
			return `<a class="gallery__item" href="${original}">
			<img class="gallery__image" src="${preview}" alt="${description}" />
		  </a>`;
		}).join('');
	
	}
		// initializing of SimpleLightbox instance
	const lightbox = new SimpleLightbox('.gallery a', {
			// get the caption from given attribute
		captionsData: 'alt',
			// adds a delay before the caption shows
		captionDelay: 250,
		});
