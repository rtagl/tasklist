
// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event 
  form.addEventListener('submit', addTask); 
  //remove task event
  taskList.addEventListener('click', removeTask);
  // clear all tasks event
  clearBtn.addEventListener('click', clearTasks);

  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    //create li element
    console.log('hi')
    const li = document.createElement('li');
    li.className = 'collection-item'
    //create text node and append to li
    li.appendChild(document.createTextNode(task))
    // create new link element
    const link = document.createElement('a');
    // add Class
    link.className = 'delete-item secondary-content';
    // add Icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    //append the link to li
    li.appendChild(link);
    // append li to ul 
    taskList.appendChild(li)
  })
}

// Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a task')
    return
  }

  //create li element
  const li = document.createElement('li');
  li.className = 'collection-item'
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // create new link element
  const link = document.createElement('a');
  // add Class
  link.className = 'delete-item secondary-content';
  // add Icon html
  link.innerHTML = '<i class="fa fa-times"></i>';
  //append the link to li
  li.appendChild(link);
   // append li to ul 
  taskList.appendChild(li)

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value='';
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}


function clearTasks() {
  // one option
  // taskList.innerHtml = '';
  if(taskList.firstChild) {
    if(confirm('Are you sure?')) {
      // while loop is faster than rewriting innter html
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
    }
  } else {
    alert('You must add Tasks before you can clear them! ')
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}
