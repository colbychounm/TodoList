const tasksListElement = document.querySelector('.tasks-list');
const doneTasksListElement = document.querySelector('.done-tasks-list');
const inputElement = document.querySelector('.input')
const addBtn = document.querySelector('.add')

let inputValue = "";

const app = {
    tasksList: [],
    renderNewTask() {
        const newTask = document.createElement('div')
        newTask.innerHTML =
            `<div class="task">
                <input type="checkbox" class="done-btn"/>
                <li class="task-detail">${this.tasksList.slice(-1)}</li>
                <input type="checkbox" class="prio-btn"/>
            </div>`;

        tasksListElement.appendChild(newTask)
        this.controlTask();
    },
    addNewTask() {
        inputElement.onchange = function () {
            inputValue = inputElement.value
        }

        const addTask = () => {
            this.tasksList.push(inputValue)
            this.renderNewTask()
            inputElement.value = ""
            inputValue = ""
        }

        addBtn.onclick = () => {
            if (inputValue !== "") {
                addTask();
            }
        }

        inputElement.onkeyup = (event) => {
            if (event.key === "Enter" && inputValue !== "") {
                addTask();
            }
        }
    },
    controlTask() {
        const doneButtons = [...document.querySelectorAll('.done-btn')];
        const prioButtons = [...document.querySelectorAll('input.prio-btn')];
        const tasks = [...document.querySelectorAll('.task')];

        //Click done button
        doneButtons.map((btn, index) => {
            btn.onclick = () => {
                if (btn.checked) {
                    btn.classList.add('done')
                    doneTasksListElement.appendChild(tasks[index])
                    prioButtons[index].disabled = true;
                } else {
                    btn.classList.remove('done')
                    tasksListElement.appendChild(tasks[index])
                    prioButtons[index].disabled = false;
                    prioButtons[index].checked = false;
                }
            }
        })

        //Click prio button
        prioButtons.map((btn, index) => {
            btn.onclick= () => {
                if (btn.checked) {
                    tasksListElement.insertBefore(tasks[index], tasksListElement.children[0])
                } 
            }
        })
    },
    setup() {
        this.addNewTask();
    }
}

app.setup();
