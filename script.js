document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    document.addEventListener('DOMContentLoaded', () => {
        loadTasks();
    })
    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }
    
    function addTask(taskText, save = true) {
        
        const taskList = document.getElementById('task-list'); 
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeTask(taskText);
        });
        taskItem.appendChild(removeButton);
        
        
        taskList.appendChild(taskItem);
        
        
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
    function removeTask(taskText) {
        
        const taskList = document.getElementById('task-list');
        const taskItems = Array.from(taskList.children);
        const taskItemToRemove = taskItems.find(item => item.textContent.includes(taskText));
        if (taskItemToRemove) {
            taskList.removeChild(taskItemToRemove);
        }
    
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    

    function addTask() {
        
        const taskText = taskInput.value.trim();

        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        
        const li = document.createElement('li');
        li.textContent = taskText;

        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

    
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        
        li.appendChild(removeButton);

        
        taskList.appendChild(li);

        
        taskInput.value = '';
    }

    
    addButton.addEventListener('click', addTask);

    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
