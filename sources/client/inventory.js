const items = JSON.parse(localStorage.getItem('items'))
let sum = 0
for (let item of items) {
    if (inventory.indexOf(item.name) >= 0) {
        sum += +item.cost
        const productItem = createProductItem(item.name, item.description, item.cost, item.path)
        $('.inventory-container').append(productItem)
    }
}
$('.inventory-sum-value').text(sum+'₽')

// Если предметов нет
if (sum == 0) {
    $('.inventory-container').html('<p class="inventory-text">Ваш инвентарь пуст...</p>')
}

function createProductItem(name, description, cost, path) { 
    return`
    <div class="market-item">
        <div class="market-item-inner">
            <img alt="${name}" src="${path}" class="market-img">
            <h3 class="market-header">${name}</h3>
            ${description && `<p class="market-description">${description}</p>`}
            <div class="market-cost">Стоимость: <span class="market-cost-value">${cost}₽</span></div>
            <button class="market-btn base-btn" onclick="sellItem($(this).closest('.market-item'))">Продать</button>
        </div>
    </div>`
}

function sellItem(item) {
    const balance = parseInt($('.balance').text())
    const cost = parseInt(item.find('.market-cost-value').text())
    const itemName = item.find('.market-header').text()
    const newBalance = balance + cost
    saveBalance(newBalance)
    removeProductFromInventory(itemName)
    showModal(`Вы продали ${itemName}</br>Ваш баланс пополнен на ${cost} рублей.`, 'success')
    item.remove()
}
