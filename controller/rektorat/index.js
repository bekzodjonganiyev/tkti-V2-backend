const { default: mongoose } = require("mongoose");
const validate = require("./validate");
const Rektorat_data = require("./model");
const removeMedia = require("../../config/fs");
const { Faoliyat_data, Faoliyat_child } = require("../faoliyat/model");

class RektoratController {
  async Add(req, res) {
    try {
      const { error, value } = validate.post.validate({ ...req.body });
      if (error) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      value.photo = `uploads/${req.file.filename}`;

      const Rektorat = new Rektorat_data(value);
      await Rektorat.save();

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yangi data qo'shildi`,
          data: Rektorat,
        });
    } catch (e) {
      if (req.file) {
        removeMedia(req.file.filename);
      }
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Edit(req, res) {
    try {
      const { error, value } = validate.post.validate({ ...req.body });
      if (error) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      const Rektorat = await Rektorat_data.findOne({ _id: req.params.id });
      if (!Rektorat) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res.status(404).json({ status: 404, message: "data topilmadi :(" });
        return;
      }

      if (req.file) {
        removeMedia(Rektorat.photo.split("/")[1]);
        value.photo = `uploads/${req.file.filename}`;
      }

      const updated = await Rektorat_data.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `data yangilandi`,
          data: updated,
        });
    } catch (e) {
      if (req.file) {
        removeMedia(req.file.filename);
      }
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Get(_, res) {
    try {
      // const Rektorat = await Rektorat_data.find().sort({_id:-1});
      const Rektorat = await Rektorat_data.aggregate([
        {
          $lookup: {
            from: "bolims",
            localField: "_id",
            foreignField: "rektorat",
            as: "bolimlar",
          },
        },
      ]);

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi uka`,
          data: Rektorat,
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
      // const Rektorat = await Rektorat_data.findOne({_id:req.params.id});
      const Rektorat = await Rektorat_data.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "faoliyats",
            localField: "_id",
            foreignField: "rektorat_id",
            as: "faoliyatlar",
          },
        },
      ]);
      if (!Rektorat) {
        res
          .status(404)
          .json({ status: 404, message: "data topilmadi", success: false });
        return;
      }
      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi uka`,
          data: Rektorat[0],
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
      const Rektorat = await Rektorat_data.findByIdAndDelete(req.params.id);
      if (!Rektorat) {
        res.status(404).json({ status: 404, message: "data topilmadi :(" });
        return;
      }

      const RektoratFaoliyat = await Faoliyat_data.find({
        rektorat_id: req.params.id,
      });
      if (RektoratFaoliyat.length > 0) {
        await Faoliyat_data.deleteMany({ rektorat_id: req.params.id });
        for (let i of RektoratFaoliyat) {
          await Faoliyat_child.deleteMany({ faoliyat_id: i._id });
        }
      }

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi  delet qilindi`,
          data: Rektorat,
        });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
}

module.exports = new RektoratController();
