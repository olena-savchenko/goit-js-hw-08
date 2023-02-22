/*
HTML містить <iframe> з відео для Vimeo плеєра.
Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і,
після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

1. Ознайомся з документацією бібліотеки Vimeo плеєра.
2. Додай бібліотеку як залежність проекту через npm.
3. Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
4. Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
5. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
6. Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
7. Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.
*/

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframeRef = document.querySelector('iframe');
const vimeoPlayer = new Player(iframeRef);

// throttle викликає функцію onTimeUpdate через проміжок 1 сек
const throttledTimeUpdate = throttle(onTimeUpdate, 1000);

	// прослуховувач події timeupdate  { duration: 61.857 percent: 0.049 seconds: 3.034} - оновлення часу відтворення відео 
vimeoPlayer.on('timeupdate', throttledTimeUpdate);

	// обробник події 
function onTimeUpdate(event) { 
		//Зберігає час відтворення відео у локальне сховище 
	localStorage.setItem(STORAGE_KEY, event.seconds);	
}


if (localStorage.getItem(STORAGE_KEY)) {
	// метод setCurrentTime() - відновлення відтворення зі збереженої позиції (в сек)
	vimeoPlayer.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }

