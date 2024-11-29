'use strict'

// Удаление рекламы
const banner = document.querySelector('.ads');

banner.remove();

//Перенос карточки на четвертую позицию

const itemFour = document.querySelector('.item_four');
const itemFive = document.querySelector('.item_five');

itemFive.before(itemFour);


//Перенос текста (4 главы) из второй карточки в четвертую

const propsItemFourInItemTwo = document.querySelector('.item_two .props__item_four');
const propsItemFour = document.querySelectorAll('.item_four .props__item_four');

propsItemFour[2].after(propsItemFourInItemTwo);

//Перенос текста (2 приложения) из шестой карточки во вторую

const propsItemTwoInItemSix =  document.querySelectorAll('.item_six .props__item_two');
const propsItemTwo = document.querySelectorAll('.item_two .props__item_two');

propsItemTwo[7].after(...propsItemTwoInItemSix); 

// Добавление текста с третьей карточки в пятую (и наоборот)

const propsItemThree =  document.querySelectorAll('.props__item_three');
const propsItemFive =  document.querySelectorAll('.props__item_five');
const itemThreeList = document.querySelector('.item_three .props__list');
const itemFiveList = document.querySelector('.item_five .props__list');

itemThreeList.append(...propsItemThree);
itemFiveList.append(...propsItemFive);

// Замена названий карточек: 2, 5, 6

const itemTitleFive = document.querySelector('.item_five .item__title'); // № 2 Область видимости и замыкание
const itemTitleSix = document.querySelector('.item_six .item__title'); // № 5 Асинхронная обработка и оптимизация
const itemTitleTwo = document.querySelector('.item_two .item__title'); // № 6 ES6 и не только

const cloneIitemTitleFive = itemTitleFive.cloneNode(true);
const cloneItemTitleSix = itemTitleSix.cloneNode(true);
const cloneItemTitleTwo = itemTitleTwo.cloneNode(true);

itemTitleSix.replaceWith(cloneItemTitleTwo);
itemTitleFive.replaceWith(cloneItemTitleSix);
itemTitleTwo.replaceWith(cloneIitemTitleFive);

// Переименование названия третьей карточки 

const itemTitleThree = document.querySelector('.item_three .item__title');

itemTitleThree.textContent = 'This и прототипы объектов'
