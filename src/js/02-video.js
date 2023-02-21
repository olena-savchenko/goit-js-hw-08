import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframeRef = document.querySelector('iframe');
const vimeoPlayer = new Player(iframeRef);

// throttle викликає функцію onTimeUpdate через проміжок 1 сек
const throttledTimeUpdate = throttle(onTimeUpdate, 1000);

	// прослуховувач події timeupdate  { duration: 61.857 percent: 0.049 seconds: 3.034} - оновлення часу відтворення відео 
vimeoPlayer.on('timeupdate', throttledTimeUpdate);

	// обробник події 
function onTimeUpdate(event) { 
		//Зберігає час відтворення відео у локальне сховище 
	localStorage.setItem('videoplayer-current-time', event.seconds);	
}

	//  метод setCurrentTime() - відновлення відтворення зі збереженої позиції (в сек)
vimeoPlayer.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

