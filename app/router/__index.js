const express = require('express')
const fs = require('fs')
const path = require('path')
const middleWare = require('../middlewares')
const router = express.Router()


fs.readdirSync(__dirname).filter((file) =>
    file.indexOf('.') !== 0 &&
    file !== '__index.js'
).forEach((file) => {

    const newRoot = path.join(__dirname, file)
    const routesFile = require(newRoot)
    router.use('/', middleWare.isAuthorized(), routesFile)

})

module.exports = router