'use strict';

{
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

  const getStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value === null) {
      return [];
    }
    return JSON.parse(value);
  };

  const setStorage = (key, obj) => {
    const arr = getStorage(key);
    arr.push(obj);
    localStorage.setItem(key, JSON.stringify(arr));
  };

  if (!localStorage.getItem('data')) {
    data.forEach((item) => setStorage('data', item));
  };

  const removeStorage = (phoneNumber, key) => {
    const data = getStorage(key);
    const newData = data.filter(contact => contact.phone !== phoneNumber);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const addContactData = contact => {
    setStorage('data', contact);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th class="name">Имя</th>   
                <th class="surname">Фамилия</th>
                <th>Телефон</th>
                <th class="change"></th>       
            </tr>
        `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя:</label>
                <input class="form-input" name="name"
                  id="name" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия:</label>
                <input class="form-input" name="surname"
                  id="surname" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон:</label>
                <input class="form-input" name="phone"
                  id="phone" type="number" required>
            </div>        
        `);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);
    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };


  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const container = createContainer();
    footer.append(container);

    const paragraph = document.createElement('p');
    paragraph.textContent = `Все права защищены ©${title}`;
    footer.append(paragraph);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();

    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };


  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    tdPhone.classList.add('phoneNumber');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdChange = document.createElement('td');
    tdChange.classList.add('change');
    tdChange.insertAdjacentHTML('beforeend', `
            <button type="button" class="btn btn-outline-info btn-sm">
            Редактировать
            </button>
            `);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdChange);
    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay ||
        target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        const phoneNumber = target.closest('.contact')
          .querySelector('.phoneNumber').textContent;
        target.closest('.contact').remove();
        removeStorage(phoneNumber, 'data');
      };
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);

      addContactPage(newContact, list);
      addContactData(newContact);
      form.reset();
      closeModal();
    });
  };
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, getStorage('data'));

    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    const columnSurname = document.querySelector('thead .surname');
    const columnName = document.querySelector('thead .name');

    const sortTable = (colNum) => {
      const table = document.querySelector('.table-striped tbody');
      const rowsArray = Array.from(table.rows);
      const compare = (a, b) =>
        (a.cells[colNum].innerHTML > b.cells[colNum].innerHTML ? 1 : -1);
      rowsArray.sort(compare);
      table.append(...rowsArray);
    };

    columnSurname.addEventListener('click', e => {
      sortTable(e.target.cellIndex);
    });
    columnName.addEventListener('click', e => {
      sortTable(e.target.cellIndex);
    });
  };

  window.phoneBookInit = init;
}