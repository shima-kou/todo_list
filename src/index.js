const todoTable = document.getElementById('todoTable');
const addButton = document.getElementById('addButton');
const commentInput = document.getElementById('comment_input');
const stateRadio = document.getElementsByName('status');
const todosArray = [];
let deleteButtonList, stateButtonList, stateParam;

const deleteTableRow = () => {
  const countRow = todoTable.rows.length;
  for (let i = 0; i < countRow; i++) {
    if (i !== 0) {
      todoTable.deleteRow(-1);
    }
  }
};

const createButton = (elementClass, text, index) => {
  const createButton = document.createElement('button');
  createButton.setAttribute('class', elementClass);
  createButton.innerText = text;
  if (index !== null || index !== undefined) {
    createButton.setAttribute('data-index', index);
  }
  return createButton;
};

const deleteTodo = (number) => {
  todosArray.splice(number, 1);
  refleshTable(todosArray, stateParam);
};

const changeTodoStts = (number) => {
  const status = todosArray[number].status;
  if (status === '作業中') {
    todosArray[number].status = '完了';
  } else {
    todosArray[number].status = '作業中';
  }
  refleshTable(todosArray, stateParam);
};

const refleshTable = (array, status) => {
  deleteTableRow();

  array.forEach((value, index) => {
    if (status === '作業中' && value.status !== '作業中') {
      return;
    }
    if (status === '完了' && value.status !== '完了') {
      return;
    }
    const newTableRow = todoTable.insertRow(-1);
    const statusButton = createButton('status_button', value.status, index);
    const deleteButton = createButton('delete_button', '削除', index);

    const rowArray = [index, value.task, statusButton, deleteButton];

    for (let i = 0; i < rowArray.length; i++) {
      const newCell = newTableRow.insertCell(-1);
      if (typeof rowArray[i] !== 'object') {
        const newText = document.createTextNode(rowArray[i]);
        newCell.appendChild(newText);
      } else {
        newCell.appendChild(rowArray[i]);
      }
    }
  });

  deleteButtonList = document.querySelectorAll('.delete_button');
  deleteButtonList.forEach((button) => {
    button.addEventListener('click', (e) => {
      deleteTodo(e.target.getAttribute('data-index'));
    });
  });

  stateButtonList = document.querySelectorAll('.status_button');
  stateButtonList.forEach((button) => {
    button.addEventListener('click', (e) => {
      changeTodoStts(e.target.getAttribute('data-index'));
    });
  });
};

const addTodoList = (inputText) => {
  todosArray.push({
    task: inputText,
    status: '作業中',
  });
  commentInput.value = '';
  refleshTable(todosArray, stateParam);
};

stateRadio.forEach(function (e) {
  e.addEventListener('click', function () {
    stateParam = document.querySelector('input:checked[name=status]').value;
    refleshTable(todosArray, stateParam);
  });
});

addButton.addEventListener('click', () => {
  addTodoList(commentInput.value);
});
