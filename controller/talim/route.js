const express = require("express");
const TalimNameRouter = express.Router();
const TalimDataRouter = express.Router();
const {
  TalimNameController,
  TalimDataController,
} = require("./index");
const middleware = require("../../middleware");
const upload = require("../../config/multer").array("file", 20);

// Birinchi qavatdagi namelar uchun routerlar
TalimNameRouter.post(
  "/add",
  middleware.checkContentType,
  middleware.checkToken,
  TalimNameController.Add
);
TalimNameRouter.get(
  "/all",
  middleware.checkContentType,
  TalimNameController.Get
);
TalimNameRouter.get(
  "/:id",
  middleware.checkContentType,
  TalimNameController.GetById
);
TalimNameRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  TalimNameController.Edit
);
TalimNameRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  TalimNameController.Delete
);

// Ikkinichi qavatdagi data lar uchun routerlar lar(name larning child lari)
TalimDataRouter.post(
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
  TalimDataController.Add
);
TalimDataRouter.get(
  "/all",
  middleware.checkContentType,
  TalimDataController.Get
);
TalimDataRouter.get(
  "/:id",
  middleware.checkContentType,
  TalimDataController.GetById
);
TalimDataRouter.put(
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
  TalimDataController.Edit
);
TalimDataRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  TalimDataController.Delete
);

module.exports = { TalimNameRouter, TalimDataRouter };
