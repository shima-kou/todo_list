const todoTable = document.getElementById('todoTable');
const addButton = document.getElementById('addButton');
const commentInput = document.getElementById('comment_input');
const todosArray = [];
let deleteButtonList, statusButtonList;

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
  refleshTable(todosArray);
};

const changeTodoStts = (number) => {
  const status = todosArray[number].status;
  if (status === '作業中') {
    todosArray[number].status = '完了';
  } else {
    todosArray[number].status = '作業中';
  }
  refleshTable(todosArray);
};

const refleshTable = (array) => {
  deleteTableRow();
  let counter = 0;
  array.forEach((value) => {
    const newTableRow = todoTable.insertRow(-1);
    const statusButton = createButton('status_button', value.status, counter);
    const deleteButton = createButton('delete_button', '削除', counter);

    const rowArray = [counter, value.task, statusButton, deleteButton];

    for (let i = 0; i < rowArray.length; i++) {
      const newCell = newTableRow.insertCell(-1);
      if (typeof rowArray[i] !== 'object') {
        const newText = document.createTextNode(rowArray[i]);
        newCell.appendChild(newText);
      } else {
        newCell.appendChild(rowArray[i]);
      }
    }
    counter++;
  });

  deleteButtonList = document.querySelectorAll('.delete_button');
  deleteButtonList.forEach((button) => {
    button.addEventListener('click', (e) => {
      deleteTodo(e.target.getAttribute('data-index'));
    });
  });

  statusButtonList = document.querySelectorAll('.status_button');
  statusButtonList.forEach((button) => {
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
  refleshTable(todosArray);
};

addButton.addEventListener('click', () => {
  addTodoList(commentInput.value);
});
