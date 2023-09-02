let tasks = JSON.parse(localStorage.getItem('completedTasks'))

for (let task of tasks) {
    const newTask = createTaskCard(task.name, task.description, task.award, task.time, task.difficulty)
    $('.tasks-container').append(newTask)
}

$('.tasks-count-value').text(tasks.length)

function createTaskCard(name, description, award, time, difficulty) { 
    return`
    <div class="task-card ${difficultyCheck(difficulty)}">
        <button class="task-btn-remove remove-btn" onclick="removeCompletedTask($(this))"></button>
        <div class="task-card-inner">
            <h3 class="task-header">${name}</h3>
            ${description && `<p class="task-description">${description}</p>`}
            <div class="task-award">Награда за задание: <span class="task-award-value">${award}</span>₽</div>
            <div class="task-time">Выполнено: <span class="task-time-value">${time}</span></div>
            <button disabled class="task-btn">Выполнено</button>
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

function removeCompletedTask(btnTask) {
    btnTask.parent().remove()
    removeTaskFromCompletedStorage(btnTask.parent().find('.task-header').text())
}