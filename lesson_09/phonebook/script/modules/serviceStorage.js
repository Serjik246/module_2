'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

export const getStorage = (key) => {
  const value = localStorage.getItem(key);
  if (value === null) {
    return [];
  }
  return JSON.parse(value);
};

export const setStorage = (key, obj) => {
  const arr = getStorage(key);
  arr.push(obj);
  localStorage.setItem(key, JSON.stringify(arr));
};

if (!localStorage.getItem('data')) {
  data.forEach((item) => setStorage('data', item));
};

export const removeStorage = (phoneNumber, key) => {
  const data = getStorage(key);
  const newData = data.filter(contact => contact.phone !== phoneNumber);
  localStorage.setItem(key, JSON.stringify(newData));
};