import {renderPhoneBook, renderContacts} from './modules/render.js';
import control from './modules/control.js';
import {getStorage} from './modules/serviceStorage.js';

const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = control;

{
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