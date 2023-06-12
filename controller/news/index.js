const { News_data } = require("./model");
const validate = require("./validate");
const removeMedia = require("../../config/fs");

class News {
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

      const News = new News_data(value);
      await News.save();

      res.status(200).json({
        status: 200,
        success: true,
        message: `Yangilik qo'shildi`,
        data: News,
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

      const News = await News_data.findOne({ _id: req.params.id });
      if (!News) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res.status(404).json({ status: 404, message: "yangilik topilmadi :(" });
        return;
      }

      if (req.file) {
        value.photo = `uploads/${req.file.filename}`;
      }

      const updated = await News_data.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: `yangilik yangilandi`,
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

  async Get(req, res) {
    try {
      // const News = await News_data.find().sort({_id:-1});
      const { page, category } = req.query;
      const totalCount = await News_data.find({ category }).sort({ date: -1 });
      const total = totalCount?.length;
      const News = totalCount.splice(
        page && page > 1 ? Number(page) * 10 - 10 : 0,
        10
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        total: total,
        perPage: 10,
        currentPage: News?.length,
        data: News,
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
      // const News = await News_data.findOne({ _id: req.params.id });
      const filtered = (title) => {
        const replaced = title.replace(/['~"#“‘`]+/g, "");
        const slug = replaced
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return slug;
      };

      const News = await News_data.find();
      const finded = News.find(
        (item) => filtered(item.title_uz) == req.params.id
      );
      // console.log(finded);
      if (!finded) {
        res
          .status(404)
          .json({ status: 404, message: "yangilik topilmadi", success: false });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        data: finded,
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
      const News = await News_data.findByIdAndDelete(req.params.id);
      if (!News) {
        res.status(404).json({ status: 404, message: "yangilik topilmadi :(" });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi  delet qilindi`,
        data: News,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
}

const NewsController = new News();

module.exports = { NewsController };
