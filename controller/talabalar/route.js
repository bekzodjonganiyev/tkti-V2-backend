const express = require("express");
const TalabalarNameRouter = express.Router();
const TalabalarDataRouter = express.Router();
const {
  TalabalarNameController,
  TalabalarDataController,
} = require("./index");
const middleware = require("../../middleware");
const upload = require("../../config/multer").array("file", 20);

// Birinchi qavatdagi namelar uchun routerlar
TalabalarNameRouter.post(
  "/add",
  middleware.checkContentType,
  middleware.checkToken,
  TalabalarNameController.Add
);
TalabalarNameRouter.get(
  "/all",
  middleware.checkContentType,
  TalabalarNameController.Get
);
TalabalarNameRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  TalabalarNameController.GetById
);
TalabalarNameRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  TalabalarNameController.Edit
);
TalabalarNameRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  TalabalarNameController.Delete
);

// Ikkinichi qavatdagi data lar uchun routerlar lar(name larning child lari)
TalabalarDataRouter.post(
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
  TalabalarDataController.Add
);
TalabalarDataRouter.get(
  "/all",
  middleware.checkContentType,
  TalabalarDataController.Get
);
TalabalarDataRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  TalabalarDataController.GetById
);
TalabalarDataRouter.put(
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
  TalabalarDataController.Edit
);
TalabalarDataRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  TalabalarDataController.Delete
);

module.exports = { TalabalarNameRouter, TalabalarDataRouter };
