const express = require('express')
const router = express.Router()
const upload = require('../config/multer').array('photo', 20)
const { addDaraja, getById, getAll, updatedaraja, deletedaraja, getQuery } = require('../controller/darajaController')



router.post('/add',(req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Daraja qo'shish uchun 'photo' keyidan foydalanib 20tagacha bo'lgan rasmlar yuboring`})
    return
    }  
    next()
    })
  }, addDaraja)
router.get('/all', getAll)
router.get("/query", getQuery)
router.get('/:id', getById)
router.put('/:id',(req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Daraja qo'shish uchun 'photo' keyidan foydalanib 20tagacha bo'lgan rasmlar yuboring`})
    return
    }  
    next()
    })
  }, updatedaraja)
router.delete('/:id', deletedaraja)

module.exports = router
