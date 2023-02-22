/**
 * HTML містить розмітку форми.
   1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, 
   у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".

   2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
    В іншому випадку поля повинні бути порожніми.

   3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
    Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
 */


import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input');
const messageRef = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));
reloadForm();

    // обробник події submit
function onFormSubmit(event) {
    
    //Під час відправлення форми сторінка не перезавантажується
  event.preventDefault();

    // перевірка на пусті поля форми
  emailRef.value === '' || messageRef.value === ''
    ? alert('Всi поля повинні бути заповнені!')
    : console.log({ email: emailRef.value, message: messageRef.value });

		//очищуємо поля форми 
	event.currentTarget.reset();

		// видаляємо дані по ключу зі сховища
  localStorage.removeItem(STORAGE_KEY);
  
}

    // обробник події input 
function onFormInput() { 

    // об'єкт з полями email і message, у яких зберігається поточні значення полів форми
  const formData = { email: emailRef.value, message: messageRef.value };

    // записує у локальне сховище об'єкт з полями email і message
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  
}

    // функція перезавантаження форми
function reloadForm() { 
  
  if (localStorage.getItem(STORAGE_KEY)) {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    emailRef.value = value.email;
    messageRef.value = value.message;
  }
  
}
