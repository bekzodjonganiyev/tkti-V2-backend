const express = require("express");
const XalqaroAloqaNameRouter = express.Router();
const XalqaroAloqaDataRouter = express.Router();
const {
  XalqaroAloqaNameController,
  XalqaroAloqaDataController,
} = require("./index");
const middleware = require("../../middleware");
const upload = require("../../config/multer").array("file", 20);

// Birinchi qavatdagi namelar uchun routerlar
XalqaroAloqaNameRouter.post(
  "/add",
  middleware.checkContentType,
  middleware.checkToken,
  XalqaroAloqaNameController.Add
);
XalqaroAloqaNameRouter.get(
  "/all",
  middleware.checkContentType,
  XalqaroAloqaNameController.Get
);
XalqaroAloqaNameRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  XalqaroAloqaNameController.GetById
);
XalqaroAloqaNameRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  XalqaroAloqaNameController.Edit
);
XalqaroAloqaNameRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  XalqaroAloqaNameController.Delete
);

// Ikkinichi qavatdagi data lar uchun routerlar lar(name larning child lari)
XalqaroAloqaDataRouter.post(
  "/add",
  middleware.checkToken,
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err || !req.files) {
        res
          .status(404)
          .json({
            status: 404,
            success: false,
            message: `Media qo'shish uchun 'file' keyidan foydalanib 20tagacha rasm yuboring`,
          });
        return;
      }
      next();
    });
  },
  XalqaroAloqaDataController.Add
);
XalqaroAloqaDataRouter.get(
  "/all",
  middleware.checkContentType,
  XalqaroAloqaDataController.Get
);
XalqaroAloqaDataRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  XalqaroAloqaDataController.GetById
);
XalqaroAloqaDataRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err || !req.files) {
        res
          .status(404)
          .json({
            status: 404,
            success: false,
            message: `Media qo'shish uchun 'file' keyidan foydalanib 20tagacha rasm yuboring`,
          });
        return;
      }
      next();
    });
  },
  XalqaroAloqaDataController.Edit
);
XalqaroAloqaDataRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  XalqaroAloqaDataController.Delete
);

module.exports = { XalqaroAloqaNameRouter, XalqaroAloqaDataRouter };
