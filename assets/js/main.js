const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let indexToBeDeleted = null;
const taskManagerContainer = document.querySelector(".taskManager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = document.querySelector(".confirmed");
const cancelBtn = document.querySelector(".cancel");
document.getElementById("taskForm").addEventListener("submit", handleFormSubmit);


renderTasks();

//function to handle the form submit event
function handleFormSubmit(event) {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const taskValue = taskInput.value.trim();
    console.log(taskValue);
    if (taskValue !== "") {
        const newTask = {
            text: taskValue,
            completed: false,
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = "";
        renderTasks();
    }
}

//function to save the tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//function to render the task
function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("taskCard");
        let classVal = "pending";
        let statusVal = "pending";
        if (task.completed) {
            classVal = "completed";
            statusVal = "completed";
        }
        taskCard.classList.add(classVal);

        const taskText = document.createElement("p");
        taskText.innerText = task.text;

        const taskStatus = document.createElement("p");
        taskStatus.innerText = statusVal;
        taskStatus.classList.add("status");

        const toggleButton = document.createElement("button");
        toggleButton.classList.add("button-box");
        const btnContentEl = document.createElement("span");
        btnContentEl.innerText = task.completed ? "Mark as pending" : "Mark as completed";
        btnContentEl.classList.add("green");
        toggleButton.appendChild(btnContentEl);
        toggleButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button-box");
        const delBtnContent = document.createElement("span");
        delBtnContent.innerText = "Delete";
        delBtnContent.classList.add("red");
        deleteButton.appendChild(delBtnContent);
        deleteButton.addEventListener("click", () => {
            indexToBeDeleted = index;
            confirmEl.style.display = "block";
            taskManagerContainer.classList.add("overlay");
        });

        taskCard.appendChild(taskText);
        taskCard.appendChild(taskStatus);
        taskCard.appendChild(toggleButton);
        taskCard.appendChild(deleteButton);
        taskContainer.appendChild(taskCard);

    });
}

confirmedBtn.addEventListener("click", () => {
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
    deleteTask(indexToBeDeleted);
})
cancelBtn.addEventListener("click",()=>{
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
})

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}