// blur элементов
$('.container').children().each(function(index, item) {
    $(this).css('filter', 'blur(15px)')
})

//скрытие загрузки
window.onload = () => {
    $('.container').children().each(function(index, item) {
        $(this).css('filter', '')
    })
    $('.loading').remove()
}
