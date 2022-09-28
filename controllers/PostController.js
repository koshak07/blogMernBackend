import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи!" });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    // Нужно добавлять количество просмотров поэтому нужно другой метод
    // const posts = await PostModel.findById(postId).populate("user").exec();
    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { vievsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Не удалось получить статью!" });
        }
        if (!doc) {
          return res.status(404).json({ message: "Статья не найдена!" });
        }
        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи!" });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Не удалось удалить статьи!" });
        }
        if (!doc) {
          return res.status(404).json({ message: "Статья не найдена!" });
        }
        res.status(200).json({ doc, message: "Success" });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи!" });
  }
};

export const create = async (req, res, next) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось создать пост!" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось отредактировать пост!" });
  }
};
