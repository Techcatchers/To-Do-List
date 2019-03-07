const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTask);
    document.addEventListener('DOMContentLoaded', getTasks);

}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
        return;
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);

    // Store in LS
    StoreTaskLocally(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function deleteTask(e) {
    // console.log(e.target);

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            // console.log(e.target.parentElement.parentElement);
            deleteTaskLocally(e.target.parentElement.parentElement);
        }

        // console.log('dsad');
    }
}

function clearTask() {
    if (confirm('Are you sure? All Saved Tasks will be Removed.')) {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    }
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);

    document.querySelectorAll('.collection-item').forEach
    (function (task) {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(text) === -1) {
            task.style.display = 'none'
        } else {
            task.style.display = 'block'
        }
    })
}

function StoreTaskLocally(inputText) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(inputText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskLocally(task) {
    // console.log(task.textContent)
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    deleteTask = task.textContent;
    tasks.forEach(function(task, index) {
        if (task === deleteTask) {
            tasks.splice(index, 1);
        }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    
}