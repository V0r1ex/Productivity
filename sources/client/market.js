const modalWindow = `
<div class="modal-create-item">
    <div class="modal-inner">
        <h2 class="modal-header">Создание предмета</h2>
        <div class="modal-row"> 
            <label for="name">Название: </label>
            <input type="text" name="name" class="modal-text base-text">
        </div>
        <div class="modal-row"> 
            <label for="description">Описание: </label>
            <input type="text" name="description" class="modal-text base-text">
        </div>
        <div class="modal-row"> 
            <label for="cost">Стоимость: </label>
            <input type="text" name="cost" class="modal-text base-text">
        </div>
        <div class="modal-row"> 
            <label for="icon">Иконка: </label>
            <input type="file" name="icon" class="modal-file">
        </div>
        <div class="modal-btns">
            <button class="modal-btn base-btn" onclick="addItem($(this).closest('.modal-create-item'))">Создать</button>
            <button class="modal-btn base-btn" onclick="closeModal()">Отменить</button>
        </div>
    </div>
</div>
`

let items = JSON.parse(localStorage.getItem('items'))
let sum = 0

for (let item of items) {
    if (inventory.indexOf(item.name) == -1) {
        sum += +item.cost
        const marketItem = createMarketItem(item.name, item.description, item.cost, item.path)
        $('.market-container').append(marketItem)
    }
}
$('.market-sum-value').text(sum+'₽')

$('.btn-create-item').on('click', openModal)

function openModal() {
    $('.main').append(modalWindow)
}

function closeModal() {
    $('.modal-create-item').remove()
}

function Item(name, cost, description, type, path) {
    this.id = Math.floor(100000 + Math.random() * 900000),
    this.name = name,
    this.cost = cost,
    this.description = description,
    this.type = type,
    this.path = path
}

function createMarketItem(name, description, cost, path) { 
    return`
    <div class="market-item">
        <button class="remove-btn" onclick="removeItem($(this))"></button>
        <div class="market-item-inner">
            <img alt="${name}" src="${path}" class="market-img">
            <h3 class="market-header">${name}</h3>
            ${description && `<p class="market-description">${description}</p>`}
            <div class="market-cost">Стоимость: <span class="market-cost-value">${cost}₽</span></div>
            <button class="market-btn base-btn" onclick="buyItem($(this).closest('.market-item'))">Купить</button>
        </div>
    </div>`
}

function buyItem(item) {
    const balance = parseInt($('.balance').text())
    const cost = parseInt(item.find('.market-cost-value').text())
    const itemName = item.find('.market-header').text()
    const newBalance = balance - cost
    if (newBalance < 0) {
        showModal(`У вас недостаточно средств.<br> Вам не хватает ${Math.abs(newBalance)} рублей.`, 'error')
    } else if (checkProduct(itemName)){
        showModal('Данный лот уже куплен', 'error')
    } else {
        saveBalance(newBalance)
        saveProduct(itemName)
        showModal(`Вы купили ${itemName}</br>С вашего баланса списано ${cost} рублей.`, 'success')
        item.remove()
    }
}

function addItem(modal) { 
    const file = modal.find('[name="icon"]').prop('files')[0]
    const name = modal.find('[name="name"]').val()
    const description = modal.find('[name="description"]').val()
    const cost = modal.find('[name="cost"]').val()
    if (!name || !description || !cost || !file) {
        showModal('Заполните все поля.', 'error')
    } else if (!Number(cost) && Number(cost) != 0) {
        showModal('Введите корректную цену.', 'error')
    } else {
        ajaxPostFile(file, '/savePhoto')
        const newMarketItem = createMarketItem(name, description, cost, URL.createObjectURL(file))
        items.push(new Item(name, cost, description, 'none', 'images/items/'+file.name))
        localStorage.setItem('items', JSON.stringify(items))
        $('.market-container').append(newMarketItem)
    }
}

function removeItem(removeBtn) { 
    removeBtn.parent().remove()
    removeProductFromItems(removeBtn.parent().find('.market-header').text())
}




