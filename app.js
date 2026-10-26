const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  //innerText encodes special characters, HTML does not.
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  appendTaskToList(listItem, todoList, markTaskCompleted);
  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const appendTaskToList = function (listItem, list, checkBoxEventHandler) {
  list.appendChild(listItem);
  bindTaskEvents(listItem, checkBoxEventHandler);
};

const markTaskCompleted = function () {
  appendTaskToList(this.parentNode, completedList, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  appendTaskToList(this.parentNode, todoList, markTaskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem, checkBoxEventHandler) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const bindListEvents = function (list, checkBoxEventHandler) {
  for (const listItem of list.children) {
    bindTaskEvents(listItem, checkBoxEventHandler);
  }
};

bindListEvents(todoList, markTaskCompleted);
bindListEvents(completedList, markTaskIncomplete);
