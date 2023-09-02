let tasks = JSON.parse(localStorage.getItem('tasks'))
const now = new Date().toISOString().slice(0, 10)

for (let task of tasks) {
    const newTask = createTaskCard(task.name, task.description, task.award, task.time, task.difficulty)
    if (task.time && new Date(now) > new Date(task.time)) {
        divExp(task.difficulty)
        newBalance = parseInt($('.balance').text()) - task.award
        if (newBalance >= 0) saveBalance(newBalance)
        else saveBalance(0)
        showModal(`Вы не выполнили задание: ${task.name}.</br>Вы оштрафованы на ${task.award} рублей.`, 'error')
        removeTaskFromStorage(task.name)
        addTaskToUncompletedStorage(task)
    } 
    else {
        $('.tasks-container').append(newTask)
    }
}

$('.tasks-count-value').text(tasks.length)

const modalWindow = `
<div class="modal-create-task">
    <div class="modal-inner">
        <h2 class="modal-header">Создать задачу</h2>
        <div class="modal-row"> 
            <label for="name">Название задачи: </label>
            <input type="text" name="name" class="modal-text base-text" spellcheck="false">
        </div>
        <div class="modal-row"> 
            <label for="description">Описание задачи: </label>
            <input type="text" name="description" class="modal-text base-text" spellcheck="false">
        </div>
        <div class="modal-row"> 
            <label for="award">Награда: </label>
            <input type="text" name="award" class="modal-text base-text" spellcheck="false">
        </div>
        <div class="modal-row"> 
            <label for="difficulty">Сложность: </label>
            <select name="difficulty" class="base-text">
                <option value="easy">Легко</option>
                <option value="normal">Нормально</option>
                <option value="hard">Сложно</option>
            </select>
        </div>
        <div class="modal-row"> 
            <label for="time">Срок: </label>
            <input type="date" name="time" class="modal-text base-text">
        </div>
        <div class="modal-btns">
            <button class="modal-btn base-btn" onclick="addTask($(this).closest('.modal-create-task'))">Создать задачу</button>
            <button class="modal-btn base-btn" onclick="closeModal()">Отменить</button>
        </div>
    </div>
</div>
`

function createTaskCard(name, description, award, time, difficulty) { 
    return`
    <div class="task-card ${difficultyCheck(difficulty)}">
        <div class="task-card-inner">
            <h3 class="task-header">${name}</h3>
            ${description && `<p class="task-description">${description}</p>`}
            <div class="task-award">Награда за задание: <span class="task-award-value">${award}</span>₽</div>
            <div class="task-time">Выполнить до: <span class="task-time-value">${time ? time : 'неограниченно'}</span></div>
            <div class="task-btns">
                <button class="task-btn base-btn" onclick="completeTask($(this).closest('.task-card'))">Выполнить</button>
                <button class="task-btn base-btn" onclick="completeTask($(this).closest('.task-card'), true)">Отменить</button>
            </div>
        </div>
    </div>`
}

// цвет карточки в зависимоти от сложности
function difficultyCheck(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 'green'
        case 'normal':
            return 'yellow'
        case 'hard':
            return 'red'
    }
}

$('.btn-create-task').on('click', openModal)

function openModal() {
    $('.main').append(modalWindow)
}

function closeModal() {
    $('.modal-create-task').remove()
}

function addTask(modal) {
    let name = modal.find('[name="name"]').val()
    let description = modal.find('[name="description"').val()
    let award = modal.find('[name="award"').val()
    let time = modal.find('[name="time"').val()
    let difficulty = modal.find('[name="difficulty"').val()
    const now = new Date().toISOString().slice(0, 10)
    if (!award || !award) {
        showModal('Заполните все поля.', 'error')
    }
    else if (!Number(award)) {
        showModal('Введите корректное вознаграждение.', 'error')
    } 
    else if (new Date(now) > new Date(time)) {
        showModal('Выберите корректную дату.', 'error')
    } 
    else {
        const newTask = createTaskCard(name, description, award, time, difficulty)
        $('.tasks-container').append(newTask)
        addTaskToStorage({name, description, award, time, difficulty})
    }
}

function completeTask(task, cancel=false) {
    let newBalance
    let award = parseInt(task.find('.task-award-value').text())
    const taskObj = tasks.find(el => el.name == task.find('.task-header').text())
    if (!cancel) {
        newBalance = parseInt($('.balance').text()) + award
        showModal(`Вы выполнили задачу!</br>Ваш баланс пополнен на ${award} рублей.`, 'success')
        addExp(taskObj.difficulty)
        taskObj.time = now
        addTaskToCompletedStorage(taskObj)
    }
    else {
        newBalance = parseInt($('.balance').text()) - award
        showModal(`Вы отменили задачу!</br>Вы оштрафованы на ${award} рублей.`, 'error')
        divExp(taskObj.difficulty)
        taskObj.time = now
        addTaskToUncompletedStorage(taskObj)
    }
    if (newBalance >= 0)
        saveBalance(newBalance)
    else
        saveBalance(0)
    task.remove()
    removeTaskFromStorage(task.find('.task-header').text())
}
