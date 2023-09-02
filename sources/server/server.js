const express = require('express')
const dotenv = require('dotenv')
const router = require('./router')
const path = require('path')
const fileupload = require("express-fileupload")
dotenv.config()

const app = express()
app.use(express.static('styles'))
app.use(express.static('resources'))
app.use(express.static('sources/client'))
app.use(fileupload())
app.set('view-engine', 'ejs')

// строит путь до любой страницы
const globalPath = (page) => {
    return path.resolve(`${__dirname}/../../pages/${page}.ejs`)
}

// запуск сервера
function start() { 
    app.listen(process.env.PORT, (err) => {
        console.log(`Сервер запущен по адресу: http://localhost:${process.env.PORT}`)
    })
    router(app, globalPath)
}

start()
