const scrollBtn = $('.scroll-btn').hide()

//скрытие/показ кнопки прокрутки
$('.main').on('scroll', showScrollButton)
scrollBtn.on('click', scrollWindowToTop)

//появление и исчезновение кнопки
function showScrollButton() {
    if ($('.main').scrollTop() > 300) {
        scrollBtn.fadeIn(500)
        scrollBtn.css('pointer-events', 'all')
    } else {
        scrollBtn.fadeOut(500)
        scrollBtn.css('pointer-events', 'none')
    }  
}

//плавный скролл до верха
function scrollWindowToTop() {
    let coffScroll = 10
    let start = setInterval(() => {
        if ($('.main').scrollTop() > 0) {
            coffScroll += 0.7
            $('.main').scrollTop($('.main').scrollTop() - coffScroll)
        }
        else clearInterval(start)
    }, 1)
}