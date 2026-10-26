const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  deleteButton.append(deleteIcon);

  return deleteButton;
};

const createTaskElement = function (taskText) {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.className = 'task';
  label.innerText = taskText;

  const editInput = document.createElement('input');
  editInput.className = 'task';
  editInput.type = 'text';

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  //innerText encodes special characters, HTML does not.
  editButton.innerText = 'Edit';

  const listItem = document.createElement('li');

  listItem.append(checkBox, label, editInput, editButton, createDeleteButton());
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
