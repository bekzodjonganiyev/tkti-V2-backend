const MissionSchema = require("./model");
const validate = require("./validate");
const removeMedia = require("../../config/fs");
const fs = require("fs");
const path = require("path");

class MissionController {
  async Add(req, res) {
    try {
      const { error, value } = validate.postApplicaton.validate({
        ...req.body,
      });
      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }
      const medias = req.files;
      const obj = {
        title_uz: value.title_uz,
        title_ru: value.title_ru,
        title_en: value.title_en,
        body_uz: value.body_uz,
        body_ru: value.body_ru,
        body_en: value.body_en, 
      };
      const images = []
      for (let i of medias) {
        images.push(`uploads/${i.filename}`)
      }
      const AboutUs = new MissionSchema({...obj, link: images});
      await AboutUs.save();

      res
        .status(200)
        .json({ status: 200, success: true, message: `Malumotlar qo'shildi` });
    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async Edit(req, res) {
    try {
      const { error, value } = validate.postApplicaton.validate({
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
      if (req.files) {
        let images = []
        for(let i of req.files){
          images.push(`uploads/${i.filename}`)
        }
        value.link = images;
      }

      const updated = await MissionSchema.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      if (!updated) {
        res
          .status(404)
          .json({
            status: 404,
            message: "berilgan id bo`yicha data topilmadi",
            success: false,
          });
        return;
      }

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `media yangilandi`,
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
      const About = await MissionSchema.find().sort({ _id: -1 });

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi uka`,
          data: About,
        });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async GetAll(_, res) {
    try {
      const Media = fs.readdirSync(path.join(__dirname, "..", "uploads"));

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi uka`,
          data: Media,
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
      const Media = await MissionSchema.findOne({ _id: req.params.id });

      if (!Media) {
        res
          .status(404)
          .json({ status: 404, message: "Media topilmadi", success: false });
        return;
      }
      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi uka`,
          data: Media,
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
      const AboutUs = await MissionSchema.findByIdAndDelete(req.params.id);
      if (!AboutUs) {
        res.status(404).json({ status: 404, message: "AboutUs topilmadi :(" });
        return;
      }

      res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: `Yaxshi  delet qilindi`,
          data: AboutUs,
        });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async Download(req, res) {
    try {
      const { file } = req.params;

      const foundedFile = fs.existsSync(
        path.join(__dirname, "..", "uploads", file)
      );

      if (!foundedFile) {
        res
          .status(404)
          .json({
            status: 404,
            message: "Yuklab olinishi kerak bo`lgan fayl bazada topilmadi",
            success: false,
          });
        return;
      }

      res.download(path.join(__dirname, "..", "uploads", file));
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
}

module.exports = new MissionController();
