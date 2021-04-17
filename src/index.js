const todoTable = document.getElementById('todoTable');
const addButton = document.getElementById('addButton');
const commentInput = document.getElementById('comment_input');
let idCounter = 0;

const addTableRow = (inputText) => {
  const newTableRow = todoTable.insertRow();
  const insertArray = [
    idCounter,
    inputText,
    {
      class: 'statusButton',
      text: '作業中',
    },
    {
      class: 'deleteButton',
      text: '削除',
    },
  ];

  for (let i = 0; i < insertArray.length; i++) {
    const newCell = newTableRow.insertCell();
    const newText = insertArray[i];
    if (typeof newText === 'object') {
      const newElement = document.createElement('button');
      newElement.setAttribute('class', newText.class);
      newElement.innerText = newText.text;
      newCell.appendChild(newElement);
    } else {
      const newText = document.createTextNode(insertArray[i]);
      newCell.appendChild(newText);
    }
  }

  commentInput.value = '';
  idCounter++;
};

addButton.addEventListener('click', () => {
  addTableRow(commentInput.value);
});
