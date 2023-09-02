const progress = $('.lvl-progress')
const lvl = $('.lvl-value')

// добавить опыт
function addExp(difficulty) {
    let exp = setExp(difficulty)
    const newExp = +progress.val() + exp
    if (newExp >= 100) {
        lvl.text(+lvl.text() + 1)
        progress.val(newExp-100)
        saveLvl(+lvl.text(), newExp-100)
    } else {
        progress.val(newExp)
        saveLvl(+lvl.text(), newExp)
    }
    showModal(`Вы получили ${exp} опыта.`, 'success')
}

// убавить опыт
function divExp(difficulty) {
    let exp = setExp(difficulty)
    const newExp = +progress.val() - exp
    if (+lvl.text() >= 1) {
        if (newExp <= 0 && +lvl.text() > 1) {
            lvl.text(+lvl.text() - 1)
            progress.val(100-exp)
            saveLvl(+lvl.text(), 100-exp)
        } else {
            progress.val(newExp)
            saveLvl(+lvl.text(), newExp)
        }
    }
    showModal(`Вы потеряли ${exp} опыта.`, 'error')
}


// установить опыт
function setExp(difficulty) {
    if (difficulty == 'ease') return randomIntFromInterval(1, 10)
    else if (difficulty == 'normal') return randomIntFromInterval(1, 30)
    else return randomIntFromInterval(1, 50)
}

// случайное число в диапазоне
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}