
// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event 
  form.addEventListener('submit', addTask); 
  //remove task event
  taskList.addEventListener('click', removeTask);
  // clear all tasks event
  clearBtn.addEventListener('click', clearTasks);

  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
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

  taskInput.value='';

}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  // one option
  // taskList.innerHtml = '';

  // faster method
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
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