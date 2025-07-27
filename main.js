// GET DOM ELEMENTS
const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn"); 
const todoList = document.getElementById("todo-list");

let tasks = []; 

function addTodo(textValue) {
 const task = {
   text: textValue,
   important: false,
   completed: false,
   doitnow: false
 };
 tasks.push(task);
 renderTasks();
}

function renderTasks(filter = 'all') {
 todoList.innerHTML = ""; 

 tasks.forEach((task, index) => {
 
  if (filter === 'all' || 
      (filter === 'important' && task.important) || 
      (filter === 'completed' && task.completed) || 
      (filter === 'doitnow' && task.doitnow)) {

    const todo = document.createElement("div");
    todo.className = "todo";

    const importantBoxDiv = document.createElement("div");
    importantBoxDiv.classList.add("check-box")
    const importantCheckbox = document.createElement("input");
    const importantText = document.createElement("p");
    importantCheckbox.type = "checkbox";
    importantCheckbox.checked = task.important;
    importantCheckbox.onchange = () => {
      task.important = importantCheckbox.checked;
      renderTasks(filter);
    };

    // APPEND TO CHECKBOX TOOLS TO CHECKBOX DIV
    importantText.innerText = "Important";
    importantBoxDiv.appendChild(importantText);
    importantBoxDiv.appendChild(importantCheckbox);
    
   

    
    const completedBoxDiv = document.createElement("div");
    completedBoxDiv.classList.add("check-box")
    const completedCheckbox = document.createElement("input");
    const completedText = document.createElement("p");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = task.completed;
    completedCheckbox.onchange = () => {
      task.completed = completedCheckbox.checked;
      renderTasks(filter);
    };

    completedText.innerText = "Completed";
    completedBoxDiv.appendChild(completedText);
    completedBoxDiv.appendChild(completedCheckbox);

    const doitnowBoxDiv = document.createElement("div");
    doitnowBoxDiv.classList.add("check-box")
    const doitnowCheckbox = document.createElement("input");
    const doitnowText = document.createElement("p");
    doitnowCheckbox.type = "checkbox";
    doitnowCheckbox.checked = task.doitnow;
    doitnowCheckbox.onchange = () => {
      task.doitnow = doitnowCheckbox.checked;
      renderTasks(filter);
    };

    doitnowText.innerText = "Do It Now";
    doitnowBoxDiv.appendChild(doitnowText);
    doitnowBoxDiv.appendChild(doitnowCheckbox);

    const text = document.createElement("p");
    text.className = "todo-text";
    text.innerText = task.text;

    const buttonsDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    editBtn.className = "fa fa-edit";
    delBtn.className = "fa fa-trash";

    buttonsDiv.className = "buttons";
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(delBtn);
    todo.appendChild(importantBoxDiv);
    todo.appendChild(completedBoxDiv);
    todo.appendChild(doitnowBoxDiv);
    todo.appendChild(text);
    todo.appendChild(buttonsDiv);
    todoList.appendChild(todo);

    editBtn.onclick = () => {
      const isEditing = editBtn.className === "fa fa-edit";
      editBtn.className = isEditing ? "fa fa-save" : "fa fa-edit";
      text.contentEditable = isEditing;
      if (isEditing) {
        text.focus();
      }
    };

    delBtn.onclick = () => {
      tasks.splice(index, 1); 
      renderTasks(filter);
    };
  }
 });
}

function clearInput() {
 input.value = ""; 
}


addBtn.onclick = function () {
 const todoText = input.value.trim(); 
 if (todoText) {
   addTodo(todoText); 
   clearInput(); 
 }
};


clearBtn.onclick = function () {
 todoList.innerHTML = ""; 
 tasks = []; 
 clearInput(); 
};

function filterTasks(filter) {
 renderTasks(filter);
}

