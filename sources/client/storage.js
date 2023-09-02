let inventory = JSON.parse(localStorage.getItem('inventory'))
let completedTasks = JSON.parse(localStorage.getItem('completedTasks'))
let uncompletedTasks = JSON.parse(localStorage.getItem('uncompletedTasks'))

$('.balance').text(localStorage.getItem('balance')+'₽')
$('.lvl-value').text(localStorage.getItem('lvl'))
$('.lvl-progress').val(localStorage.getItem('exp'))

function saveBalance(balance) {
    $('.balance').text(balance+'₽')
    localStorage.setItem('balance', balance)
}

function saveProduct(itemName) {
    if (!checkProduct(itemName)) inventory.push(itemName)
    localStorage.setItem('inventory', JSON.stringify(inventory))
}

function removeProductFromInventory(itemName) {
    inventory = inventory.filter(el => el !== itemName)
    localStorage.setItem('inventory', JSON.stringify(inventory))
}

function removeProductFromItems(itemName) {
    items = items.filter(el => el.name !== itemName)
    localStorage.setItem('items', JSON.stringify(items))
}

function checkProduct(itemName) {
    return inventory.indexOf(itemName) >= 0 ? true : false
}

// Задания

function addTaskToStorage(task) {
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTaskFromStorage(taskName) {
    tasks = tasks.filter(el => el.name !== taskName)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTaskToCompletedStorage(task) {
    completedTasks.push(task)
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
}

function removeTaskFromCompletedStorage(taskName) {
    completedTasks = completedTasks.filter(el => el.name !== taskName)
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
}

function addTaskToUncompletedStorage(task) {
    uncompletedTasks.push(task)
    localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks))
}

function removeTaskFromUncompletedStorage(taskName) {
    uncompletedTasks = uncompletedTasks.filter(el => el.name !== taskName)
    localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks))
}

// сброс профиля
function resetProfile() {
    localStorage.setItem('inventory', '[]')
    localStorage.setItem('balance', 0)
    localStorage.setItem('tasks', '[]')
    localStorage.setItem('completedTasks', '[]')
    localStorage.setItem('uncompletedTasks', '[]')
    localStorage.setItem('lvl', 1)
    localStorage.setItem('exp', 0)
    window.location.reload()
}

// уровень, опыт
function saveLvl(lvl, exp) {
 localStorage.setItem('lvl', lvl)
 localStorage.setItem('exp', exp)
}
