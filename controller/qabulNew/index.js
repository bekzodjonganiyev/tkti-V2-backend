const { default: mongoose } = require("mongoose");
const removeMedia = require("../../config/fs");
const validate = require("./validate");
const { QabulDataSchema, QabulNameSchema } = require("./model");

class QabulName {
  async Add(req, res) {
    try {
      console.log(req.body)
      const { error, value } = validate.postQabulName.validate({
        ...req.body,
      });

      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      const names = new QabulNameSchema(value);
      await names.save();

      res.status(200).json({
        status: 200,
        success: true,
        message: `Malumotlar qo'shildi`,
        data: names,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Edit(req, res) {
    try {
      const { value, error } = validate.postQabulName.validate({
        ...req.body,
      });
      console.log(value, "edit qabul body")

      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }
      const updated = await QabulNameSchema.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      console.log(updated, "edit qabul updated")

      if (!updated) {
        res
          .status(404)
          .json({ status: 404, message: "Malumotlar topilmadi :(" });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `Muvaffaqiyatli tahrirlandi`,
        data: updated,
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Get(_, res) {
    try {
      const names = await QabulNameSchema.aggregate([
        {
          $lookup: {
            from: "qabuldatas",
            localField: "_id",
            foreignField: "nameId",
            as: "child",
          },
        },
      ]);

      console.log(names, "get qabul names")
      res.status(200).json({
        status: 200,
        success: true,
        message: `Malumotlar olindi`,
        data: names,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async GetById(req, res) {
    try {
      const nameById = await QabulNameSchema.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "qabuldatas",
            localField: "_id",
            foreignField: "nameId",
            as: "child",
          },
        },
      ]);

      console.log(nameById, "getById qabul")
      if (nameById.length < 1) {
        res
          .status(404)
          .json({ status: 404, message: "nameId xato", success: false });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        data: nameById[0],
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Delete(req, res) {
    try {
      // name ni o'chirish
      const name = await QabulNameSchema.findByIdAndDelete(
        req.params.id
      );

      console.log(name, "delete qabul name")
      if (!name) {
        res
          .status(404)
          .json({ status: 404, success: false, message: `nameId xato` });
        return;
      }

      // shu namega tegishli datalarni o'chirish
      await QabulDataSchema.deleteMany({ nameId: req.params.id });

      console.log(req.params.id, "delete qabul many")

      res.status(200).json({
        status: 200,
        message: "Muvaffaqiyatli o'chirildi",
        data: name,
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
}

class QabulData {
  async Add(req, res) {
    try {
      const { error, value } = validate.postQabulData.validate({
        ...req.body,
      });

      console.log(value, "qabul data value")
      if (error) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }
      const name = await QabulNameSchema.findOne({ _id: req.body.nameId });

      console.log(name, "qabul data nameId")
      if (!name) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res.status(404).json({ status: 404, message: `nameId xato` });
        return;
      }

      const obj = { ...value};
      const files = [];
      for (let i of req.files) {
        files.push(`uploads/${i.filename}`);
      }
      obj.file = files;

      console.log(obj, "qabul data add data")

      const data = new QabulDataSchema(obj);
      await data.save();

      res.status(200).json({
        status: 200,
        success: true,
        message: `Muvoffaqiyatli qo'shildi`,
        data: obj,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Edit(req, res) {
    try {
      const { error, value } = validate.postQabulData.validate({
        ...req.body,
      });
      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      const updated = await QabulDataSchema.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      console.log(updated, "qabul data updated body")
      if (!updated) {
        res.status(404).json({ status: 404, message: "Malumot topilmadi :(" });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `Muvaffaqiyatli tahrirlandi`,
        data: updated,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Get(_, res) {
    try {
      const datas = await QabulDataSchema.find().sort({ _id: -1 });

      res.status(200).json({
        status: 200,
        success: true,
        message: `Malumotlar olindi`,
        data: datas,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async GetById(req, res) {
    try {
      const data = await QabulDataSchema.findOne({ _id: req.params.id });
      if (data.length < 1) {
        res
          .status(404)
          .json({ status: 404, message: "dataId xato", success: false });
        return;
      }

      console.log(data, "qabul data getById")
      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        data: data,
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Delete(req, res) {
    try {
      const data = await QabulDataSchema.findByIdAndDelete(
        req.params.id
      );

      console.log(data, "qabul data byId")
      if (!data) {
        res.status(404).json({ status: 404, message: "Malumot topilmadi :(" });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `Muvaffaqiyatli o'chirildi`,
        data: data,
      });
    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
}

const QabulNameController = new QabulName();
const QabulDataController = new QabulData();

module.exports = { QabulNameController, QabulDataController };
