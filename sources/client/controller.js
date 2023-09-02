let ajax = [] //для хранения всех запросов

//пост запрос
const ajaxPost = (endpoint, data) => {
    if (ajax.length > 2) ajax.shift()
    if (ajax.length > 1) ajax[0].abort()
    let post
    post = $.ajax({
        url: endpoint,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        processData: false,
        success: data => data
    })
    ajax.push(post)
    return post
}

//пост запрос на файл
const ajaxPostFile = (file, endpoint) => {
    if (ajax.length > 2) ajax.shift()
    if (ajax.length > 1) ajax[0].abort()
    const data = new FormData()
    data.append('file', file)
    ajax.push($.ajax({
        url: endpoint,
        processData: false,
        contentType: false,
        type: "POST",
        data: data
    }))
}

//гет запрос
const ajaxGet = async (endpoint) => {
    let response = await fetch(endpoint)
    let dataJson = await response.json()
    return dataJson
}
