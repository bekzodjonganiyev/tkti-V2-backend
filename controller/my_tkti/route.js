const express = require("express");
const MyTktiNameRouter = express.Router();
const MyTktiDataRouter = express.Router();
const {
  MyTktiNameController,
  MyTktiDataController,
} = require("./index");
const middleware = require("../../middleware");
const upload = require("../../config/multer").array("file", 20);

// Birinchi qavatdagi namelar uchun routerlar
MyTktiNameRouter.post(
  "/add",
  middleware.checkContentType,
  middleware.checkToken,
  MyTktiNameController.Add
);
MyTktiNameRouter.get(
  "/all",
  middleware.checkContentType,
  MyTktiNameController.Get
);
MyTktiNameRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  MyTktiNameController.GetById
);
MyTktiNameRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  MyTktiNameController.Edit
);
MyTktiNameRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  MyTktiNameController.Delete
);

// Ikkinichi qavatdagi data lar uchun routerlar lar(name larning child lari)
MyTktiDataRouter.post(
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
  MyTktiDataController.Add
);
MyTktiDataRouter.get(
  "/all",
  middleware.checkContentType,
  MyTktiDataController.Get
);
MyTktiDataRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  MyTktiDataController.GetById
);
MyTktiDataRouter.put(
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
  MyTktiDataController.Edit
);
MyTktiDataRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  MyTktiDataController.Delete
);

module.exports = { MyTktiNameRouter, MyTktiDataRouter };
