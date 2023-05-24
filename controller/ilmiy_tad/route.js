const express = require("express");
const IlmiyTadNameRouter = express.Router();
const IlmiyTadDataRouter = express.Router();
const {
  IlmiyTadNameController,
  IlmiyTadDataController,
} = require("./index");
const middleware = require("../../middleware");
const upload = require("../../config/multer").array("file", 20);

// Birinchi qavatdagi namelar uchun routerlar
IlmiyTadNameRouter.post(
  "/add",
  middleware.checkContentType,
  middleware.checkToken,
  IlmiyTadNameController.Add
);
IlmiyTadNameRouter.get(
  "/all",
  middleware.checkContentType,
  IlmiyTadNameController.Get
);
IlmiyTadNameRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  IlmiyTadNameController.GetById
);
IlmiyTadNameRouter.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  IlmiyTadNameController.Edit
);
IlmiyTadNameRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  IlmiyTadNameController.Delete
);

// Ikkinichi qavatdagi data lar uchun routerlar lar(name larning child lari)
IlmiyTadDataRouter.post(
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
  IlmiyTadDataController.Add
);
IlmiyTadDataRouter.get(
  "/all",
  middleware.checkContentType,
  IlmiyTadDataController.Get
);
IlmiyTadDataRouter.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  IlmiyTadDataController.GetById
);
IlmiyTadDataRouter.put(
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
  IlmiyTadDataController.Edit
);
IlmiyTadDataRouter.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  IlmiyTadDataController.Delete
);

module.exports = { IlmiyTadNameRouter, IlmiyTadDataRouter };
