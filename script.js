let  taskArray = []

let savedTasks = localStorage.getItem('tasks', JSON.stringify(taskArray));
if (savedTasks) {
    taskArray = JSON.parse(savedTasks);
}
displayTask();

let todoInputText = document.getElementById("todo-input");

function displayTask(){
    let displayEachTask = ""; 
    for (let x = 0; x < taskArray.length; x++) {
            displayEachTask += 
            `<div class="eachTask">
                <div class="check-p">
                <i class="fa-solid fa-thumbtack" style="display: ${taskArray[x].isPinned ? 'block' : 'none'};"></i>
                <input type="checkbox" id="checkbox-${x}" ${taskArray[x].isChecked ? 'checked' : ""} onclick="clickCheckbox(${x})"/>
                <p>${taskArray[x].task}</p>
                </div>
                <div class="btn-menu" id="option-${x}">
                    <button id="menu-btn" onclick="showOptions(${x})">...</button>
                <div class="menu" id="option-menu-${x}" style="display: none;">
                    <p onclick="deleteTask(${x})"><i class="fa-solid fa-trash-can"></i> Delete</p>
                    <p onclick="pinTask(${x})"><i class="fa-solid fa-thumbtack"></i> ${taskArray[x].isPinned ? "Unpin" : "Pin to the top"}</p>
                </div>
                </div>
            </div> <br>`;
        }
        document.getElementById("demo").innerHTML = displayEachTask;
        localStorage.setItem('tasks', JSON.stringify(taskArray));
}



document.addEventListener('keydown', function(event) {
    let key = event.key
    let inputValue = todoInputText.value;

    if (key === "Enter") { 
        if (inputValue.trim().length === 0) {
            return;
        } else {                  
            taskArray.push({task: inputValue, isChecked: false, isPinned: false});
            displayTask(); 
        }                
    } else {
        return;
    }
    todoInputText.value = "";
})


function clickCheckbox(index) {
    taskArray[index].isChecked = !taskArray[index].isChecked; 
    displayTask();
}


function showOptions(menuIndex){
    let optionMenu = document.getElementById('option-menu-' + menuIndex);
    if (optionMenu.style.display === "none") {
        optionMenu.style.display = "block";
    } else {
        optionMenu.style.display = "none";
    }
}


function deleteTask(delTask) {
    taskArray.splice(delTask, 1);
    displayTask()
}

function pinTask(pin) {
    taskArray[pin].isPinned = !taskArray[pin].isPinned;
    taskArray.sort((a, b) => {
        if (a.isPinned && !b.isPinned) { return -1; }
        if (!a.isPinned && b.isPinned) {return 1;}
        return 0;
    })
    displayTask();
}