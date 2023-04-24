const express = require('express');
const router = express.Router();

const middleware = require('../../middleware')
const XalqaroALoqa = require("./index")

router.post("/add", middleware.checkContentType, middleware.checkToken, XalqaroALoqa.Add)
router.get("/all", middleware.checkContentType, XalqaroALoqa.Get)
router.get("/:id", middleware.checkParamsId, middleware.checkContentType, XalqaroALoqa.GetById)
router.put("/:id", middleware.checkParamsId, middleware.checkToken, XalqaroALoqa.Edit)
router.delete("/:id", middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, XalqaroALoqa.Delete)


module.exports = router