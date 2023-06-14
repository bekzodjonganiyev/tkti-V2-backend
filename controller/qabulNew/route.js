const express = require("express");
const QabulNameRouter = express.Router();
const QabulDataRouter = express.Router();
const {
  QabulNameController,
  QabulDataController,
} = require("./index");
const middleware = require("../../middleware");
const upload = require("../../config/multer").array("file", 20);

// Birinchi qavatdagi namelar uchun routerlar
QabulNameRouter.post(
  "/add",
  middleware.checkContentType,
  middleware.checkToken,
  QabulNameController.Add
);
QabulNameRouter.get(
  "/all",
  middleware.checkContentType,
  QabulNameController.Get
);
QabulNameRouter.get(
  "/:id",
  middleware.checkContentType,
  QabulNameController.GetById
);
QabulNameRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  QabulNameController.Edit
);
QabulNameRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  QabulNameController.Delete
);

// Ikkinichi qavatdagi data lar uchun routerlar lar(name larning child lari)
QabulDataRouter.post(
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
  QabulDataController.Add
);
QabulDataRouter.get(
  "/all",
  middleware.checkContentType,
  QabulDataController.Get
);
QabulDataRouter.get(
  "/:id",
  middleware.checkContentType,
  QabulDataController.GetById
);
QabulDataRouter.put(
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
  QabulDataController.Edit
);
QabulDataRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  QabulDataController.Delete
);

module.exports = { QabulNameRouter, QabulDataRouter };
