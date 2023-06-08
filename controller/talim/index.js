const { default: mongoose } = require("mongoose");
const removeMedia = require("../../config/fs");
const validate = require("./validate");
const { TalimDataSchema, TalimNameSchema } = require("./model");

class TalimName {
  async Add(req, res) {
    try {
      console.log(req.body)
      const { error, value } = validate.postTalimName.validate({
        ...req.body,
      });

      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      const names = new TalimNameSchema(value);
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
      const { value, error } = validate.postTalimName.validate({
        ...req.body,
      });

      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }
      const updated = await TalimNameSchema.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

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
      const names = await TalimNameSchema.aggregate([
        {
          $lookup: {
            from: "talimdatas",
            localField: "_id",
            foreignField: "nameId",
            as: "child",
          },
        },
      ]);
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
      const nameById = await TalimNameSchema.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "talimdatas",
            localField: "_id",
            foreignField: "nameId",
            as: "child",
          },
        },
      ]);
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
      const name = await TalimNameSchema.findByIdAndDelete(
        req.params.id
      );

      if (!name) {
        res
          .status(404)
          .json({ status: 404, success: false, message: `nameId xato` });
        return;
      }

      // shu namega tegishli datalarni o'chirish
      await TalimDataSchema.deleteMany({ nameId: req.params.id });

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

class TalimData {
  async Add(req, res) {
    try {
      const { error, value } = validate.postTalimData.validate({
        ...req.body,
      });
      if (error) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }
      const name = await TalimNameSchema.findOne({ _id: req.body.nameId });
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

      const data = new TalimDataSchema(obj);
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
      const { error, value } = validate.postTalimData.validate({
        ...req.body,
      });
      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      const updated = await TalimDataSchema.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

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
      const datas = await TalimDataSchema.find().sort({ _id: -1 });

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
      const data = await TalimDataSchema.findOne({ _id: req.params.id });
      if (data.length < 1) {
        res
          .status(404)
          .json({ status: 404, message: "dataId xato", success: false });
        return;
      }
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
      const data = await TalimDataSchema.findByIdAndDelete(
        req.params.id
      );
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

const TalimNameController = new TalimName();
const TalimDataController = new TalimData();

module.exports = { TalimNameController, TalimDataController };
